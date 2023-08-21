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

  axios
    .post(url, body)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export { handleSave };
