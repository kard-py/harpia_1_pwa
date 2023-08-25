"use server";
import api from "@/services/api";

interface transportadora {
  dataDeRegistro: string;
  nome: string;
  nomeFantasia: string;
  tipoPessoa: string;
  doc: string;
  inscricaoEstadual: string;
  cep: string;
  uf: string;
  cidade: string;
  bairro: string;
  logradouro: string;
  numero: string;
  telefone1: string;
  telefone2: string;
  email: string;
  observacao: string;
}

const handleSave = async (data: FormData) => {
  const body: transportadora = {
    dataDeRegistro: data.get("dataDeRegisto") as string,
    nome: data.get("nome") as string,
    nomeFantasia: data.get("nomeFantasia") as string,
    tipoPessoa: data.get("tipoPessoa") as string,
    doc: data.get("doc") as string,
    inscricaoEstadual: data.get("inscricaoEstadual") as string,
    cep: data.get("cep") as string,
    logradouro: data.get("logaduro") as string,
    numero: data.get("numero") as string,
    bairro: data.get("bairro") as string,
    cidade: data.get("cidade") as string,
    uf: data.get("uf") as string,
    telefone1: data.get("telefone1") as string,
    telefone2: data.get("telefone2") as string,
    email: data.get("email") as string,
    observacao: data.get("observacao") as string,
  };
  const r: any = await api.post("/Transportadoras", body);
  console.log(r);

  if (r.status == 201) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};
const handleEdit = async (id: string, data: FormData) => {
  const body: transportadora = {
    dataDeRegistro: data.get("dataDeRegisto") as string,
    nome: data.get("nome") as string,
    nomeFantasia: data.get("nomeFantasia") as string,
    tipoPessoa: data.get("tipoPessoa") as string,
    doc: data.get("doc") as string,
    inscricaoEstadual: data.get("inscricaoEstadual") as string,
    cep: data.get("cep") as string,
    logradouro: data.get("logaduro") as string,
    numero: data.get("numero") as string,
    bairro: data.get("bairro") as string,
    cidade: data.get("cidade") as string,
    uf: data.get("uf") as string,
    telefone1: data.get("telefone1") as string,
    telefone2: data.get("telefone2") as string,
    email: data.get("email") as string,
    observacao: data.get("observacao") as string,
  };

  const r: any = await api.put(`/transportadoras/${id}`, body);

  if (r.status == 200) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};
const handelDelete = async (id: string) => {
  const r: any = await api.delete(`/transportadoras/${id}`);

  if (r.status == 200) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

export { handleSave, handleEdit, handelDelete };
