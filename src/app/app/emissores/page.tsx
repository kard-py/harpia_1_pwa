"use client";

import React, { useState } from "react";
import add from "../../../../public/imgs/add.png";
import printer from "../../../../public/imgs/printer.png";
import Actions from "@/components/actions";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Page() {
  const path: string = usePathname();
  const title: string = path.substring(5);
  const { register, handleSubmit } = useForm();
  const [tipoPessoa, setTipoPessoa] = useState<string>("0");
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <main className="p-5 w-full h-full bg-zinc-100">
      <h1 className="text-2xl font-semibold">
        {title[0].toUpperCase() + title.substring(1)}
      </h1>


      <Actions.root>
        <Link href={"/app/new?type=emissores"}>
          <Actions.action>
            <Actions.icon src={add} alt="Add" />
            <Actions.label>Novo</Actions.label>
          </Actions.action>
        </Link>

        <Actions.action>
          <Actions.icon src={printer} alt="Printer" />
          <Actions.label>Imprimir</Actions.label>
        </Actions.action>
      </Actions.root>

      <Table.root>
        <Table.head>
          <Table.headCol className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-gray-500 uppercase tracking-wider w-fit">
            Código
          </Table.headCol>
          <Table.headCol className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-gray-500 uppercase tracking-wider w-1/5">
            Data de Cadastro
          </Table.headCol>
          <Table.headCol className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-gray-500 uppercase tracking-wider w-4/5">
            Nome
          </Table.headCol>
          <Table.headCol className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-gray-500 uppercase tracking-wider w-4/5">
            Ações
          </Table.headCol>
        </Table.head>
        <Table.body>
          <Table.line>
            <Table.col>1</Table.col>
            <Table.col>15/08/2023</Table.col>
            <Table.col>Regina Clara Tânia Oliveira</Table.col>
            <Table.col>
              <Link href={"/app/new?type=emissores&edit=true&id=1"}>

                <Button>Editar</Button>
              </Link>
            </Table.col>
          </Table.line>
        </Table.body>
      </Table.root>
    </main>
  );
}
