package main

import (
	"net/http"
	"html/template"
)

/**
	Common Functions
**/
type Page struct {
	Title string
	Template string
}

func displayPage(w http.ResponseWriter, r *http.Request, p Page) {
	t, _ := template.ParseFiles("templates/header.html", p.Template)
	t.ExecuteTemplate(w, "content", p)
}
func static(w http.ResponseWriter, r *http.Request) {
	const lenPath = len("/static/")
	filename := "static/" + r.URL.Path[lenPath:]
	http.ServeFile(w, r, filename)
}

/**
	Page Definitions
**/
func index(w http.ResponseWriter, r *http.Request) {
	displayPage(w, r, Page{Title: "Hello World", Template: "templates/HelloWorld.html"})
}

/**
	MAIN
**/
func main() {
	port := ":80"
	http.HandleFunc("/static/", static)
	http.HandleFunc("/", index)
	http.ListenAndServe(port, nil)
}
