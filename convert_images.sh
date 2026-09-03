#!/usr/bin/env sh
cd build/assets || exit
cwebp Starsinthesky/Starsinthesky.jpg -o Starsinthesky/Starsinthesky_bgclip.webp -q 50 -m 6 -crop 300 0 3577 2188 -resize 1000 500 -mt -af
