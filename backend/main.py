import tornado.ioloop
import tornado.web
import tornado.httpserver
from event import GenerateEvent, CheckEvent, ViewEvent
from mission import GenerateMission, ViewMission
from event_mission import ViewMissionEvent, AttachEventToMission
from config import STATIC_PATH


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")


def make_app():
    return tornado.web.Application([
        (r'/new_event', GenerateEvent),
        (r'/check_event', CheckEvent),
        (r'/view_event', ViewEvent),

        (r'/new_mission', GenerateMission),
        (r'/view_mission', ViewMission),

        (r'/attach_event_to_mission', AttachEventToMission),
        (r'/view_mission_event', ViewMissionEvent),

        (r'/(.*)', tornado.web.StaticFileHandler, {'path': STATIC_PATH}),
    ])


if __name__ == "__main__":
    app = make_app()
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(8000, address='0.0.0.0')
    tornado.ioloop.IOLoop.current().start()
