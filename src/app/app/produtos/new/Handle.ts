"use server";

import axios from "axios";

interface produto {
  dataDeRegistro?: string;
  nome?: string;
}

const handleSave = async (data: FormData) => {
  const url = "http://localhost:3010/veiculos";

  const body: produto = {
    dataDeRegistro: data.get("dataDeRegisto") as string,
    nome: data.get("nome") as string,
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
