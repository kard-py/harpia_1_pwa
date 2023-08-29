package routes

import (
	"github.com/joaoflaviopinto/balanca_api/controllers"

	"github.com/gofiber/fiber/v2"
)

func ProdutoRoute(app *fiber.App) {
	app.Post("/produtos", controllers.CreateProduto)
	app.Get("/produtos/:produtoId", controllers.GetAProduto)
	app.Put("/produtos/:produtoId", controllers.EditAProduto)
	app.Delete("/produtos/:produtoId", controllers.DeleteAProduto)
	app.Get("/produtos", controllers.GetAllProdutos)
}
