import tornado.ioloop
import tornado.web
from event import GenerateEvent, CheckEvent


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")


def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r'/new_event', GenerateEvent),
        (r'/check_event', CheckEvent),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
