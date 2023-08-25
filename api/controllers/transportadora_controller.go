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

var transportadoraCollection *mongo.Collection = configs.GetCollection(configs.DB, "transportadoras")

func CreateTransportadora(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var transportadora models.Transportadora
	defer cancel()

	// Validar o corpo da solicitação
	if err := c.BodyParser(&transportadora); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.TransportadoraResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//Usar a lib validator pra verificar os campos obrigatórios
	if validationErr := validate.Struct(&transportadora); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.TransportadoraResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	newTransportadora := models.Transportadora{
		Id:                primitive.NewObjectID(),
		DataRegistro:      transportadora.DataRegistro,
		Nome:              transportadora.Nome,
		NomeFantasia:      transportadora.NomeFantasia,
		TipoPessoa:        transportadora.TipoPessoa,
		Doc:               transportadora.Doc,
		InscricaoEstadual: transportadora.InscricaoEstadual,
		Cep:               transportadora.Cep,
		Uf:                transportadora.Uf,
		Cidade:            transportadora.Cidade,
		Bairro:            transportadora.Bairro,
		Logradouro:        transportadora.Logradouro,
		Numero:            transportadora.Numero,
		TelUm:             transportadora.TelUm,
		TelDois:           transportadora.TelDois,
		Email:             transportadora.Email,
		Observacao:        transportadora.Observacao,
	}

	result, err := transportadoraCollection.InsertOne(ctx, newTransportadora)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.TransportadoraResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})

	}

	return c.Status(http.StatusCreated).JSON(responses.TransportadoraResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
}

func GetATransportadora(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	transportadoraId := c.Params("transportadoraId")
	var transportadora models.Transportadora
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(transportadoraId)

	err := transportadoraCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&transportadora)

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.TransportadoraResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.TransportadoraResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": transportadora}})
}

func EditATransportadora(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	transportadoraId := c.Params("transportadoraId")
	var transportadora models.Transportadora
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(transportadoraId)

	//Validar o corpo da requisição
	if err := c.BodyParser(&transportadora); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.TransportadoraResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//Usar a lib validator pra verificar os campos obrigatórios
	if validationErr := validate.Struct(&transportadora); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.TransportadoraResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	update := bson.M{
		"dataRegistro":      transportadora.DataRegistro,
		"nome":              transportadora.Nome,
		"nomeFantasia":      transportadora.NomeFantasia,
		"tipoPessoa":        transportadora.TipoPessoa,
		"doc":               transportadora.Doc,
		"inscricaoEstadual": transportadora.InscricaoEstadual,
		"cep":               transportadora.Cep,
		"uf":                transportadora.Uf,
		"cidade":            transportadora.Cidade,
		"bairro":            transportadora.Bairro,
		"logradouro":        transportadora.Logradouro,
		"numero":            transportadora.Numero,
		"telUm":             transportadora.TelUm,
		"telDois":           transportadora.TelDois,
		"email":             transportadora.Email,
		"observacao":        transportadora.Observacao,
	}

	result, err := transportadoraCollection.UpdateOne(ctx, bson.M{"_id": objId}, bson.M{"$set": update})

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.TransportadoraResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//Receber os detalhes da transportadora atualizados
	var updatedTransportadora models.Transportadora
	if result.MatchedCount == 1 {
		err := transportadoraCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&updatedTransportadora)

		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.TransportadoraResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
	}

	return c.Status(http.StatusOK).JSON(responses.TransportadoraResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": updatedTransportadora}})
}

func DeleteATransportadora(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	transportadoraId := c.Params("transportadoraId")
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(transportadoraId)

	result, err := transportadoraCollection.DeleteOne(ctx, bson.M{"_id": objId})

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.TransportadoraResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if result.DeletedCount < 1 {
		return c.Status(http.StatusNotFound).JSON(
			responses.TransportadoraResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": "A transportadora com esse ID não foi encontrada"}},
		)
	}

	return c.Status(http.StatusOK).JSON(
		responses.TransportadoraResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": "Transportadora apagada com sucesso!"}},
	)
}

func GetAllTransportadoras(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var transportadoras []models.Transportadora
	defer cancel()

	results, err := transportadoraCollection.Find(ctx, bson.M{})

	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.TransportadoraResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	//Ler do banco de dados
	defer results.Close(ctx)
	for results.Next(ctx) {
		var singleTransportadora models.Transportadora
		if err = results.Decode(&singleTransportadora); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.TransportadoraResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}

		transportadoras = append(transportadoras, singleTransportadora)
	}

	return c.Status(http.StatusOK).JSON(
		responses.TransportadoraResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": transportadoras}},
	)
}
