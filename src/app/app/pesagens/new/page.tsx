"use client";
import React, { useEffect, useRef, useState } from "react";
import save from "../../../../../public/imgs/save.png";
import manual from "../../../../../public/imgs/manual.png";
import x from "../../../../../public/imgs/x.png";
import ok from "../../../../../public/imgs/ok.png";
import Actions from "@/components/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputMask from "react-input-mask";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { handleSave } from "./Handle";
import io from "@/services/io";
interface Props {
  params: {};
  searchParams: {
    edit: string;
    id: string;
  };
}

export default function Page(props: Props) {
  const formRef = useRef(null);
  const [placa, setPlaca] = useState<string>("");
  const [motorista, setMotorista] = useState<string>("");
  const [nf, setNf] = useState<string>("");
  const [tipoPlaca, setTipoPlaca] = useState<string>("0");
  const [isPesoManual, setIsPesoManual] = useState<boolean>(false);
  const [transportadora, setTrasportadora] = useState<string>("default");
  const [produto, setProduto] = useState<string>("default");
  const [pesoAtual, setPesoAtual] = useState<number>(0);
  const [pesoSaida, setPesoSaida] = useState<number>(0);
  const [pesoEntrada, setPesoEntrada] = useState<number>(0);
  const [enviado, setEnviado] = useState<boolean>(false);
  const [produtos, setProdutos] = useState<any>([]);

  useEffect(() => {
    document.getElementById("form")?.addEventListener("keypress", (e) => {
      if (e?.key == "Enter") {
        e.preventDefault();
      }
    });
  });

  const placaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    setPlaca((a) => input.value);
    input.addEventListener("keypress", (key: KeyboardEvent) => {
      if (key.key != "Enter") {
        return null;
      }
      consultaPlaca(input.value);
      setPesoEntrada((value) => pesoAtual);
    });
    input.addEventListener("blur", (e) => {
      if (input.value[input.value.length - 1] != "_") {
        consultaPlaca(input.value);
        setPesoEntrada((value) => pesoAtual);
      }
    });
  };

  const registrarSaida = (e: any) => {
    e.preventDefault();
    setPesoSaida((value) => pesoAtual);
  };

  const consultaPlaca = async (placa: string) => { };
  useEffect(() => {

    const sw = io.init("wss://3010-kardpy-harpia1-o4fe3yy6xa3.ws-us104.gitpod.io/serial")
    io.onOpen(sw, (e) => {

    })
    io.onMessage(sw, (e) => {
      console.log(e);

    })


  }, []);
  return (
    <main
      className="p-5 w-full h-screen bg-zinc-100 overflow-y-scroll"
      id="main"
    >
      <h1 className="text-2xl font-semibold">Nova Pesagem</h1>
      <form
        id="form"
        className="w-full flex flex-col gap-3"
        action={async (forData) => {
          if (pesoEntrada == 0) {
            return null;
          }
          setPesoEntrada(0);
          setPesoSaida(0);
          setTrasportadora("default");
          setMotorista("");
          setNf("");
          setProduto("default");
          setPlaca("");
          setEnviado(true);
          setTimeout(() => {
            setEnviado(false);
          }, 3000);
          // @ts-ignore
          formRef.current.reset();
          await handleSave(forData);
        }}
        ref={formRef}
      >
        <Actions.root>
          <Actions.action type="submit" id="save" tabIndex={4}>
            <Actions.icon src={save} alt="Save" />
            <Actions.label>Salvar</Actions.label>
          </Actions.action>

          <Link tabIndex={5} href={"/app/pesagens"}>
            <Actions.action tabIndex={-1}>
              <Actions.icon src={x} alt="X" />
              <Actions.label>Cancelar</Actions.label>
            </Actions.action>
          </Link>
          <Actions.action
            tabIndex={6}
            type="button"
            onClick={(e) => {
              setIsPesoManual(!isPesoManual);
            }}
          >
            <Actions.icon src={manual} alt="Manual" />
            <Actions.label>Manual</Actions.label>
          </Actions.action>

          <Actions.action
            className={`flex flex-col items-center duration-300 select-none cursor-default ${enviado ? "scale-100" : "scale-0"
              }`}
          >
            <Actions.icon src={ok} alt="Ok" />
            <Actions.label>Sucesso</Actions.label>
          </Actions.action>
        </Actions.root>
        <div className="flex flex-row w-full gap-10 h-full">
          <Card className="p-5">
            <div className="flex flex-col w-fit gap-3 h-full">
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
                        setPlaca("");
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
                        autoFocus
                        tabIndex={1}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        mask="aaa-9999"
                        alwaysShowMask={false}
                        placeholder="ABC-1234"
                        name="placa"
                        value={placa}
                        onChange={(v: any) => {
                          setPlaca((value) => v.currentTarget?.value);
                          placaChange(v);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <Label>Placa Marcosul</Label>
                      <InputMask
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        autoFocus
                        mask={"aaa-9a99"}
                        placeholder="ABC-1D23"
                        name="placa"
                        value={placa}
                        onChange={(v: any) => {
                          setPlaca((value) => v.currentTarget?.value);
                          placaChange(v);
                        }}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Nome do Motorista</Label>
                <Input
                  disabled
                  tabIndex={2}
                  className="w-96"
                  name="motorista"
                  value={motorista}
                  onChange={(v: any) => setMotorista(v.currentTarget?.value)}
                />
              </div>
              <div className="mb-2">
                <Label>Transportadora</Label>
                <div className="rounded-md border bg-white border-input w-96 h-10 px-3">
                  <select
                    name="transportadora"
                    disabled
                    tabIndex={3}
                    required
                    className="w-full h-full outline-none"
                    value={transportadora}
                    defaultValue={"default"}
                    onChange={(e) => {
                      setTrasportadora(e.currentTarget.value);
                    }}
                  >
                    <option value={"default"}>
                      Selecione uma Transportadora
                    </option>
                    <option value={0}>Vale Delgado sla das quantas</option>
                    <option value={1}>Agroboi</option>
                  </select>
                </div>
              </div>
              <div className="mb-2">
                <Label>Produto</Label>
                <div className="rounded-md border bg-white border-input w-96 h-10 px-3">
                  <select
                    name="produto"
                    tabIndex={3}
                    className="w-full h-full outline-none"
                    value={produto}
                    defaultValue={"default"}
                    onChange={(e) => {
                      setProduto(e.currentTarget.value);
                    }}
                  >
                    <option value={"default"}>Selecione um Produto</option>
                    <option value={"milho"}>Milho</option>
                    <option value={"soja"}>Soja</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <Button tabIndex={-1} onClick={registrarSaida}>
                  Registrar Saida
                </Button>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex flex-col w-fit h-full">
              <div className="flex flex-col gap-2 mb-5">
                <Label className="text-xl font-semibold">
                  Peso Atual em KG
                </Label>
                <Input disabled required value={`${pesoAtual}KG`} />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <Label className="text-xl font-semibold">Entrada</Label>
                <div className="flex items-center rounded-md border border-input">
                  <Input
                    name="pesoEntrada"
                    disabled={!isPesoManual}
                    required
                    value={pesoEntrada}
                    onChange={(v: any) =>
                      setPesoEntrada((value) => v.currentTarget?.value)
                    }
                  />
                  {!isPesoManual ? (
                    <input
                      required
                      className="hidden"
                      name="pesoEntrada"
                      value={pesoEntrada}
                    />
                  ) : (
                    <></>
                  )}
                  <div className="px-5 flex rounded-md rounded-l-none border border-input items-center justify-center text-center h-full">
                    <Label>KG</Label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <Label className="text-xl font-semibold">Saida</Label>
                <div className="flex items-center rounded-md border border-input">
                  <Input
                    className="rounded-r-none"
                    required
                    name="pesoSaida"
                    onChange={(v: any) =>
                      setPesoSaida((value) => v.currentTarget?.value)
                    }
                    value={pesoSaida}
                    disabled={!isPesoManual}
                  />
                  {!isPesoManual ? (
                    <input
                      required
                      className="hidden"
                      name="pesoSaida"
                      value={pesoSaida}
                    />
                  ) : (
                    <></>
                  )}
                  <div className="px-5 flex rounded-md rounded-l-none border border-input items-center justify-center text-center h-full">
                    <Label>KG</Label>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex flex-col w-fit h-full">
              <div className="flex flex-col gap-2 mb-5">
                <Label className="text-xl font-semibold">NF</Label>
                <Input
                  name="nf"
                  value={nf}
                  onChange={(e) => setNf(e.currentTarget.value)}
                />
              </div>
            </div>
          </Card>
        </div>
      </form>
    </main>
  );
}
