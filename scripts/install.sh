#!/bin/sh

go run generate_index.go

cp bookmarklets.md ../spudtrooper.github.io/bookmarklets/index.md
