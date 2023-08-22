"use client";
import React, { useEffect, useState } from "react";
import save from "../../../../../public/imgs/save.png";
import x from "../../../../../public/imgs/x.png";
import Actions from "@/components/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { handleSave } from "./Handle";
import swal from "sweetalert2";

export default function Page() {
  const router = useRouter();

  const clear = () => {
    document.getElementById("clear")?.click();
    // @ts-ignore
    document.getElementById("datePicker").valueAsDate = new Date();
  };
  return (
    <main className="p-5 w-full h-screen bg-zinc-100 overflow-y-scroll">
      <h1 className="text-2xl font-semibold">Novo</h1>
      <form
        className="w-full flex flex-col gap-3"
        action={async (data: FormData) => {
          const msg = await handleSave(data);
          if (msg == "Criado Com Sucesso") {
            swal.fire(
              "Usuario Crido Com Sucesso",
              "Estamos Limpando os Campos",
              "success"
            );
            clear();
          } else {
            swal.fire("Erro", "Verifique as Informações", "error");
          }
        }}
      >
        <div className="hidden">
          <button type="reset" id="clear">
            Limpar Campos
          </button>
        </div>
        <Actions.root>
          <Actions.action type="submit">
            <Actions.icon src={save} alt="Save" />
            <Actions.label>Salvar</Actions.label>
          </Actions.action>

          <Actions.action
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            <Actions.icon src={x} alt="X" />
            <Actions.label>Cancelar</Actions.label>
          </Actions.action>
        </Actions.root>

        <div className="flex flex-col w-full gap-2">
          <Label>Usuario</Label>
          <Input name={"user"} />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>Senha</Label>
          <Input type="password" name={"pass"} />
        </div>
      </form>
    </main>
  );
}
