from tornado import gen
from tornado.web import RequestHandler
from tornado.httpclient import AsyncHTTPClient


import cjson
import base64

from db import db
from bson.objectid import ObjectId
from config import PREV_DIR


class GenerateMission(RequestHandler):
    @gen.coroutine
    def post(self):
        # analyze data
        body = cjson.decode(self.request.body)
        title_ = body['title']
        intro_ = body['intro']
        pic_bin = base64.b64decode(body['pic'])
        
        mission_id = yield db.mission.insert({
            'title': title_,
            'intro': intro_
        })

        with open("%s/%s" % (PREV_DIR, mission_id), "w") as f:
            f.write(pic_bin)

        self.write(cjson.encode({"mission_id": str(mission_id)}))



class ViewMission(RequestHandler):
    @gen.coroutine
    def post(self):
        results = []
        cursor = db.mission.find()
        while (yield cursor.fetch_next):
            result = cursor.next_object()
            result['_id'] = str(result['_id'])
            with open("%s/%s" % (PREV_DIR, result['_id'])) as f:
                result['pic'] = base64.b64encode(f.read())
            results.append(result)
        self.write(cjson.encode(results))
