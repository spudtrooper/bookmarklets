#!/bin/sh
#
# Generates the index and copies to my githubio directory. To commit, pass
# anything as arguments, e.g.
#
#   $ ./scripts/publish.sh asdf
#
set -e

$(dirname $0)/gen.sh

outdir=../../github/spudtrooper.github.io
cp output/bookmarklets.html $outdir/bookmarklets/index.html

if [[ "$@" != "" ]]; then
    echo "Copied to $outdir...committing..."
    pushd $outdir
    scripts/commit.sh
    popd
else
    echo "To copy to $outdir...run the following to commit"
    echo
    echo "  pushd $outdir && scripts/push.sh && popd"
    echo
fi
