package main

import (
	"net/http"

	"github.com/Laegas/habitville/controllers"
	"github.com/Laegas/habitville/templates"
	"github.com/Laegas/habitville/templates/pages"
	"github.com/a-h/templ"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func initRouter(cfg *controllers.ApiConfig) http.Handler {
	r := chi.NewRouter()
	app := chi.NewRouter()
	api := chi.NewRouter()

	r.Use(cors.Handler(cors.Options{}))

	// App
	app.Handle("/", templ.Handler(templates.BaseHtml(pages.Index())))
	app.Handle("/add_habit", templ.Handler(templates.BaseHtml(pages.CreateHabit())))

	// API
	api.Get("/hello", cfg.HelloHandler)

	// Mount app and API
	r.Mount("/", app)
	r.Mount("/api", api)

	return r
}