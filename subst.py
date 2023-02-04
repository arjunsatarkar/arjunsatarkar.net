import os
import pathlib

parent_dir = pathlib.Path(__file__).parent.resolve()

substs = {
	"%www.arjunsatarkar.net webroot%": lambda: str(parent_dir / "www/public"),
	"%cgit scan path%": lambda: str(parent_dir / "scm/cgit_scan_path"),
}

def find_unsubst_files(base=pathlib.Path(__file__).parent.resolve(), max_depth=1):
	unsubst_file_paths = set()
	for direntry in os.scandir(base):
		if direntry.is_file() and direntry.name.endswith(".unsubst"):
			unsubst_file_paths.add(direntry.path)
		elif direntry.is_dir():
			if max_depth < 1:
				continue
			else:
				unsubst_file_paths |= find_unsubst_files(direntry.path, max_depth - 1)
	return unsubst_file_paths

unsubst_file_paths = find_unsubst_files()

for unsubst_file_path in unsubst_file_paths:
	print("Processing", unsubst_file_path)
	text = None
	with open(unsubst_file_path, "r") as unsubst_file:
		text = unsubst_file.read()

	for subst_key in substs.keys():
		text = text.replace(subst_key, substs[subst_key]())

	with open(unsubst_file_path.removesuffix(".unsubst"), "w") as output_file:
		output_file.write(text)
