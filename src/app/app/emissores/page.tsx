import React from "react";
import add from "../../../../public/imgs/add.png";
import printer from "../../../../public/imgs/printer.png";
import Actions from "@/components/actions";
import Table from "@/components/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default async function Page() {
  const data = await fetch("http://localhost:3010/emissores", {
    method: "get",
    cache: "no-cache",
  })
    .catch((err) => null)
    .then((res) => res);
  if (data != null) {
    var emissores = await data.json();
  } else {
    var emissores = null;
  }

  return (
    <main className="p-5 w-full h-full bg-zinc-100">
      <h1 className="text-2xl font-semibold">Emissores</h1>
      <Actions.root>
        <Link href={"/app/emissores/new"}>
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
          {/* {emissores != null &&
            emissores.data.data.map((emissor: any, i: number) => (
              <Table.line key={i}>
                <Table.col>{i + 1}</Table.col>
                <Table.col>{emissor.dataDeRegistro}</Table.col>
                <Table.col>{emissor.nome}</Table.col>
                <Table.col>
                  <Link href={`/app/emissores/new/${emissor.Id}`}>
                    <Button>Editar</Button>
                  </Link>
                </Table.col>
              </Table.line>
            ))} */}
        </Table.body>
      </Table.root>
    </main>
  );
}
