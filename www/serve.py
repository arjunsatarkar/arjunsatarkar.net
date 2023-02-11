import bottle
import json
import os
import pathlib

PORT = 80

parent = pathlib.Path(__file__).parent.resolve()
public = parent / "public"

map = None
with open(parent / "map.json", "r") as map_file:
	map = json.load(map_file)

@bottle.route("/styles/<style>")
def serve_styles(style):
	return bottle.static_file(style, root=public / "styles")

@bottle.route("<path:path>")
def serve_from_map(path):
	try:
		file_name = map[path]
	except KeyError:
		return bottle.HTTPError(404)
	if file_name.endswith(".adoc"):
		file_name = file_name.removesuffix(".adoc") + ".html"
	return bottle.static_file(file_name, root=public)

bottle.run(host="0.0.0.0", port=PORT)
