// Package main generates an HTML index from the javascript bookmarklets in js.
package main

import (
	"flag"
	"log"
	"path"
	"path/filepath"

	"./bookmarkletgen"
)

var (
	jsDir         = flag.String("js_dir", "js", "The input directory of JS files")
	outfileHTML   = flag.String("outfile_html", "output/bookmarklets.html", "The output HTML file")
	outfileMD     = flag.String("outfile_md", "output/bookmarklets.md", "The output Markdown file")
	baseSourceURL = flag.String("base_source_url", "https://github.com/spudtrooper/bookmarklets/blob/main/js", "The base source URL when linking to the source files")
)

func generateIndex() error {
	jsFiles, err := filepath.Glob(path.Join(*jsDir, "*.js"))
	if err != nil {
		return err
	}
	opts := bookmarkletgen.Options{
		OutfileHTML:   *outfileHTML,
		OutfileMD:     *outfileMD,
		BaseSourceURL: *baseSourceURL,
	}
	return bookmarkletgen.GenerateIndexFiles(jsFiles, opts)
}

func main() {
	flag.Parse()
	if err := generateIndex(); err != nil {
		log.Fatalf("generateIndex: %v", err)
	}
}
