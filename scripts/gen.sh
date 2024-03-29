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
    --template_html_file
    templates/index.html
    --footer_html
    "Generated by <a href='https://github.com/spudtrooper/bookmarkletgen' target='_'>bookmarkletgen</a> on <em>$(date)</em>"
)
bookmarkletgen "${args[@]}"
