"use client";
import React, { useEffect, useState } from "react";
import save from "../../../../../public/imgs/save.png";
import x from "../../../../../public/imgs/x.png";
import trash from "../../../../../public/imgs/trash.png";
import Actions from "@/components/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { handleSave, handleDelete, handleEdit } from "./Handle";
import swal from "sweetalert2";

interface PageProps {
  params: any;
  searchParams: {
    edit?: string;
  };
}

export default function Page(props: PageProps) {
  const router = useRouter();
  const clear = () => {
    document.getElementById("clear")?.click();
  };

  if(props.searchParams.edit != undefined){
    return(
      <main className="p-5 w-full h-screen bg-zinc-100 overflow-y-scroll">
      <h1 className="text-2xl font-semibold">Novo</h1>
      <form
        className="w-full flex flex-col gap-3"
      >

        <Actions.root>
            <Actions.action
              onClick={(e) => {
                e.preventDefault();
                router.back();
              }}
            >
              <Actions.icon src={x} alt="X" />
              <Actions.label>Cancelar</Actions.label>
            </Actions.action>
            <Actions.action
              onClick={async (e) => {
                e.preventDefault();
                const msg = await handleDelete(
                  props.searchParams.edit as string
                );
                if (msg != "Erro na Api") {
                  swal.fire("Boa!", "Deu tudo certo!", "success");
                  clear();
                } else {
                  swal.fire("Oh no...", "Algo deu errado!", "error");
                }
                router.back();
              }}
            >
              <Actions.icon src={trash} alt="Trash" />
              <Actions.label>Deletar</Actions.label>
            </Actions.action>
          </Actions.root>
      </form>
    </main>
    )
  }



  return (
    <main className="p-5 w-full h-screen bg-zinc-100 overflow-y-scroll">
      <h1 className="text-2xl font-semibold">Novo</h1>
      <form
        className="w-full flex flex-col gap-3"
        action={async (data: FormData) => {
          const msg = await handleSave(data);

          if (msg != "Erro na Api") {
            swal.fire("Boa!", "Deu tudo certo!", "success");
            clear();
          } else {
            swal.fire("Oh no...", "Algo deu errado!", "error");
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
