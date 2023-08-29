"use server";

import api from "@/services/api";
import { redirect } from "next/navigation";

interface LoginProps {
  username: string;
  password: string;
}
const handleLogin = async (data: FormData) => {
  const body: LoginProps = {
    username: data.get("username") as string,
    password: data.get("password") as string,
  };
  const res = await api
    .post("/login", body)
    .then((res) => res.data)
    .catch((err) => err.data);
  if (res.status === "error") {
    return "erro";
  } else {
    console.log(res);
  }
};

export { handleLogin };
