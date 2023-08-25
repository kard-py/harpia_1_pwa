package controllers

import (
	"context"
	"log"
	"net/http"
	"regexp"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/websocket/v2"
	"github.com/joaoflaviopinto/balanca_api/configs"
	"github.com/joaoflaviopinto/balanca_api/models"
	"github.com/joaoflaviopinto/balanca_api/responses"
	"github.com/tarm/serial"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var pesagemCollection *mongo.Collection = configs.GetCollection(configs.DB, "pesagens")

func GetPesagemByPlaca(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	type PlacaRequestBody struct {
		Placa string `json:"placa"`
	}

	var requestBody PlacaRequestBody
	if err := c.BodyParser(&requestBody); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.PesagemResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	var pesagem models.Pesagem

	err := pesagemCollection.FindOne(ctx, bson.M{"placa": requestBody.Placa}).Decode(&pesagem)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.Status(http.StatusNotFound).JSON(responses.PesagemResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": "Nenhuma pesagem encontrada para a placa fornecida"}})
		}
		return c.Status(http.StatusInternalServerError).JSON(responses.PesagemResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	var veiculo models.Veiculo
	err = veiculoCollection.FindOne(ctx, bson.M{"_id": pesagem.VeiculoId}).Decode(&veiculo)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.PesagemResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	var transportadora models.Transportadora
	err = transportadoraCollection.FindOne(ctx, bson.M{"_id": veiculo.TransportadoraId}).Decode(&transportadora)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.PesagemResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	responseData := struct {
		Pesagem            models.Pesagem `json:"pesagem"`
		NomeTransportadora string         `json:"nomeTransportadora"`
		NomeMotorista      string         `json:"nomeMotorista"`
	}{
		Pesagem:            pesagem,
		NomeTransportadora: transportadora.Nome,
		NomeMotorista:      veiculo.NomeMotorista,
	}

	return c.Status(http.StatusOK).JSON(responses.PesagemResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": responseData}})
}

func CreatePesagem(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var pesagem models.Pesagem
	defer cancel()

	if err := c.BodyParser(&pesagem); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.PesagemResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if validationErr := validate.Struct(&pesagem); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.PesagemResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	newPesagem := models.Pesagem{
		DataRegistro: pesagem.DataRegistro,
	}

	result, err := pesagemCollection.InsertOne(ctx, newPesagem)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.PesagemResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusCreated).JSON(responses.PesagemResponse{Status: http.StatusCreated, Message: "success", Data: &fiber.Map{"data": result}})
}

func GetAPesagem(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	pesagemId := c.Params("pesagemId")
	var pesagem models.Pesagem
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(pesagemId)

	err := pesagemCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&pesagem)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.PesagemResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	return c.Status(http.StatusOK).JSON(responses.PesagemResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": pesagem}})
}

func EditAPesagem(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	pesagemId := c.Params("pesagemId")
	var pesagem models.Pesagem
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(pesagemId)

	if err := c.BodyParser(&pesagem); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.PesagemResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if validationErr := validate.Struct(&pesagem); validationErr != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.PesagemResponse{Status: http.StatusBadRequest, Message: "error", Data: &fiber.Map{"data": validationErr.Error()}})
	}

	update := bson.M{
		"dataRegistro": pesagem.DataRegistro,
	}

	result, err := pesagemCollection.UpdateOne(ctx, bson.M{"_id": objId}, bson.M{"$set": update})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.PesagemResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	var updatedPesagem models.Pesagem
	if result.MatchedCount == 1 {
		err := pesagemCollection.FindOne(ctx, bson.M{"_id": objId}).Decode(&updatedPesagem)
		if err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.PesagemResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
	}

	return c.Status(http.StatusOK).JSON(responses.PesagemResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": updatedPesagem}})
}

func DeleteAPesagem(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	pesagemId := c.Params("pesagemId")
	defer cancel()

	objId, _ := primitive.ObjectIDFromHex(pesagemId)

	result, err := pesagemCollection.DeleteOne(ctx, bson.M{"_id": objId})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.PesagemResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}

	if result.DeletedCount < 1 {
		return c.Status(http.StatusNotFound).JSON(responses.PesagemResponse{Status: http.StatusNotFound, Message: "error", Data: &fiber.Map{"data": "Não existe nenhuma pesagem com esse ID"}})
	}

	return c.Status(http.StatusOK).JSON(responses.PesagemResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": "Pesagem apagada com sucesso!"}})
}

func GetAllPesagens(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var pesagens []models.Pesagem
	defer cancel()

	results, err := pesagemCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.PesagemResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
	}
	defer results.Close(ctx)

	for results.Next(ctx) {
		var singlePesagem models.Pesagem
		if err = results.Decode(&singlePesagem); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.PesagemResponse{Status: http.StatusInternalServerError, Message: "error", Data: &fiber.Map{"data": err.Error()}})
		}
		pesagens = append(pesagens, singlePesagem)
	}

	return c.Status(http.StatusOK).JSON(responses.PesagemResponse{Status: http.StatusOK, Message: "success", Data: &fiber.Map{"data": pesagens}})
}

func serialReader(serialPort *serial.Port, conn *websocket.Conn) {
	for {
		buf := make([]byte, 128)
		n, err := serialPort.Read(buf)
		if err != nil {
			log.Println("Erro ao ler a porta serial:", err)
			return
		}

		data := buf[:n]
		strData := strings.Trim(string(data), "\x00")
		lines := strings.Split(strData, "\x02")

		pattern := regexp.MustCompile(`010(\d+)`)
		extractedValues := []string{}

		for _, line := range lines {
			match := pattern.FindStringSubmatch(line)
			if len(match) > 1 {
				extractedValue := match[1]
				extractedValues = append(extractedValues, extractedValue)
			}
		}

		if len(extractedValues) > 0 {
			err := conn.WriteMessage(websocket.TextMessage, []byte(extractedValues[len(extractedValues)-1]))
			if err != nil {
				log.Println("Erro ao enviar dados para o Websocket:", err)
				return
			}
		}
	}
}

func PesoWebSocket(c *websocket.Conn) {
	serialConfig := &serial.Config{
		Name: "COM3",
		Baud: 9600,
	}

	serialPort, err := serial.OpenPort(serialConfig)
	if err != nil {
		log.Println("Erro ao abrir a porta serial:", err)
		return
	}
	defer serialPort.Close()

	serialReader(serialPort, c)
}
