#!/bin/sh

scripts=$(dirname $0)

$scripts/commit.sh --allow-empty "$@"

git push -u
