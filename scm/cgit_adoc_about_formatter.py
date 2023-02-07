#!/usr/bin/env python3

from bs4 import BeautifulSoup
import sys
import subprocess

html = subprocess.check_output(["asciidoctor", "-a", "webfonts!", "-a", "stylesheet!", "-a", "last-update-label!", "-"])

soup = BeautifulSoup(html, 'html.parser')

print(soup.body.decode_contents())
