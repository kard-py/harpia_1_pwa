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

var veiculoCollection *mongo.Collection = configs.GetCollection(configs.DB, "veiculos")

func CreateVeiculo(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var veiculo models.Veiculo
	defer cancel()

	if err := c.BodyParser(&veiculo); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.VeiculoResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if validationErr := validate.Struct(&veiculo); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.VeiculoResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	newVeiculo := models.Veiculo{
		Id:               primitive.NewObjectID(),
		DataRegistro:     veiculo.DataRegistro,
		TipoPlaca:        veiculo.TipoPlaca,
		Placa:            veiculo.Placa,
		TransportadoraId: veiculo.TransportadoraId,
		NomeMotorista:    veiculo.NomeMotorista,
	}

	result, err := veiculoCollection.InsertOne(ctx, newVeiculo)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.VeiculoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(responses.VeiculoResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
}

func GetAVeiculo(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	veiculoId := c.Params("veiculoId")
	var veiculo models.Veiculo
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(veiculoId)

	err := veiculoCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&veiculo)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.VeiculoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.VeiculoResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": veiculo}})
}

func EditAVeiculo(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	veiculoId := c.Params("veiculoId")
	var veiculo models.Veiculo
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(veiculoId)

	if err := c.BodyParser(&veiculo); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.VeiculoResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if validationErr := validate.Struct(&veiculo); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.VeiculoResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	update := bson.M{
		"dataDeRegistro":   veiculo.DataRegistro,
		"tipoPlaca":        veiculo.TipoPlaca,
		"placa":            veiculo.Placa,
		"transportadoraId": veiculo.TransportadoraId,
		"nomeMotorista":    veiculo.NomeMotorista,
	}

	result, err := veiculoCollection.UpdateOne(ctx, bson.M{"_id": objId}, bson.M{"$set": update})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.VeiculoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	var updatedVeiculo models.Veiculo
	if result.MatchedCount == 1 {
		err := veiculoCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&updatedVeiculo)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.VeiculoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
	}

	return c.Status(http.StatusOK).JSON(responses.VeiculoResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": updatedVeiculo}})
}

func DeleteAVeiculo(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	veiculoId := c.Params("veiculoId")
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(veiculoId)

	result, err := veiculoCollection.DeleteOne(ctx, bson.M{"_id": objId})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.VeiculoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if result.DeletedCount < 1 {
		return c.Status(http.StatusNotFound).JSON(responses.VeiculoResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": "O veículo com esse ID não foi encontrado"}})
	}

	return c.Status(http.StatusOK).JSON(responses.VeiculoResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": "Veículo apagado com sucesso!"}})
}

func GetAllVeiculos(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var veiculos []models.Veiculo
	defer cancel()

	results, err := veiculoCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.VeiculoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}
	defer results.Close(ctx)

	for results.Next(ctx) {
		var singleVeiculo models.Veiculo
		if err = results.Decode(&singleVeiculo); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.VeiculoResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		veiculos = append(veiculos, singleVeiculo)
	}

	return c.Status(http.StatusOK).JSON(responses.VeiculoResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": veiculos}})
}
