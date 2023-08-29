package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Produto struct {
	Id           primitive.ObjectID `bson:"_id,omitempty"`
	DataRegistro string             `json:"dataDeRegistro,omitempty" validate:"required"`
	Nome         string             `json:"nome,omitempty" validate:"required"`
}
