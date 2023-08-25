package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/joaoflaviopinto/balanca_api/configs"
	"github.com/joaoflaviopinto/balanca_api/models"
	"github.com/joaoflaviopinto/balanca_api/responses"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var produtoCollection *mongo.Collection = configs.GetCollection(configs.DB, "produtos")

func CreateProduto(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var produto models.Produto
	defer cancel()

	if err := c.BodyParser(&produto); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ProdutoResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if validationErr := validate.Struct(&produto); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ProdutoResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	newProduto := models.Produto{
		DataRegistro: produto.DataRegistro,
		Nome:         produto.Nome,
	}

	result, err := produtoCollection.InsertOne(ctx, newProduto)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ProdutoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(responses.ProdutoResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
}

func GetAProduto(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	produtoId := c.Params("produtoId")
	var produto models.Produto
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(produtoId)

	err := produtoCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&produto)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ProdutoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.ProdutoResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": produto}})
}

func EditAProduto(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	produtoId := c.Params("produtoId")
	var produto models.Produto
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(produtoId)

	if err := c.BodyParser(&produto); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ProdutoResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if validationErr := validate.Struct(&produto); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ProdutoResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	update := bson.M{
		"dataRegistro": produto.DataRegistro,
		"nome":         produto.Nome,
	}

	result, err := produtoCollection.UpdateOne(ctx, bson.M{"_id": objId}, bson.M{"$set": update})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ProdutoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	var updatedProduto models.Produto
	if result.MatchedCount == 1 {
		err := produtoCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&updatedProduto)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.ProdutoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
	}

	return c.Status(http.StatusOK).JSON(responses.ProdutoResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": updatedProduto}})
}

func DeleteAProduto(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	produtoId := c.Params("produtoId")
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(produtoId)

	result, err := produtoCollection.DeleteOne(ctx, bson.M{"_id": objId})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ProdutoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if result.DeletedCount < 1 {
		return c.Status(http.StatusNotFound).JSON(responses.ProdutoResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": "O produto com esse ID não foi encontrado"}})
	}

	return c.Status(http.StatusOK).JSON(responses.ProdutoResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": "Produto apagado com sucesso!"}})
}

func GetAllProdutos(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var produtos []models.Produto
	defer cancel()

	results, err := produtoCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ProdutoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}
	defer results.Close(ctx)

	for results.Next(ctx) {
		var singleProduto models.Produto
		if err = results.Decode(&singleProduto); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.ProdutoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		produtos = append(produtos, singleProduto)
	}

	return c.Status(http.StatusOK).JSON(responses.ProdutoResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": produtos}})
}
