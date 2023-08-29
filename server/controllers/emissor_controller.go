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

var emissorCollection *mongo.Collection = configs.GetCollection(configs.DB, "emissores")

func CreateEmissor(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var emissor models.Emissor
	defer cancel()

	if err := c.BodyParser(&emissor); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.EmissorResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if validationErr := validate.Struct(&emissor); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.EmissorResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	newEmissor := models.Emissor{
		Id:           primitive.NewObjectID(),
		DataRegistro: emissor.DataRegistro,
		Nome:         emissor.Nome,
		TipoPessoa:   emissor.TipoPessoa,
		Doc:          emissor.Doc,
		Cep:          emissor.Cep,
		Logradouro:   emissor.Logradouro,
		Numero:       emissor.Numero,
		Bairro:       emissor.Bairro,
		Cidade:       emissor.Cidade,
		Uf:           emissor.Uf,
		TelUm:        emissor.TelUm,
		TelDois:      emissor.TelDois,
		Email:        emissor.Email,
		Observacao:   emissor.Observacao,
	}

	result, err := emissorCollection.InsertOne(ctx, newEmissor)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.EmissorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(responses.EmissorResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
}

func GetAEmissor(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	emissorId := c.Params("emissorId")
	var emissor models.Emissor
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(emissorId)

	err := emissorCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&emissor)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.EmissorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.EmissorResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": emissor}})
}

func EditAEmissor(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	emissorId := c.Params("emissorId")
	var emissor models.Emissor
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(emissorId)

	if err := c.BodyParser(&emissor); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.EmissorResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if validationErr := validate.Struct(&emissor); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.EmissorResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	update := bson.M{
		"dataDeRegistro": emissor.DataRegistro,
		"nome":           emissor.Nome,
		"tipoPessoa":     emissor.TipoPessoa,
		"doc":            emissor.Doc,
		"cep":            emissor.Cep,
		"logradouro":     emissor.Logradouro,
		"numero":         emissor.Numero,
		"bairro":         emissor.Bairro,
		"cidade":         emissor.Cidade,
		"uf":             emissor.Uf,
		"telefone1":      emissor.TelUm,
		"telefone2":      emissor.TelDois,
		"email":          emissor.Email,
		"observacao":     emissor.Observacao,
	}

	result, err := emissorCollection.UpdateOne(ctx, bson.M{"_id": objId}, bson.M{"$set": update})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.EmissorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	var updatedEmissor models.Emissor
	if result.MatchedCount == 1 {
		err := emissorCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&updatedEmissor)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.EmissorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
	}

	return c.Status(http.StatusOK).JSON(responses.EmissorResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": updatedEmissor}})
}

func DeleteAEmissor(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	emissorId := c.Params("emissorId")
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(emissorId)

	result, err := emissorCollection.DeleteOne(ctx, bson.M{"_id": objId})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.EmissorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if result.DeletedCount < 1 {
		return c.Status(http.StatusNotFound).JSON(responses.EmissorResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": "O emissor com esse ID não foi encontrado"}})
	}

	return c.Status(http.StatusOK).JSON(responses.EmissorResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": "Emissor apagado com sucesso!"}})
}

func GetAllEmissoras(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var emissores []models.Emissor
	defer cancel()

	results, err := emissorCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.EmissorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}
	defer results.Close(ctx)

	for results.Next(ctx) {
		var singleEmissor models.Emissor
		if err = results.Decode(&singleEmissor); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.EmissorResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		emissores = append(emissores, singleEmissor)
	}

	return c.Status(http.StatusOK).JSON(responses.EmissorResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": emissores}})
}
