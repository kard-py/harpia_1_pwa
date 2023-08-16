"use client";
import React, { useState } from "react";
import add from "../../../public/imgs/add.png";
import printer from "../../../public/imgs/printer.png";
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
export default function Page() {
  const { register, handleSubmit } = useForm();
  const [tipoPessoa, setTipoPessoa] = useState<string>("0");
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <main className="p-5 w-full h-full bg-zinc-100">
      <h1 className="text-2xl font-semibold">Home</h1>

      <Actions.root>
        <Actions.action>
          <Actions.icon src={add} alt="Add" />
          <Actions.label>Novo</Actions.label>
        </Actions.action>

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
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Editar</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Editar</DialogTitle>
                  </DialogHeader>
                  <form
                    className="w-full flex flex-col gap-3"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="w-full flex gap-5">
                      <div className="w-full gap-3">
                        <Label>Codigo</Label>
                        <Input
                          type="number"
                          {...register("cod", { required: true })}
                        />
                      </div>
                      <div className="gap-3">
                        <Label>Data de Cadastro</Label>
                        <Input
                          type="date"
                          {...register("dataDeRegisto", { required: true })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <Label>Nome</Label>
                      <Input {...register("nome", { required: true })} />
                    </div>
                    <div className="flex gap-5">
                      <div>
                        <Label>Tipo de Pessoa</Label>
                        <div className="rounded-md border border-input h-10 px-3">
                          <select
                            {...register("tipoPessoa", { required: true })}
                            className="w-fit h-full outline-none"
                            value={tipoPessoa}
                            onChange={(e) => {
                              setTipoPessoa(e.currentTarget.value);
                            }}
                          >
                            <option value={0}>Pessoa Fisica</option>
                            <option value={1}>Pessoa Juridica</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col w-full gap-2">
                        {tipoPessoa == "0" ? (
                          <>
                            <Label>CPF</Label>
                            <InputMask
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              mask={"999.999.999-99"}
                              placeholder="000.000.000-00"
                              {...register("doc", { required: true })}
                            />
                          </>
                        ) : (
                          <>
                            <Label>CNPJ</Label>
                            <InputMask
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              mask={"99.999.999/9999-99"}
                              placeholder="00.000.000/0000-00"
                              {...register("doc", { required: true })}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <Label>Endreço</Label>
                      <Input {...register("logaduro", { required: true })} />
                    </div>
                    <div className="flex w-full h-10 gap-3">
                      <div className="w-full gap-2">
                        <Label>Bairro</Label>
                        <Input {...register("bairro", { required: true })} />
                      </div>
                      <div className="w-2/3 gap-2">
                        <Label>Cidade</Label>
                        <Input {...register("cidade", { required: true })} />
                      </div>
                      <div className="gap-2">
                        <Label>UF</Label>
                        <Input {...register("uf", { required: true })} />
                      </div>
                    </div>
                    <div className="w-full flex gap-5 h-fit mt-4">
                      <div className="w-full">
                        <Label>Telefone 1</Label>
                        <Input
                          placeholder="(00) 0 0000-0000"
                          {...register("telefone1", { required: true })}
                        />
                      </div>
                      <div className="w-full">
                        <Label>Telefone 2</Label>
                        <Input
                          placeholder="(00) 0 0000-0000"
                          {...register("telefone2", { required: false })}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                      <Label>Email</Label>
                      <Input {...register("email", { required: false })} />
                    </div>
                    <div className="flex flex-col w-full gap-2">
                      <Label>Observações</Label>
                      <Input {...register("observacao", { required: false })} />
                    </div>

                    <DialogFooter className="flex w-full items-start mt-5">
                      <Button type="submit">Salvar</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </Table.col>
          </Table.line>
        </Table.body>
      </Table.root>
    </main>
  );
}
