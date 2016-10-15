from tornado import gen
from tornado.web import RequestHandler
from tornado.httpclient import AsyncHTTPClient


import cjson
import base64

from db import db
from bson.objectid import ObjectId
from config import PREV_DIR



class AttachEventToMission(RequestHandler):
    @gen.coroutine
    def post(self):
        body = cjson.decode(self.request.body)
        event_id_ = body['event_id']
        mission_id_ = body['mission_id']

        yield db.event_mission.update({
            'event_id': event_id_,
            'mission_id': mission_id_}, {
            '$set': {
                'event_id': event_id_,
                'mission_id': mission_id_
            }}, upsert=True)

    
        self.write(cjson.encode({"status": "OK"}))



class ViewMissionEvent(RequestHandler):
    @gen.coroutine
    def post(self):
        body = cjson.decode(self.request.body)
        mission_id_ = body['mission_id']
        
        cursor = db.event_mission.find({'mission_id': mission_id_})

        results = []

        while (yield cursor.fetch_next):
            result = cursor.next_object()
            result['_id'] = str(result['_id'])
            results.append(result)

        self.write(cjson.encode(results))
