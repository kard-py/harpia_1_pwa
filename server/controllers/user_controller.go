package controllers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"github.com/joaoflaviopinto/balanca_api/configs"
	"github.com/joaoflaviopinto/balanca_api/models"
	"github.com/joaoflaviopinto/balanca_api/responses"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/crypto/bcrypt"
)

var userCollection *mongo.Collection = configs.GetCollection(configs.DB, "users")

func hashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Fatal(err)
	}
	return string(bytes)
}

// Função que compara a senha fornecida com a senha armazenada (criptografada)
func checkPasswordHash(password string, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		log.Println(err)
		return false
	}
	return true
}
func generateToken(user models.User) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)
	claims["username"] = user.Username
	claims["id"] = user.ID.Hex()

	tokenString, err := token.SignedString([]byte("87h3unfs78fh2ojfdsyf8iwunfuiniu@$fnsifffg2"))
	if err != nil {
		log.Println(err)
		return "", err
	}

	return tokenString, nil
}
func Protect() fiber.Handler {
	return func(ctx *fiber.Ctx) error {
		// Verifica se o token JWT é válido e retorna um erro se não for
		tokenString := ctx.Get("Authorization")
		if tokenString == "" {
			return ctx.Status(http.StatusUnauthorized).JSON(responses.ErrorResponse{
				Status:  "error",
				Message: "Unauthorized",
			})
		}

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			// Verifica a assinatura do token JWT
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("invalid signing method")
			}

			// Retorna a chave secreta usada para assinar o token JWT
			return []byte("87h3unfs78fh2ojfdsyf8iwunfuiniu@$fnsifffg2"), nil
		})
		if err != nil {
			return ctx.Status(http.StatusUnauthorized).JSON(responses.ErrorResponse{
				Status:  "error",
				Message: "Unauthorized",
			})
		}

		// Adiciona o token JWT à context do Fiber
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			ctx.Locals("user", claims["user"])
		} else {
			return ctx.Status(http.StatusUnauthorized).JSON(responses.ErrorResponse{
				Status:  "error",
				Message: "Unauthorized",
			})
		}

		// Chama a próxima função da cadeia de middleware do Fiber
		return ctx.Next()
	}
}

func CreateUser(c *fiber.Ctx) error {
	// Parse do body da requisição para obter os dados do usuário
	user := new(models.User)
	if err := c.BodyParser(user); err != nil {
		return c.Status(http.StatusBadRequest).JSON(responses.ErrorResponse{
			Status:  "error",
			Message: "Failed to parse request body",
		})
	}

	// Criptografa a senha usando bcrypt
	passwordHash := hashPassword(user.Password)

	user.Password = string(passwordHash)

	// Insere o usuário no banco de dados
	result, err := userCollection.InsertOne(context.Background(), user)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{
			Status:  "error",
			Message: "Falha ao criar o usuário",
		})
	}

	// Retorna a resposta de sucesso com o ID do usuário inserido
	return c.Status(http.StatusCreated).JSON(responses.UserResponse{
		Status:  "success",
		Message: "Usuário criado com sucesso",
		Data: map[string]interface{}{
			"user":   user,
			"userId": result.InsertedID,
		},
	})
}

func Login(c *fiber.Ctx) error {
	user := new(models.User)
	if err := c.BodyParser(user); err != nil {
		log.Println(err)
		return c.Status(http.StatusBadRequest).JSON(responses.UserResponse{
			Status:  "error",
			Message: "Cannot parse request body",
		})
	}
	result := userCollection.FindOne(context.Background(), bson.M{"username": user.Username})
	if result.Err() != nil {
		if result.Err() == mongo.ErrNoDocuments {
			return c.Status(http.StatusUnauthorized).JSON(responses.UserResponse{
				Status:  "error",
				Message: "Senha incorreta",
			})
		}
		log.Println(result.Err())
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{
			Status:  "error",
			Message: "Não foi possível encontrar o usuário",
		})
	}

	// compara as senhas
	dbUser := new(models.User)
	err := result.Decode(dbUser)
	if err != nil {
		log.Println(err)
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{
			Status:  "error",
			Message: "Cannot decode user",
		})
	}
	if !checkPasswordHash(user.Password, dbUser.Password) {
		return c.Status(http.StatusUnauthorized).JSON(responses.UserResponse{
			Status:  "error",
			Message: "Invalid credentials",
		})
	}

	// gera o token JWT e retorna na resposta
	token, err := generateToken(*dbUser)
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.UserResponse{
			Status:  "error",
			Message: "Cannot generate token",
		})
	}

	return c.JSON(responses.UserResponse{
		Status:  "success",
		Message: "User logged in successfully",
		Data: map[string]interface{}{
			"user":  dbUser,
			"token": token,
		},
	})
}

func Logout(c *fiber.Ctx) error {
	// Obter o valor do campo "jwt" do corpo da requisição
	type JWTToken struct {
		Token string `json:"jwt"`
	}
	var jwtToken JWTToken
	if err := c.BodyParser(&jwtToken); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorResponse{
			Status:  "error",
			Message: "Erro ao fazer o parse do corpo",
			Error:   err.Error(),
		})
	}

	// Verificar se o token JWT foi informado
	if jwtToken.Token == "" {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorResponse{
			Status:  "error",
			Message: "JWT token não informado",
		})
	}

	// Parse do token JWT
	token, err := jwt.Parse(jwtToken.Token, func(token *jwt.Token) (interface{}, error) {
		// Chave de assinatura (mesma chave usada na criação do token)
		return []byte("87h3unfs78fh2ojfdsyf8iwunfuiniu@$fnsifffg2"), nil
	})
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorResponse{
			Status:  "error",
			Message: "Erro ao fazer o parse do token",
			Error:   err.Error(),
		})
	}

	// Verificar se o token JWT é válido
	if token.Valid {
		// Configurar a expiração do token para o passado, invalidando-o
		claims := token.Claims.(jwt.MapClaims)
		claims["exp"] = time.Now().Unix() - 1
		token.Claims = claims

		// Assinar o token novamente com a nova expiração
		newToken, err := token.SignedString([]byte("87h3unfs78fh2ojfdsyf8iwunfuiniu@$fnsifffg2"))
		if err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(responses.ErrorResponse{
				Status:  "error",
				Message: "Falha ao entrar",
				Error:   err.Error(),
			})
		}

		// Limpar o cookie "jwt" no cliente
		c.ClearCookie("jwt")

		return c.JSON(responses.UserResponse{
			Status:  "success",
			Message: "Usuário deslogado com sucesso",
			Data: map[string]interface{}{
				"token": newToken,
			},
		})
	}

	return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorResponse{
		Status:  "error",
		Message: "Token inválido",
	})
}

// CheckJWT é uma função para verificar um token JWT
func CheckJWT(c *fiber.Ctx) error {
	// Recupere o token do corpo da requisição JSON
	type jwtBody struct {
		JWT string `json:"jwt"`
	}
	var body jwtBody
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(responses.ErrorResponse{
			Status:  "error",
			Message: "Invalid request body",
			Error:   err.Error(),
		})
	}

	// Verifique o token JWT
	token, err := jwt.Parse(body.JWT, func(token *jwt.Token) (interface{}, error) {

		return []byte("87h3unfs78fh2ojfdsyf8iwunfuiniu@$fnsifffg2"), nil
	})

	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorResponse{
			Status:  "error",
			Message: "Token inválido",
			Error:   err.Error(),
		})
	}

	if !token.Valid {
		return c.Status(fiber.StatusUnauthorized).JSON(responses.ErrorResponse{
			Status:  "error",
			Message: "Invalid token",
			Error:   "Token inválido",
		})
	}

	// Token é válido, você pode continuar com a lógica de negócio
	return c.JSON(fiber.Map{
		"status":  "success",
		"message": "Token válido",
	})
}

func GetAllUsers(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()


	var users []models.User
	results, err := userCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{
			Status:  "error",
			Message: "Erro ao buscar usuários",
			Error:   err.Error(),
		})
	}
	defer results.Close(ctx)

	for results.Next(ctx) {
		var user models.User
		if err := results.Decode(&user); err != nil {
			return c.Status(http.StatusInternalServerError).JSON(responses.ErrorResponse{
				Status:  "error",
				Message: "Erro ao fazer parse dos usuárioss",
				Error:   err.Error(),
			})
		}
		users = append(users, user)
	}

	return c.Status(http.StatusOK).JSON(responses.UserResponse{
		Status:  "success",
		Message: "Sucesso",
		Data: map[string]interface{}{
			"users": users,
		},
	})
}
