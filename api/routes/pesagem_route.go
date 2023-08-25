package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	"github.com/joaoflaviopinto/balanca_api/controllers"
)

func PesagemRoute(app *fiber.App) {
	app.Get("/serial", websocket.New(controllers.PesoWebSocket))
	app.Post("/pesagens", controllers.CreatePesagem)
	app.Get("/pesagens/:produtoId", controllers.GetAPesagem)
	app.Put("/pesagens/:produtoId", controllers.EditAPesagem)
	app.Delete("/pesagens/:produtoId", controllers.DeleteAPesagem)
	app.Get("/pesagens", controllers.GetAllProdutos)
	app.Post("/pesagens/placa", controllers.GetPesagemByPlaca)
}
