#!/bin/sh

go run generate_index.go

outdir=../spudtrooper.github.io
cp bookmarklets.md $outdir/bookmarklets/index.md

if [[ "$@" != "" ]]; then
    echo "Copied to $outdir...committing..."
    pushd $outdir
    scripts/commit.sh
    popd
else
    echo "Copied to $outdir...run the following to commit"
    echo
    echo "  pushd $outdir && scripts/commit.sh && popd"
    echo
fi
