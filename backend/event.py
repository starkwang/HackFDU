from tornado import gen
from tornado.web import RequestHandler
from tornado.httpclient import AsyncHTTPClient

import cjson
import base64

from db import db
from bson.objectid import ObjectId
from config import MSRA_VISION_API_HEADERS, CAP_DIR, RADIUS, CAP_THRESHOLD



class GenerateEvent(RequestHandler):
    @gen.coroutine
    def post(self):
        # analyze data
        body = cjson.decode(self.request.body)
        lon_ = body['lon']
        lat_ = body['lat']
        intro_ = body['intro']
        pic_bin = base64.b64decode(body['pic'])

        http_client = AsyncHTTPClient()
        response = yield http_client.fetch('https://api.projectoxford.ai/vision/v1.0/tag',
            method='POST',
            headers=MSRA_VISION_API_HEADERS,
            body=pic_bin,
            connect_timeout=20,
            request_timeout=20)

        response_body = cjson.decode(response.body)
        tags_ = filter(lambda x: x['confidence'] > 0.4, response_body['tags'])
        tags_ = map(lambda x: x['name'], tags_)

        result_id = yield db.event.insert({
            "lon": lon_,
            "lat": lat_,
            "intro": intro_,
            "tags": tags_
        })

        # Unfortunately Linux doesn't have good 
        # support for asynchronous I/O to 
        # regular files
        with open("%s/%s" % (CAP_DIR, result_id), "w") as f:
            f.write(pic_bin)

        self.write({"event_id": str(result_id)})


class CheckEvent(RequestHandler):
    @gen.coroutine
    def post(self):
        # analyze data
        body = cjson.decode(self.request.body)
        lon_ = body['lon']
        lat_ = body['lat']
        pic_bin = base64.standard_b64decode(body['pic'])
        
        cursor = db.event.find()
        while (yield cursor.fetch_next):
            std_event_info = cursor.next_object()
            event_id = str(std_event_info['_id'])

            http_client = AsyncHTTPClient()
            response = yield http_client.fetch('https://api.projectoxford.ai/vision/v1.0/tag',
                method='POST',
                headers=MSRA_VISION_API_HEADERS,
                body=pic_bin,
                connect_timeout=20,
                request_timeout=20)

            response_body = cjson.decode(response.body)
            tags_ = filter(lambda x: x['confidence'] > 0.5, response_body['tags'])
            tags_ = set(map(lambda x: x['name'], tags_))

            
            print tags_, std_event_info['tags']
            dist = (abs(std_event_info['lon'] - lon_) ** 2 + abs(std_event_info['lat'] - lat_) ** 2) ** 0.5
            std_component_num = len(std_event_info['tags'])
            intersect_num = len(tags_ & set(std_event_info['tags']))
            union_num = len(tags_ | set(std_event_info['tags']))

            found = False
            # match
            if dist < RADIUS and 1.0 * intersect_num / union_num > CAP_THRESHOLD:
                # TODO: multiplayer
                obj = yield db.user_event.find_one({"event_id": ObjectId(event_id), "accepted": 1})
                # event has been archived
                if obj is not None:
                    continue
                db.user_event.update(
                    {"event_id": ObjectId(event_id), "accepted": 0},
                    {"$set": {"event_id": event_id, "accepted": 1} },
                    upsert=True
                )
                found = True
                break

            if found:
                self.write(cjson.encode({"accepted": 1, "event_id": event_id}))
            else:
                self.write(cjson.encode({"accepted": 0}))

            

class ViewEvent(RequestHandler):

    @gen.coroutine
    def post(self):
        body = cjson.decode(self.request.body)
        try:
            event_id = body['event_id']

            if isinstance(event_id, str) is True:
                results = yield db.event.find_one({'_id': ObjectId(event_id)})
                results['_id'] = str(results['_id'])
            elif isinstance(event_id, list) is True:
                results = []
                for eid in event_id:
                    result = yield db.event.find_one({'_id': ObjectId(eid)})
                    result['_id'] = str(result['_id'])
                    results.append(result)
        except KeyError:
            results = []
            cursor = db.event.find()
            while (yield cursor.fetch_next):
                results.append(cursor.next_object())
                results[-1]['_id'] = str(results[-1]['_id'])

        self.write(cjson.encode(results))
