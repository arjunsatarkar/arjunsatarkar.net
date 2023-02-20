#!/usr/bin/env python3
import subprocess

print(
    subprocess.check_output(
        [
            "asciidoctor",
            "--safe-mode",
            "secure",
            "-a",
            "webfonts!",
            "-a",
            "stylesheet!",
            "-a",
            "last-update-label!",
            "-e",
            "-a",
            "notitle!",
            "-",
        ]
    ).decode("utf-8")
)
