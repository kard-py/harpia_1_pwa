"use server";
import axios from "axios";

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
  const url =
    "https://3010-kardpy-harpia1-o4fe3yy6xa3.ws-us104.gitpod.io/transportadoras";
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

  const r: any = await axios
    .post(url, body)
    .catch((err) => {
      return { status: err.status };
    })
    .then((data) => data);

  if (r.status == 201) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

export { handleSave };
