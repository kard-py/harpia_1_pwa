package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Transportadora struct {
	Id                primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	DataRegistro      string             `json:"dataDeRegistro,omitempty" validate:"required"`
	Nome              string             `json:"nome,omitempty" validate:"required"`
	NomeFantasia      string             `json:"nomeFantasia,omitempty" validate:"required"`
	TipoPessoa        string             `json:"tipoPessoa,omitempty" validate:"required"`
	Doc               string             `json:"doc,omitempty" validate:"required"`
	InscricaoEstadual string             `json:"inscricaoEstadual,omitempty"`
	Cep               string             `json:"cep,omitempty" validate:"required"`
	Uf                string             `json:"uf,omitempty" validade:"required"`
	Cidade            string             `json:"cidade,omitempty" validate:"required"`
	Bairro            string             `json:"bairro,omitempty" validade:"required"`
	Logradouro        string             `json:"logradouro,omitempty" validade:"required"`
	Numero            string             `json:"numero,omitempty" validade:"required"`
	TelUm             string             `json:"telefone1,omitempty" validade:"required"`
	TelDois           string             `json:"telefone2,omitempty" validade:"required"`
	Email             string             `json:"email,omitempty" validade:"required"`
	Observacao        string             `json:"observacao,omitempty"`
}
