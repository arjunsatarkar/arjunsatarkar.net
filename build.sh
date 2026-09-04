#!/usr/bin/env sh
node compile_templates &&
./convert_images.sh &&
./generate_feed.py
