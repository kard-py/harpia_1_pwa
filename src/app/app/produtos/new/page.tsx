"use client";
import React, { useEffect, useState } from "react";
import save from "../../../../../public/imgs/save.png";
import x from "../../../../../public/imgs/x.png";
import Actions from "@/components/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { handleSave } from "./Handle";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    // @ts-ignore
    document.getElementById("datePicker").valueAsDate = new Date();
  })

  const clear = () => {
    document.getElementById("clear")?.click();
    // @ts-ignore
    document.getElementById("datePicker").valueAsDate = new Date();
  };
  return (
    <main className="p-5 w-full h-screen bg-zinc-100 overflow-y-scroll">
      <h1 className="text-2xl font-semibold">Novo</h1>
      <form className="w-full flex flex-col gap-3" action={async (data: FormData) => {
        const msg = await handleSave(data);
        alert(msg);
        if (msg != "Erro na Api") {
          clear();
        }
      }}>
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
        <div className="w-full flex gap-5">
          <div className="h-fit gap-3 space-y-2">
            <Label>Data de Cadastro</Label>
            <Input id="datePicker" type="date" name={"dataDeRegisto"} />
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>Nome</Label>
          <Input type="text" name={"nome"} />
        </div>
      </form>
    </main>
  );
}
