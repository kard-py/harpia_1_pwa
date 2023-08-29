package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID       primitive.ObjectID `bson:"_id,omitempty" `
	DataRegistro      string             `json:"dataDeRegistro,omitempty" validate:"required"`
	Username string             `bson:"username,omitempty" validate:"required"`
	Password string             `bson:"password,omitempty" validate:"required"`
}
