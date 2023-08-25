"use server";
import api from "@/services/api";

interface veiculo {
  dataDeRegistro: string;
  tipoPlaca: string;
  placa: string;
  transportadoraId: string;
  nomeMotorista: string;
}

const handleSave = async (data: FormData) => {
  const body: veiculo = {
    dataDeRegistro: data.get("dataDeRegisto") as string,
    nomeMotorista: data.get("motorista") as string,
    tipoPlaca: data.get("tipoPlaca") as string,
    placa: data.get("placa") as string,
    transportadoraId: data.get("transportadora") as string,
  };

  const r: any = await api.post("/veiculos", body);

  if (r.status == 201) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

export { handleSave };
