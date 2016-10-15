import tornado.ioloop
import tornado.web
from event import GenerateEvent, CheckEvent
from config import STATIC_PATH


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")


def make_app():
    return tornado.web.Application([
        (r'/new_event', GenerateEvent),
        (r'/check_event', CheckEvent),
        (r'/(.*)', tornado.web.StaticFileHandler, {'path': STATIC_PATH}),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
