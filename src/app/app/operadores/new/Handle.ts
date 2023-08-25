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

  if (r.status == 201) {
    return "Criado Com Sucesso";
  } else {
    return "Erro na Api";
  }
};

export { handleSave };
