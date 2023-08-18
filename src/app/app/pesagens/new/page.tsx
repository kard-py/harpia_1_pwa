"use client";
import React, { useEffect, useState } from "react";
import save from "../../../../../public/imgs/save.png";
import manual from "../../../../../public/imgs/manual.png";
import x from "../../../../../public/imgs/x.png";
import Actions from "@/components/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
interface Props {
  params: {};
  searchParams: {
    edit: string;
    id: string;
  };
}
export default function Page(props: Props) {

  const [tipoPlaca, setTipoPlaca] = useState<string>("0");
  const [isPesoManual, setIsPesoManual] = useState<boolean>(false);
  const [isEditavel, setIsEditavel] = useState<boolean>(false);
  const [transportadora, setTrasportadora] = useState<string>("0");
  const { register, handleSubmit, setValue, reset } = useForm();

  // PESO
  const [pesoAtual, setPesoAtual] = useState<number>(0)


  const onSubmit = (data: any) => {
    reset(["placa"])
    console.log(data);
  };

  useEffect(() => {
    setPesoAtual(value => parseInt((Math.random() * 80000).toFixed(0)))
  }, [])


  const placaChange = (e: any) => {
    const value: string = e.currentTarget.value
    if (value.substring(7) == "_") { setIsEditavel(false); return null; }
    setIsEditavel(true)
    setValue("pesoEntrada", pesoAtual)

    const idInterval = setInterval(() => { setPesoAtual(value => value + 5) }, 100)
    setTimeout(() => {
      clearInterval(idInterval)
    }, 15000);

  }
  const registrarSaida = (e: any) => {
    e.preventDefault();

    setValue("pesoSaida", pesoAtual)
  }

  return (
    <main className="p-5 w-full h-screen bg-zinc-100 overflow-y-scroll" id="main">
      <h1 className="text-2xl font-semibold">Nova Pesagem</h1>
      <form
        className="w-full flex flex-col gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Actions.root>
          <Actions.action type="submit">
            <Actions.icon src={save} alt="Save" />
            <Actions.label>Salvar</Actions.label>
          </Actions.action>

          <Link href={"/app/pesagens"}>
            <Actions.action>
              <Actions.icon src={x} alt="X" />
              <Actions.label>Cancelar</Actions.label>
            </Actions.action>
          </Link>
          <Actions.action
            onClick={(e) => {
              e.preventDefault()
              setIsPesoManual(!isPesoManual);
            }}
          >
            <Actions.icon src={manual} alt="Manual" />
            <Actions.label>Manual</Actions.label>
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
                      {...register("tipoPlaca", { required: true })}
                      className="w-full h-full outline-none"
                      value={tipoPlaca}
                      onChange={(e) => {
                        setValue("placa", "");
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
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        mask="aaa-9999"
                        alwaysShowMask={false}
                        placeholder="ABC-1234"
                        {...register("placa", {
                          required: true,
                          onChange: placaChange
                        })}
                      />
                    </>
                  ) : (
                    <>
                      <Label>Placa Marcosul</Label>
                      <InputMask
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        mask={"aaa-9a99"}
                        placeholder="ABC-1D23"
                        {...register("placa", {
                          required: true,
                          onChange: placaChange
                        })}
                      />
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label>Nome do Motorista</Label>
                <Input
                  className="w-96"
                  disabled={!isEditavel}
                  {...register("motorista", {
                    required: true,
                  })}
                />
              </div>
              <div className="mb-2">
                <Label>Transportadora</Label>
                <div className="rounded-md border bg-white border-input w-96 h-10 px-3">
                  <select
                    {...register("transportadora", { required: true })}
                    disabled={!isEditavel}
                    className="w-full h-full outline-none"
                    value={transportadora}
                    onChange={(e) => {
                      setTrasportadora(e.currentTarget.value);
                    }}
                  >
                    <option value={0}>Vale Delgado sla das quantas</option>
                    <option value={1}>Agroboi</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <Button onClick={registrarSaida}>Registrar Saida</Button>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex flex-col w-fit h-full">
              <div className="flex flex-col gap-2 mb-5">
                <Label className="text-xl font-semibold">Peso Atual em KG</Label>
                <Input disabled value={`${pesoAtual}KG`} />
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <Label className="text-xl font-semibold">Entrada</Label>
                <div className="flex items-center rounded-md border border-input">
                  <Input {...register("pesoEntrada", { required: true })} disabled={!isPesoManual} />
                  <div className="px-5 flex rounded-md rounded-l-none border border-input items-center justify-center text-center h-full">
                    <Label>KG</Label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-5">
                <Label className="text-xl font-semibold">Saida</Label>
                <div className="flex items-center rounded-md border border-input">
                  <Input className="rounded-r-none" {...register("pesoSaida", { required: false })} disabled={!isPesoManual} />
                  <div className="px-5 flex rounded-md rounded-l-none border border-input items-center justify-center text-center h-full">
                    <Label>KG</Label>
                  </div>
                </div>

              </div>
            </div>
          </Card>
        </div>
      </form>
    </main>
  );
}
