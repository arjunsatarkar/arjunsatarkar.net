import bottle
import os
import pathlib
import sys

PORT = 27701
if len(sys.argv) > 1:
    PORT = int(sys.argv[1])

parent = pathlib.Path(__file__).parent.resolve()
webroot = parent / "webroot"


@bottle.route("/")
def serve_index():
    return bottle.static_file("index.html", root=webroot / "content")


@bottle.route("/index")
def reject_noncanonical_index():
    return bottle.HTTPError(404)


@bottle.route("/styles/<style>")
def serve_styles(style):
    return bottle.static_file(style, root=webroot / "styles")


@bottle.route("/media/<media>")
def serve_media(media):
    return bottle.static_file(media, root=webroot / "media")


@bottle.route("/<content>")
def serve(content):
    if os.path.isfile(webroot / "content" / (content + ".html")):
        return bottle.static_file(content + ".html", root=webroot / "content")
    else:
        return bottle.static_file(content, root=webroot / "content")


@bottle.error(404)
def serve_404(error):
    return bottle.static_file("404.html", root=parent)


bottle.run(host="0.0.0.0", port=PORT)
