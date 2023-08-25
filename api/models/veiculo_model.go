package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Veiculo struct {
	Id                primitive.ObjectID `bson:"_id,omitempty"`
	DataRegistro     string             `json:"dataDeRegistro,omitempty" validate:"required"`
	TipoPlaca        string             `json:"tipoPlaca,omitempty" validate:"required"`
	Placa            string             `json:"placa,omitempty" validate:"required"`
	TransportadoraId primitive.ObjectID               `json:"transportadoraId,omitempty"`
	NomeMotorista    string             `json:"nomeMotorista,omitempty"`
}
