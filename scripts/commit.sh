#!/bin/sh

git add .
git commit -m "update $(date)" "$@"
