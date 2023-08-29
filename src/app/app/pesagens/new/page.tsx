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

import swal from "sweetalert2";

import api from "@/services/api";
import Loading from "@/app/loading";
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
  const [isPesoManual, setIsPesoManual] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [transportadora, setTrasportadora] = useState<string>("default");
  const [produto, setProduto] = useState<string>("default");
  const [pesoAtual, setPesoAtual] = useState<number>(0);
  const [pesoSaida, setPesoSaida] = useState<number>(0);
  const [pesoEntrada, setPesoEntrada] = useState<number>(0);
  const [enviado, setEnviado] = useState<boolean>(false);

  const [transportadoras, setTrasportadoras] = useState<any>([]);
  const [produtos, setProdutos] = useState<any>([]);
  const [veiculos, setVeiculos] = useState<any>([]);

  const handleProdutos = async () => {
    api
      .get("/produtos")
      .then((res) => {
        setProdutos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleTrasportadoras = async () => {
    api
      .get("/transportadoras")
      .then((res) => {
        setTrasportadoras(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleVeiculos = async () => {
    api
      .get("/veiculos")
      .then((res) => {
        setVeiculos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const placaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const input = e.currentTarget;
    setPlaca((a) => input.value);
    consultaPlaca(input.value);
    setPesoEntrada((value) => pesoAtual);
  };

  const registrarSaida = (e: any) => {
    e.preventDefault();
    setPesoSaida((value) => pesoAtual);
  };

  const consultaPlaca = async (placa: string) => {
    api
      .get(`/veiculos/${placa}`)
      .then((res) => {
        setMotorista(res.data.data.nomeMotorista);
        setTrasportadora(res.data.data.transportadoraId);
      })
      .catch((err) => console.log(err));
  };

  const clear = () => {
    document.getElementById("clear")?.click();
    setTrasportadora("");
    setProduto("");
    setMotorista("");
    setPlaca("default");
    setPesoEntrada(0);
    setPesoSaida(0);
    setNf("");
  };

  useEffect(() => {
    handleProdutos();
    handleTrasportadoras();
    handleVeiculos();
    setTimeout(() => {
      if (pesoAtual < 80000) {
        setPesoAtual((value) => value + 100);
      } else {
        setPesoAtual((value) => 100);
      }
    }, 500);
  }, [pesoAtual]);

  return (
    <main
      className="p-5 w-full h-screen bg-zinc-100 overflow-y-scroll"
      id="main"
    >
      <h1 className="text-2xl font-semibold">Nova Pesagem</h1>
      <form
        id="form"
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
        </Actions.root>

        <div className="hidden">
          <button type="reset" id="clear">
            Limpar Campos
          </button>
        </div>
        <div className="flex flex-row w-full gap-10 h-full">
          <Card className="p-5">
            <div className="flex flex-col w-fit gap-3 h-full">
              <div className="flex flex-col justify-between gap-4 w-96">
                <Label>Placa</Label>
                <div className="rounded-md border bg-white border-input w-96 h-10 px-3">
                  <select
                    name="placa"
                    tabIndex={3}
                    required
                    className="w-full h-full outline-none"
                    defaultValue={"default"}
                    onChange={(e) => {
                      placaChange(e);
                    }}
                  >
                    <option value={"default"}>Selecione uma Placa</option>
                    {veiculos.map((veiculo: any, i: number) => (
                      <option value={veiculo.id}>{veiculo.placa}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Nome do Motorista</Label>
                <Input
                  disabled
                  tabIndex={2}
                  required
                  className="w-96"
                  name="motorista"
                  value={motorista}
                  onChange={(v: any) => setMotorista(v.currentTarget?.value)}
                />
                <input type="hidden" name="motorista" value={motorista} />
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
                    {transportadoras.map((transportadora: any, i: number) => (
                      <option key={i} value={transportadora.id}>
                        {transportadora.nome}
                      </option>
                    ))}
                  </select>
                  <input
                    type="hidden"
                    name="transportadora"
                    value={transportadora}
                  />
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

                    {produtos.map((produto: any, i: number) => (
                      <option key={i} value={produto.Id}>
                        {produto.nome}
                      </option>
                    ))}
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
