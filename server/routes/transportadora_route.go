package routes

import (
	"github.com/joaoflaviopinto/balanca_api/controllers"

	"github.com/gofiber/fiber/v2"
)

func TransportadoraRoute(app *fiber.App) {
	app.Post("/transportadoras", controllers.CreateTransportadora)
	app.Get("/transportadoras/:transportadoraId", controllers.GetATransportadora)
	app.Put("/transportadoras/:transportadoraId", controllers.EditATransportadora)
	app.Delete("/transportadoras/:transportadoraId", controllers.DeleteATransportadora)
	app.Get("/transportadoras", controllers.GetAllTransportadoras)
}