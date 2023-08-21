"use server";

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
  observacao: string;
}
const handleSave = async (data: FormData) => {
  const url = "http://localhost:3010/emissores";
  console.log(data);
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
