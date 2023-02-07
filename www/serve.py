import bottle
import os
import pathlib

PORT = 80

parent = pathlib.Path(__file__).parent.resolve()
public = parent / "public"

@bottle.route("/")
def index():
	return bottle.static_file("index.html", root=public)

@bottle.route("/index")
def invalid_index():
	return bottle.HTTPError(404)

@bottle.route("/<path:path>")
def serve(path):
	if path.endswith(".html"):
		return bottle.HTTPError(404)

	if os.path.isfile(public / path):
		return bottle.static_file(path, root=public)
	elif os.path.isfile(public / (path + ".html")):
		return bottle.static_file(path + ".html", root=public)
	else:
		return bottle.HTTPError(404)

bottle.run(host="0.0.0.0", port=PORT)
