"use server";
import api from "@/services/api";

interface produto {
  dataDeRegistro?: string;
  nome?: string;
}

const handleSave = async (data: FormData) => {
  const body: produto = {
    dataDeRegistro: data.get("dataDeRegisto") as string,
    nome: data.get("nome") as string,
  };

  const r: any = await api.post("/produtos", body);

  if (r.status == 201) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};
const handleEdit = async (id: string, data: FormData) => {
  const body: produto = {
    dataDeRegistro: data.get("dataDeRegisto") as string,
    nome: data.get("nome") as string,
  };

  const r: any = await api.put(`/produtos/${id}`, body);

  if (r.status == 200) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};
const handelDelete = async (id: string) => {
  const r: any = await api.delete(`/produtos/${id}`);

  if (r.status == 200) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

export { handleSave, handleEdit, handelDelete };
