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
	jsDir         = flag.String("js_dir", "js", "The input directory of JS files")
	outfileHTML   = flag.String("outfile_html", "output/bookmarklets.html", "The output HTML file")
	outfileMD     = flag.String("outfile_md", "output/bookmarklets.md", "The output Markdown file")
	baseSourceURL = flag.String("base_source_url", "https://github.com/spudtrooper/bookmarklets/blob/main/js", "The base source URL when linking to the source files")
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

type fileMetadata struct {
	title, description string
}

var (
	titleRE = regexp.MustCompile(`.*@Title:(.*)$`)
	descrRE = regexp.MustCompile(`.*@Description:(.*)$`)
)

func titleFromFileName(f string) string {
	ext := path.Ext(f)
	base := path.Base(f)
	titleBase := base[0 : len(base)-len(ext)]
	parts := strings.Split(titleBase, "-")
	output := []string{}
	for _, p := range parts {
		cap := strings.Title(strings.ToLower(p))
		output = append(output, cap)

	}
	return strings.Join(output, " ")
}

func findFileMetadata(f string) (*fileMetadata, error) {
	b, err := ioutil.ReadFile(f)
	if err != nil {
		return nil, err
	}
	var title string
	var descr string
	lines := strings.Split(string(b), "\n")
	for _, s := range lines {
		if m := titleRE.FindStringSubmatch(s); m != nil && len(m) == 2 {
			title = strings.TrimSpace(m[1])
		} else if m := descrRE.FindStringSubmatch(s); m != nil && len(m) == 2 {
			descr = strings.TrimSpace(m[1])
		}
	}
	if title == "" {
		title = titleFromFileName(f)
	}
	res := &fileMetadata{
		title:       title,
		description: descr,
	}
	return res, nil
}

type titledJS struct {
	Title, Description, JS, Link string
}

func genIndexHTML(titledJSs []titledJS) ([]byte, error) {
	tmpl, err := template.New("html").Parse(`
<html>
<body>	
	<h1>Bookmarklets</h1>
	<p>
		To install, drag the links not titled 'src' to your toolbar.
	</p>
	<p>
		<ul>
		{{range $index, $p := .TitledJSs}}
				<li><a href="javascript:{{$p.JS}}">{{$p.Title}}</a> (<a target="_" href="{{$p.Link}}">src</a>) - {{$p.Description}}</li>
		{{end}}
		</ul>
	</p>
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

To install, drag the links not titled 'src' to your toolbar.

{{range $index, $p := .TitledJSs}}
*	[{{$p.Title}}](javascript:{{$p.JS}}) ([src]({{$p.Link}})) - {{$p.Description}}
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

	var titledJSs []titledJS
	for f := range minifiedFiles {
		metadata, err := findFileMetadata(f)
		if err != nil {
			return err
		}
		link := fmt.Sprintf(*baseSourceURL+"/%s", path.Base(f))
		js := minifiedFiles[f]
		title := metadata.title
		descr := metadata.description
		t := titledJS{
			Title:       title,
			Description: descr,
			JS:          js,
			Link:        link,
		}
		titledJSs = append(titledJSs, t)
	}

	sort.Slice(titledJSs, func(i, j int) bool {
		return titledJSs[i].Title < titledJSs[j].Title
	})

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
