package main

import (
  "net/http"
  "fmt"
  "github.com/codegangsta/negroni"
  "github.com/julienschmidt/httprouter"
  "github.com/hoisie/mustache"
)

func renderIndex(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
  w.Header().Set("Content-Type", "text/html")
  context := map[string]string{ "greeting":"The Stars My Destination" }

  fmt.Fprint(w, renderHTML("sector", context))
}

/**
 * Takes a template name and context and renders using the layout defined below
 */
func renderHTML(template string, context map[string]string) string {
  layoutPath := "templates/layout.mustache"
  templatePath := "templates/" + template + ".mustache"

  return mustache.RenderFileInLayout(templatePath, layoutPath, context)
}

func main() {
  router := httprouter.New()

  router.GET("/", renderIndex)
  router.GET("/system/:x/:y/", renderIndex)
  // router.GET("/sector/", renderProfile)
  // router.GET("/articles/:id", renderArticle)

  n := negroni.Classic()
  n.UseHandler(router)
  n.Run(":3000")
}
