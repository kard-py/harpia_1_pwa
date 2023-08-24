"use server";

import api from "@/services/api";

interface LoginProps {
  username: string;
  password: string;
}
const handleLogin = async (data: FormData) => {
  const body: LoginProps = {
    username: data.get("username") as string,
    password: data.get("password") as string,
  };
  const resData = await api.post("/login", body);
  console.log(resData);
  
};

export { handleLogin };
