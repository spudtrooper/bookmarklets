#!/bin/sh
#
# Runs the index generator.
#
set -e

mkdir -p output
args=(
    --base_source_url
    https://github.com/spudtrooper/bookmarklets/blob/main/js
    --js_dir
    js
    --outfile_html
    output/bookmarklets.html
    --outfile_md
    output/bookmarklets.md
    --footer_html
    "[<a href=\"https://github.com/spudtrooper/bookmarklets\">Source</a>]"
)
go run bookmarkletindex.go "${args[@]}"
