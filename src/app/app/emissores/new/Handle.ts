"use server";

import api from "@/services/api";
import axios from "axios";

interface Emissor {
  dataDeRegistro: string;
  nome: string;
  tipoPessoa: string;
  doc: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  telefone1: string;
  telefone2: string;
  email: string;
  observacao: string;
}

const handleSave = async (data: FormData) => {
  const body: Emissor = {
    dataDeRegistro: data.get("dataDeRegisto") as string,
    nome: data.get("nome") as string,
    tipoPessoa: data.get("tipoPessoa") as string,
    doc: data.get("doc") as string,
    cep: data.get("cep") as string,
    logradouro: data.get("logadouro") as string,
    numero: data.get("numero") as string,
    bairro: data.get("bairro") as string,
    cidade: data.get("cidade") as string,
    uf: data.get("uf") as string,
    telefone1: data.get("telefone1") as string,
    telefone2: data.get("telefone2") as string,
    email: data.get("email") as string,
    observacao: data.get("observacao") as string,
  };

  const r: any = await api.post("/emissores", body);

  if (r.status == 201) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

const handleEdit = async (id: string, data: FormData) => {
  const body: Emissor = {
    dataDeRegistro: data.get("dataDeRegisto") as string,
    nome: data.get("nome") as string,
    tipoPessoa: data.get("tipoPessoa") as string,
    doc: data.get("doc") as string,
    cep: data.get("cep") as string,
    logradouro: data.get("logadouro") as string,
    numero: data.get("numero") as string,
    bairro: data.get("bairro") as string,
    cidade: data.get("cidade") as string,
    uf: data.get("uf") as string,
    telefone1: data.get("telefone1") as string,
    telefone2: data.get("telefone2") as string,
    email: data.get("email") as string,
    observacao: data.get("observacao") as string,
  };

  const r: any = await api.put(`/emissores/${id}`, body);

  if (r.status == 200) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

const handelDelete = async (id: string) => {
  const r: any = await api.delete(`/emissores/${id}`);

  if (r.status == 200) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

export { handleSave, handleEdit, handelDelete };
