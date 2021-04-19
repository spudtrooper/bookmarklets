// Package main generates an HTML index from the javascript bookmarklets in js.
package main

import (
	"bytes"
	"flag"
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
	jsDir   = flag.String("js_dir", "js", "The input directory of JS files")
	outfile = flag.String("outfile", "bookmarklets.html", "The output HTML file")
	titleRE = regexp.MustCompile(`@Title: (.*)$`)
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

	type titledJS struct {
		Title, JS string
	}

	var titledJSs []titledJS
	for _, f := range files {
		title, err := fileTitle(f)
		if err != nil {
			return err
		}
		p := titledJS{Title: title, JS: minifiedFiles[f]}
		titledJSs = append(titledJSs, p)
	}

	data := struct {
		TitledJSs []titledJS
	}{
		TitledJSs: titledJSs,
	}
	var out bytes.Buffer
	tmpl, err := template.New("index").Parse(`
<html>
<boody>
<ul>
{{ range $index, $p := .TitledJSs }}
     <li><a href="javascript:{{$p.JS}}">{{$p.Title}}</a></li>
{{end}}
</ul>
</body>
</html>
	`)
	if err != nil {
		return err
	}
	if err = tmpl.Execute(&out, data); err != nil {
		return err
	}

	log.Printf("Writing to %s\n", *outfile)
	if err := ioutil.WriteFile(*outfile, out.Bytes(), 0755); err != nil {
		return err
	}

	return nil
}

func main() {
	flag.Parse()
	if err := generateIndex(); err != nil {
		log.Fatalf("generateIndex: %v", err)
	}
}
