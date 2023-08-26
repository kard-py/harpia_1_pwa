"use client";
import React, { useEffect, useState } from "react";
import save from "../../../../../public/imgs/save.png";
import x from "../../../../../public/imgs/x.png";
import trash from "../../../../../public/imgs/trash.png";
import Actions from "@/components/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputMask from "react-input-mask";
import { useRouter } from "next/navigation";
import { handleDelete, handleEdit, handleSave } from "./Handle";
import { Card, CardContent } from "@/components/ui/card";
import swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";
import Loading from "@/app/loading";

interface PageProps {
  params: any;
  searchParams: {
    edit?: string;
  };
}

export default function Page(props: PageProps) {
  const router = useRouter();
  const [tipoPessoa, setTipoPessoa] = useState<string>("0");
  const [transportadoras, setTransportadoras] = useState<any>(null);
  const [tipoPlaca, setTipoPlaca] = useState<string>("0");
  const [data, setData] = useState(new Date());
  const [dataAtual, setDataAtual] = useState<string>(
    `${data.getFullYear()}-${(data.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${data.getDate().toString().padStart(2, "0")}`
  );

  const clear = () => {
    document.getElementById("clear")?.click();
    if (document.getElementById("datePicker") != null) {
      // @ts-ignore
      document.getElementById("datePicker").valueAsDate = new Date();
    }
  };

  const handleValues = async () => {
    const res = await api.get(`/veiculos/${props.searchParams.edit}`);
    console.log(res.data.data);
    // @ts-ignore
    document.getElementsByName("dataDeRegisto")[0].value =
      res.data.data.dataDeRegistro;
    // @ts-ignore
    document.getElementsByName("tipoPlaca")[0].value = res.data.data.tipoPlaca;
    // @ts-ignore
    document.getElementsByName("placa")[0].value = res.data.data.placa;
    // @ts-ignore
    document.getElementsByName("motorista")[0].value =
      res.data.data.nomeMotorista;
    // @ts-ignore
    document.getElementsByName("transportadora")[0].value =
      res.data.data.transportadora;
  };
  const handleTransportadoras = async () => {
    const r = await api.get("/transportadoras");
    setTransportadoras(r);
  };

  useEffect(() => {
    handleTransportadoras();
    if (props.searchParams.edit != undefined) {
      handleValues();
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

          <Card className="w-fit p-5">
            <CardContent className="w-fit gap-5 flex flex-col">
              <div className="w-full flex gap-5">
                <div className="h-fit gap-3 space-y-2">
                  <Label>Data de Cadastro</Label>
                  <Input
                    id="datePicker"
                    type="date"
                    name={"dataDeRegisto"}
                    value={dataAtual}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between gap-4 w-96">
                <div className="flex flex-col w-fit justify-center-center gap-2">
                  <Label>Tipo da Placa</Label>
                  <div className="rounded-md border bg-white border-input h-10 px-4">
                    <select
                      name="tipoPlaca"
                      className="w-full h-full outline-none"
                      value={tipoPlaca}
                      required
                      onChange={(e) => {
                        setTipoPlaca(e.currentTarget.value);
                      }}
                    >
                      <option value={0}>Placa Antiga</option>
                      <option value={1}>Placa Marcosul</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col w-fit justify-center-center gap-2">
                  {tipoPlaca == "0" ? (
                    <>
                      <Label>Placa Antiga</Label>
                      <InputMask
                        required
                        autoFocus
                        tabIndex={1}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        mask="aaa-9999"
                        alwaysShowMask={false}
                        placeholder="ABC-1234"
                        name="placa"
                      />
                    </>
                  ) : (
                    <>
                      <Label>Placa Marcosul</Label>
                      <InputMask
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        autoFocus
                        mask={"aaa-9a99"}
                        placeholder="ABC-1D23"
                        name="placa"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-80 gap-2">
                <Label>Motorista</Label>
                <Input name={"motorista"} required />
              </div>
              <div className="flex gap-5">
                <div>
                  <Label>Transportadora</Label>
                  <div className="rounded-md border bg-white border-input h-10 px-3">
                    <select
                      name={"transportadora"}
                      className="w-fit h-full outline-none"
                    >
                      {transportadoras != null &&
                        transportadoras.data.data.map(
                          (trans: any, i: number) => (
                            <option key={i} value={trans.id}>
                              {trans.nome}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="hidden">
            <button type="reset" id="clear">
              Limpar Campos
            </button>
          </div>
        </form>
      </main>
    );
  } else {
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

          <Card className="w-fit p-5">
            <CardContent className="w-fit gap-5 flex flex-col">
              <div className="w-full flex gap-5">
                <div className="h-fit gap-3 space-y-2">
                  <Label>Data de Cadastro</Label>
                  <Input
                    id="datePicker"
                    type="date"
                    name={"dataDeRegisto"}
                    value={dataAtual}
                  />
                </div>
              </div>
              <div className="flex flex-row justify-between gap-4 w-96">
                <div className="flex flex-col w-fit justify-center-center gap-2">
                  <Label>Tipo da Placa</Label>
                  <div className="rounded-md border bg-white border-input h-10 px-4">
                    <select
                      name="tipoPlaca"
                      className="w-full h-full outline-none"
                      value={tipoPlaca}
                      required
                      onChange={(e) => {
                        setTipoPlaca(e.currentTarget.value);
                      }}
                    >
                      <option value={0}>Placa Antiga</option>
                      <option value={1}>Placa Marcosul</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col w-fit justify-center-center gap-2">
                  {tipoPlaca == "0" ? (
                    <>
                      <Label>Placa Antiga</Label>
                      <InputMask
                        required
                        autoFocus
                        tabIndex={1}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        mask="aaa-9999"
                        alwaysShowMask={false}
                        placeholder="ABC-1234"
                        name="placa"
                      />
                    </>
                  ) : (
                    <>
                      <Label>Placa Marcosul</Label>
                      <InputMask
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        autoFocus
                        mask={"aaa-9a99"}
                        placeholder="ABC-1D23"
                        name="placa"
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-80 gap-2">
                <Label>Motorista</Label>
                <Input name={"motorista"} required />
              </div>
              <div className="flex gap-5">
                <div>
                  <Label>Transportadora</Label>
                  <div className="rounded-md border bg-white border-input h-10 px-3">
                    <select
                      name={"transportadora"}
                      className="w-fit h-full outline-none"
                    >
                      {transportadoras != null &&
                        transportadoras.data.data.map(
                          (trans: any, i: number) => (
                            <option key={i} value={trans.id}>
                              {trans.nome}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="hidden">
            <button type="reset" id="clear">
              Limpar Campos
            </button>
          </div>
        </form>
      </main>
    );
  }
}
