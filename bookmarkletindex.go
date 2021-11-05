// Package main generates an HTML index from the javascript bookmarklets in js.
package main

import (
	"flag"
	"fmt"
	"log"
	"path"
	"path/filepath"

	"github.com/pkg/errors"
	"github.com/spudtrooper/bookmarkletgen/bookmarkletgen"
)

var (
	jsDir         = flag.String("js_dir", "js", "The input directory of JS files, required")
	outfileHTML   = flag.String("outfile_html", "", "The output HTML file, e.g. bookmarklets.html")
	outfileMD     = flag.String("outfile_md", "", "The output Markdown file, e.g. bookmarklets.md")
	baseSourceURL = flag.String("base_source_url", "", "The base source URL when linking to the source files, e.g. https://github.com/spudtrooper/bookmarklets/blob/main/js")
	footerHTML    = flag.String("footer_html", "", "HTML to use as a footer")
)

func generateIndex() error {
	if *jsDir == "" {
		return fmt.Errorf("js_dir required")
	}
	jsFiles, err := filepath.Glob(path.Join(*jsDir, "*.js"))
	if err != nil {
		return err
	}
	if len(jsFiles) == 0 {
		return errors.Errorf("no js files from %s", *jsDir)
	}
	return bookmarkletgen.GenerateIndexFiles(jsFiles,
		bookmarkletgen.OutfileHTML(*outfileHTML),
		bookmarkletgen.OutfileMD(*outfileMD),
		bookmarkletgen.BaseSourceURL(*baseSourceURL),
		bookmarkletgen.FooterHTML(*footerHTML))
}

func main() {
	flag.Parse()
	if err := generateIndex(); err != nil {
		log.Fatalf("generateIndex: %v", err)
	}
}
