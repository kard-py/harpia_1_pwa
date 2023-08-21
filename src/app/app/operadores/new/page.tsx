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

  return (
    <main className="p-5 w-full h-screen bg-zinc-100 overflow-y-scroll">
      <h1 className="text-2xl font-semibold">Novo</h1>
      <form className="w-full flex flex-col gap-3" action={handleSave}>
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
