package models

type Pesagem struct {
	Id               int    `bson:"_id,omitempty"`
	DataRegistro     string `json:"dataDeRegistro,omitempty" validate:"required"`
	TipoPlaca        string `json:"tipoPlaca,omitempty" validate:"required"`
	Placa            string `json:"placa,omitempty" validate:"required"`
	TransportadoraId int    `json:"transportadoraId,omitempty"`
	VeiculoId        int    `json:"veiculoId,omitempty"`
	ProdutoId        int    `json:"produtoId,omitempty"`
	PesoEntrada      int    `json:"pesoEntrada,omitempty"`
	PesoSaida        int    `json:"pesoSaida,omitempty"`
}
