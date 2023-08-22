"use server";
import axios from "axios";

interface veiculo {
  dataDeRegistro: string;
  tipoPlaca: string;
  placa: string;
  transportadoraId: string;
  nomeMotorista: string;
}

const handleSave = async (data: FormData) => {
  const url =
    "https://3010-kardpy-harpia1-o4fe3yy6xa3.ws-us104.gitpod.io/veiculos";

  const body: veiculo = {
    dataDeRegistro: data.get("dataDeRegisto") as string,
    nomeMotorista: data.get("motorista") as string,
    tipoPlaca: data.get("tipoPlaca") as string,
    placa: data.get("placa") as string,
    transportadoraId: data.get("transportadora") as string,
  };

  console.log(JSON.stringify(body));
  
  const r: any = await axios
    .post(url, body)
    .catch((err) => {
      console.log(err);
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
