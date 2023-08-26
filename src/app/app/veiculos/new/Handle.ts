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
const handleEdit = async (id: string, data: FormData) => {
  const body: veiculo = {
    dataDeRegistro: data.get("dataDeRegisto") as string,
    nomeMotorista: data.get("motorista") as string,
    tipoPlaca: data.get("tipoPlaca") as string,
    placa: data.get("placa") as string,
    transportadoraId: data.get("transportadora") as string,
  };

  const r: any = await api.put(`/veiculos/${id}`, body);

  if (r.status == 200) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};
const handleDelete = async (id: string) => {
  const r: any = await api.delete(`/veiculos/${id}`);

  if (r.status == 200) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

export { handleSave, handleDelete, handleEdit };
