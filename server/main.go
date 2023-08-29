package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joaoflaviopinto/balanca_api/configs"
	"github.com/joaoflaviopinto/balanca_api/routes"
)

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "*",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowMethods:     "GET, POST, PUT, DELETE",
		AllowCredentials: true,
	}))

	configs.ConnectDB()
	routes.EmissorRoute(app)
	routes.ProdutoRoute(app)
	routes.TransportadoraRoute(app)
	routes.UserRoute(app)
	routes.VeiculoRoute(app)
	routes.PesagemRoute(app)

	err := app.Listen(":3010")
	if err != nil {
		panic(err)
	}
}
