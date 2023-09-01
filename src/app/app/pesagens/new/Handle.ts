"use server";

import api from "@/services/api";

interface Pesagem {
  dataDeRegistro: string;
  tipoPlaca: string;
  placa: string;
  transportadoraId: string;
  veiculoId: string;
  produtoId: string;
  pesoEntrada: string;
  pesoSaida: string;
}

const handleSave = async (data: FormData) => {
  const dataDeRegisto = data.get("dataDeRegisto");
  const placa: any = data.get("placa");
  const tipoPlaca = data.get("tipoPlaca");
  const motorista = data.get("motorista");
  const produto = data.get("produto");
  const transportadora = data.get("transportadora");
  const pesoSaida: any = data.get("pesoSaida");
  const pesoEntrada: any = data.get("pesoEntrada");
  const nf = data.get("nf");

  const body: Pesagem = {
    dataDeRegistro: dataDeRegisto as string,
    placa: JSON.parse(placa).placa as string,
    tipoPlaca: JSON.parse(placa).tipoPlaca as string,
    veiculoId: JSON.parse(placa).id as string,
    transportadoraId: transportadora as string,
    produtoId: produto as string,
    pesoEntrada: pesoEntrada as string,
    pesoSaida: pesoSaida as string,
  };
  const r: any = await api.post("/pesagens", body);
  if (r.status == 201) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};
const handleEdit = async (id: string, data: FormData) => {
  const dataDeRegisto = data.get("dataDeRegisto");
  const placa: any = data.get("placa");
  const tipoPlaca = data.get("tipoPlaca");
  const motorista = data.get("motorista");
  const produto = data.get("produto");
  const transportadora = data.get("transportadora");
  const pesoSaida: any = data.get("pesoSaida");
  const pesoEntrada: any = data.get("pesoEntrada");

  const body: Pesagem = {
    dataDeRegistro: dataDeRegisto as string,
    placa: JSON.parse(placa).placa as string,
    tipoPlaca: JSON.parse(placa).tipoPlaca as string,
    veiculoId: JSON.parse(placa).id as string,
    transportadoraId: transportadora as string,
    produtoId: produto as string,
    pesoEntrada: pesoEntrada as string,
    pesoSaida: pesoSaida as string,
  };
  const r: any = await api.put("/pesagens/" + id, body);
  if (r.status == 200) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};
const handleDelete = async (id: string) => {
  const r: any = await api.delete("/pesagens/" + id);
  if (r.status == 200) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

export { handleSave, handleEdit, handleDelete };
