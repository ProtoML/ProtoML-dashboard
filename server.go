package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"net/http"
	"os"
	"strconv"
)

/**
	Common Functions
**/
type Page struct {
	Title    string
	Template string
}

type Form struct {
	Input1 string
	Input2 string
	Input3 int
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

func api(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Response from API poll")
}

func save(w http.ResponseWriter, r *http.Request) {
	input1 := r.FormValue("input1")
	input2 := r.FormValue("input2")
	input3, err := strconv.Atoi(r.FormValue("input3"))
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	form := Form{Input1: input1, Input2: input2, Input3: input3}

	formJSON, err := json.Marshal(form)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	file, err := os.Create("formdata.json")
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	file.Write(formJSON)
	file.Close()
}

/**
	MAIN
**/
func main() {
	port := ":8000"
	http.HandleFunc("/static/", static)
	http.HandleFunc("/api", api)
	http.HandleFunc("/save", save)
	http.HandleFunc("/", index)
	http.ListenAndServe(port, nil)
}
