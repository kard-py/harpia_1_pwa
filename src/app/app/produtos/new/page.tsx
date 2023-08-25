"use client";
import React, { useEffect, useState } from "react";
import save from "../../../../../public/imgs/save.png";
import x from "../../../../../public/imgs/x.png";
import trash from "../../../../../public/imgs/trash.png";
import Actions from "@/components/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { handelDelete, handleEdit, handleSave } from "./Handle";
import swal from "sweetalert2";
import api from "@/services/api";

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
    // @ts-ignore
    document.getElementById("datePicker").valueAsDate = new Date();
  };
  const handleValues = async () => {
    const res = await api.get(`/produtos/${props.searchParams.edit}`);
    console.log(res.data.data);
    // @ts-ignore
    document.getElementsByName("dataDeRegisto")[0].value =
      res.data.data.dataDeRegistro;
    // @ts-ignore
    document.getElementsByName("nome")[0].value = res.data.data.nome;
  };
  useEffect(() => {
    if (props.searchParams.edit != undefined) {
      handleValues();
    } else {
      // @ts-ignore
      document.getElementById("datePicker").valueAsDate = new Date();
    }
  }, []);
  if (props.searchParams.edit != undefined) {
    return (
      <main className="p-5 w-full h-screen bg-zinc-100 overflow-y-scroll">
        <h1 className="text-2xl font-semibold">Novo</h1>
        <form
          className="w-full flex flex-col gap-3"
          action={async (data: FormData) => {
            const msg = await handleEdit(
              props.searchParams.edit as string,
              data
            );
            if (msg != "Erro na Api") {
              swal.fire("Boa!", "Deu tudo certo!", "success");
              router.back();
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
            <Actions.action
              onClick={async (e) => {
                e.preventDefault();
                const msg = await handelDelete(
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
        <div className="hidden">
          <button type="reset" id="clear">
            Limpar Campos
          </button>
        </div>
      </form>
    </main>
  );
}
