package main

import (
  "github.com/hoisie/mustache"
)

/**
 * Renders a map to JSON
 */


/**
 * Takes a template name and context and renders using the layout defined below
 */
func renderHTML(template string, context map[string]string) string {
  layoutPath := "templates/layout.mustache"
  templatePath := "templates/" + template + ".mustache"

  return mustache.RenderFileInLayout(templatePath, layoutPath, context)
}
