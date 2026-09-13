#!/usr/bin/env bash
# Capture a project thumbnail at the same geometry as the existing ones (1000x508).
#
# Usage: scripts/capture-thumbnail.sh <url> <name>
#   e.g. scripts/capture-thumbnail.sh https://mosestab.com mosestab
#        -> static/projects/mosestab.webp
#
# Shoots at 2x and downscales so text stays legible once ProjectCard enlarges
# the image. A fresh --user-data-dir keeps runs from sharing profile state.
set -euo pipefail

url=${1:?usage: capture-thumbnail.sh <url> <name>}
name=${2:?usage: capture-thumbnail.sh <url> <name>}

here=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
CHROME=$("$here/find-chrome.sh")

out=static/projects/$name.webp
profile=$(mktemp -d)
png=$(mktemp -t "thumb-$name").png
trap 'rm -rf "$profile" "$png"' EXIT

"$CHROME" --disable-gpu --hide-scrollbars \
	--user-data-dir="$profile" \
	--window-size=2000,1016 \
	--virtual-time-budget=20000 \
	--screenshot="$png" "$url" >/dev/null 2>&1

[[ -s $png ]] || { echo "capture produced nothing for $url" >&2; exit 1; }

sips --resampleWidth 1000 "$png" --out "$png" >/dev/null
cwebp -quiet -q 82 "$png" -o "$out"

printf '%s  %sx%s  %s\n' "$out" \
	"$(sips -g pixelWidth "$out" | awk '/pixelWidth/{print $2}')" \
	"$(sips -g pixelHeight "$out" | awk '/pixelHeight/{print $2}')" \
	"$(du -h "$out" | cut -f1)"
