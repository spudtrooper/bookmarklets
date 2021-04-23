// Package main generates an HTML index from the javascript bookmarklets in js.
package main

import (
	"bytes"
	"flag"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"path"
	"path/filepath"
	"regexp"
	"sort"
	"strings"

	"github.com/tdewolff/minify"
	"github.com/tdewolff/minify/js"
)

var (
	jsDir       = flag.String("js_dir", "js", "The input directory of JS files")
	outfileHTML = flag.String("outfile_html", "bookmarklets.html", "The output HTML file")
	outfileMD   = flag.String("outfile_md", "bookmarklets.md", "The output Markdown file")
	titleRE     = regexp.MustCompile(`@Title: (.*)$`)
)

func minityJs(f string) (string, error) {
	b, err := ioutil.ReadFile(f)
	if err != nil {
		return "", err
	}
	r := bytes.NewBuffer(b)
	var w bytes.Buffer
	m := minify.New()
	var o js.Minifier
	if err := o.Minify(m, &w, r, nil); err != nil {
		return "", err
	}
	return w.String(), nil
}

func fileTitle(f string) (string, error) {
	b, err := ioutil.ReadFile(f)
	if err != nil {
		return "", err
	}
	lines := strings.Split(string(b), "\n")
	for _, s := range lines {
		if m := titleRE.FindStringSubmatch(s); m != nil && len(m) == 2 {
			return m[1], nil
		}
	}
	ext := path.Ext(f)
	base := path.Base(f)
	res := base[0 : len(base)-len(ext)]
	return res, nil
}

type titledJS struct {
	Title, JS, Link string
}

func genIndexHTML(titledJSs []titledJS) ([]byte, error) {
	tmpl, err := template.New("html").Parse(`
<html>
<body>	
<h1>Bookmarklets</h1>
<ul>
{{ range $index, $p := .TitledJSs }}
		<li><a href="javascript:{{$p.JS}}">{{$p.Title}}</a> (<a target="_" href="{{$p.Link}}">src</a>)</li>
{{end}}
</ul>
</body>
</html>
		`)
	if err != nil {
		return nil, err
	}
	var data = struct {
		TitledJSs []titledJS
	}{
		TitledJSs: titledJSs,
	}
	var out bytes.Buffer
	if err = tmpl.Execute(&out, data); err != nil {
		return nil, err
	}
	return out.Bytes(), nil
}

func genIndexMD(titledJSs []titledJS) ([]byte, error) {
	tmpl, err := template.New("md").Parse(`
# Bookmarklets

	{{ range $index, $p := .TitledJSs }}
*	[{{$p.Title}}](javascript:{{$p.JS}}) ([src]($p.Link))
	{{end}}
		`)
	if err != nil {
		return nil, err
	}
	var data = struct {
		TitledJSs []titledJS
	}{
		TitledJSs: titledJSs,
	}
	var out bytes.Buffer
	if err = tmpl.Execute(&out, data); err != nil {
		return nil, err
	}
	return out.Bytes(), nil
}

func generateIndex() error {
	jsFiles, err := filepath.Glob(path.Join(*jsDir, "*.js"))
	if err != nil {
		return err
	}
	minifiedFiles := map[string]string{}
	for _, f := range jsFiles {
		minified, err := minityJs(f)
		if err != nil {
			return err
		}
		minifiedFiles[f] = minified
	}

	var files []string
	for f := range minifiedFiles {
		files = append(files, f)
	}
	sort.Strings(files)

	var titledJSs []titledJS
	for _, f := range files {
		title, err := fileTitle(f)
		if err != nil {
			return err
		}
		link := fmt.Sprintf("https://github.com/spudtrooper/bookmarklets/blob/main/js/%s", path.Base(f))
		js := minifiedFiles[f]
		t := titledJS{
			Title: title,
			JS:    js,
			Link:  link,
		}
		titledJSs = append(titledJSs, t)
	}

	if *outfileHTML != "" {
		out, err := genIndexHTML(titledJSs)
		if err != nil {
			return err
		}
		log.Printf("Writing to %s\n", *outfileHTML)
		if err := ioutil.WriteFile(*outfileHTML, out, 0755); err != nil {
			return err
		}
	}

	if *outfileMD != "" {
		out, err := genIndexMD(titledJSs)
		if err != nil {
			return err
		}
		log.Printf("Writing to %s\n", *outfileMD)
		if err := ioutil.WriteFile(*outfileMD, out, 0755); err != nil {
			return err
		}
	}

	return nil
}

func main() {
	flag.Parse()
	if err := generateIndex(); err != nil {
		log.Fatalf("generateIndex: %v", err)
	}
}
