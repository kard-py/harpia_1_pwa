"use server";
import api from "@/services/api";
interface User {
  username: string;
  password: string;
}

const handleSave = async (data: FormData) => {
  const body: User = {
    username: data.get("usuario") as string,
    password: data.get("pass") as string,
  };
  const r: any = await api.post("/users", body);
  console.log(r);

  if (r.status == "success") {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

const handleEdit = async (id: string, data: FormData) => {
  const body: User = {
    username: data.get("usuario") as string,
    password: data.get("pass") as string,
  };
  const r: any = await api.put("/users", body);
  if (r.status == 200) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

const handleDelete = async (id: string) => {
  const r: any = await api.delete(`/users/${id}`);

  if (r.status == 200) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

export { handleSave, handleDelete, handleEdit };
