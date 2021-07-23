#!/bin/sh
#
# Runs the index generator.
#
set -e

# Pre: 
#
#  go get -u -f github.com/spudtrooper/bookmarkletindex
#
args=(
    --base_source_url
    https://github.com/spudtrooper/bookmarklets/blob/main/js
    --js_dir
    js
    --outfile_html
    output/bookmarklets.html
    --outfile_md
    output/bookmarklets.md
)
go run bookmarkletindex.go "${args[@]}"
