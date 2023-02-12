import bottle
import os
import pathlib
import sys

PORT = 80
if len(sys.argv) > 1:
	PORT = int(sys.argv[1])

parent = pathlib.Path(__file__).parent.resolve()
webroot = parent/"webroot"

@bottle.route("/")
def serve_index():
	return bottle.static_file("index.html", root=webroot)

@bottle.route("/index")
def reject_noncanonical_index():
	return bottle.HTTPError(404)

@bottle.route("/<path:path>")
def serve(path):
	if os.path.isfile(webroot / (path + ".html")):
		return bottle.static_file(path + ".html", root=webroot)
	else:
		if path.endswith(".html"):
			return bottle.HTTPError(404)
		return bottle.static_file(path, root=webroot)

bottle.run(host="0.0.0.0", port=PORT)
