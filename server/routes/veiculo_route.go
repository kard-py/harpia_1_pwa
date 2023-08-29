package routes

import (
	"github.com/joaoflaviopinto/balanca_api/controllers"

	"github.com/gofiber/fiber/v2"
)

func VeiculoRoute(app *fiber.App) {
	app.Post("/veiculos", controllers.CreateVeiculo)
	app.Get("/veiculos/:veiculoId", controllers.GetAVeiculo)
	app.Put("/veiculos/:veiculoId", controllers.EditAVeiculo)
	app.Delete("/veiculos/:veiculoId", controllers.DeleteAVeiculo)
	app.Get("/veiculos", controllers.GetAllVeiculos)
}
