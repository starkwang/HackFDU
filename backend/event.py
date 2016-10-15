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
            body=pic_bin)

        response_body = cjson.decode(response.body)
        tags_ = filter(lambda x: x['confidence'] > 0.5, response_body['tags'])
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
        event_id = body['event_id']
        
        std_event_info = yield db.event.find_one({'_id': ObjectId(event_id)})
        print std_event_info

        http_client = AsyncHTTPClient()
        response = yield http_client.fetch('https://api.projectoxford.ai/vision/v1.0/tag',
            method='POST',
            headers=MSRA_VISION_API_HEADERS,
            body=pic_bin)

        response_body = cjson.decode(response.body)
        tags_ = filter(lambda x: x['confidence'] > 0.5, response_body['tags'])
        tags_ = set(map(lambda x: x['name'], tags_))

        
        print tags_, std_event_info['tags']
        dist = (abs(std_event_info['lon'] - lon_) ** 2 + abs(std_event_info['lat'] - lat_) ** 2) ** 0.5
        std_component_num = len(std_event_info['tags'])
        intersect_num = len(tags_ & set(std_event_info['tags']))
        union_num = len(tags_ | set(std_event_info['tags']))

        # match
        if dist < RADIUS and 1.0 * intersect_num / std_component_num > CAP_THRESHOLD:
            # TODO: multiplayer
            db.user_event.update(
                {"event_id": ObjectId(event_id)},
                {"$set": {"event_id": event_id, "accepted": 1} },
                upsert=True
            )
            self.write(cjson.encode({"accepted": 1}))
        else:
            # TODO: multiplayer
            db.user_event.update(
                {"event_id": ObjectId(event_id)},
                {"$set": {"event_id": event_id, "accepted": 0} },
                upsert=True
            )
            self.write(cjson.encode({"accepted": 0}))

            


