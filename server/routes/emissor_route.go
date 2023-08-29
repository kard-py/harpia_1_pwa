package routes

import (
	"github.com/joaoflaviopinto/balanca_api/controllers"

	"github.com/gofiber/fiber/v2"
)

func EmissorRoute(app *fiber.App) {
	app.Post("/emissores", controllers.CreateEmissor)
	app.Get("/emissores/:emissorId", controllers.GetAEmissor)
	app.Put("/emissores/:emissorId", controllers.EditAEmissor)
	app.Delete("/emissores/:emissorId", controllers.DeleteAEmissor)
	app.Get("/emissores", controllers.GetAllEmissoras)
}
