package main

import (
  "net/http"
  "fmt"
  "github.com/julienschmidt/httprouter"
  "encoding/json"
  // "github.com/larspensjo/Go-simplex-noise/simplexnoise"
)

func renderIndex(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
  w.Header().Set("Content-Type", "text/html")
  context := map[string]string{ "greeting":"Hello Space!" }

  fmt.Fprint(w, renderHTML("sector", context))
}

type Sector struct {
  X float64 `json:"x"`
  Y float64 `json:"y"`
  Stars []string `json:"stars"`
}

// type Star struct {
//   X int `json:"x"`
//   Y int `json:"y"`
//   Seed int `json:"seed"`
//   Random int `json:"random"`
// }

// func Noise2(x, y float64) float64

func renderProfile(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
  sector := Sector{0, 0, []string{"foo", "bar"}}

  json, err := json.Marshal(sector)
  if err != nil {
    http.Error(w, err.Error(), http.StatusInternalServerError)
    return
  }

  w.Header().Set("Content-Type", "application/json")
  w.Write(json)
}
