#!/bin/sh
#
# Runs the index generator.
#
set -e

mkdir -p output
args=(
    --base_source_url
    https://github.com/spudtrooper/bookmarklets/blob/main/src
    --js_dir
    src
    --outfile_html
    output/bookmarklets.html
    --outfile_md
    output/bookmarklets.md
    --template_html_file
    templates/index.html
)
bookmarkletgen "${args[@]}"
