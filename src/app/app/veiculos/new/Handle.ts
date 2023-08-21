"use server";
import axios from "axios";

interface veiculo {
  dataDeRegistro: string;
  tipoPlaca: string;
  transportadoraId: string;
  nomeMotorista: string;
}

const handleSave = async (data: FormData) => {
  const url = "http://localhost:3010/veiculos";

  const body: veiculo = {
    dataDeRegistro: data.get("dataDeRegisto") as string,
    nomeMotorista: data.get("motorista") as string,
    tipoPlaca: data.get("tipoPlaca") as string,
    transportadoraId: data.get("transportadora") as string,
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
