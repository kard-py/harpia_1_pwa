"use client";
import React from "react";
import add from "../../../../public/imgs/add.png";
import printer from "../../../../public/imgs/printer.png";
import Actions from "@/components/actions";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";


import Loading from "@/app/loading";
import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";
export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["emissores"],
    queryFn: async () => {
      return await api.get("/users");
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  console.log(data)
  return (
    <main className="p-5 w-full h-full bg-zinc-100">
      <h1 className="text-2xl font-semibold">Operadores</h1>

      <Actions.root>
        <Link href={"/app/operadores/new"}>
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
          <Table.headCol className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-gray-500 uppercase tracking-wider w-full">
            Nome
          </Table.headCol>
          <Table.headCol className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-gray-500 uppercase tracking-wider w-4/5">
            Ações
          </Table.headCol>
        </Table.head>
        <Table.body>
          {data.data.users != null && data.data.users.map((item: any, i: number) => (
            <Table.line key={i}>
              <Table.col>{i + 1}</Table.col>
              <Table.col>{item.Username}</Table.col>
              <Table.col>
                <Link href={`/app/operadores/new?edit=${item.ID}`}>
                  <Button>Editar</Button>
                </Link>
              </Table.col>
            </Table.line>
          ))}
        </Table.body>
      </Table.root>
    </main>
  );
}
