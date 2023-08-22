"use server";

import axios from "axios";

interface User {
  username: string;
  password: string;
}
const handleSave = async (data: FormData) => {
  const url = "http://localhost:3010/users";
  const body: User = {
    username: data.get("usuario") as string,
    password: data.get("pass") as string,
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
