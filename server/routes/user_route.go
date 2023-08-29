package routes

import (
	"github.com/joaoflaviopinto/balanca_api/controllers"

	"github.com/gofiber/fiber/v2"
)

func UserRoute(app *fiber.App) {
	app.Post("/users", controllers.CreateUser)
	app.Post("/login", controllers.Login)
	app.Post("/logout", controllers.Protect(), controllers.Logout)
	app.Get("/users", controllers.GetAllUsers)
}
