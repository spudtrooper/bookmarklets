// Package bookmarkletgen generates an HTML index from the javascript bookmarklets in js.
package bookmarkletgen

import (
	"io/ioutil"
	"log"
	"sort"
)

// Options specify the files to which `GenerateIndexFiles` outputs and other options to this function.
type Options struct {
	OutfileHTML   string
	OutfileMD     string
	BaseSourceURL string
}

// GenerateIndexFiles generates bookmarklet index files for the given JS files.
func GenerateIndexFiles(jsFiles []string, opts Options) error {
	titledJSs, err := inspectFiles(jsFiles, opts.BaseSourceURL)
	if err != nil {
		return err
	}

	sort.Slice(titledJSs, func(i, j int) bool {
		return titledJSs[i].Title < titledJSs[j].Title
	})

	if opts.OutfileHTML != "" {
		out, err := genIndexHTML(titledJSs)
		if err != nil {
			return err
		}
		log.Printf("Writing to %s\n", opts.OutfileHTML)
		if err := ioutil.WriteFile(opts.OutfileHTML, out, 0755); err != nil {
			return err
		}
	}

	if opts.OutfileMD != "" {
		out, err := genIndexMD(titledJSs)
		if err != nil {
			return err
		}
		log.Printf("Writing to %s\n", opts.OutfileMD)
		if err := ioutil.WriteFile(opts.OutfileMD, out, 0755); err != nil {
			return err
		}
	}

	return nil
}
