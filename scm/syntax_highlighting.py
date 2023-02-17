#!/usr/bin/env python3
import subprocess
import sys
import os

_, extension = os.path.splitext(sys.argv[1])
extension = extension.removeprefix(".")

if not extension:
    extension = "txt"

print(
    subprocess.check_output(
        [
            "highlight",
            "--force",
            "--inline-css",
            "-f",
            "-I",
            "-O",
            "html",
            "-S",
            extension,
        ]
    ).decode("utf-8")
)
