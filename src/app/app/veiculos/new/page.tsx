"use client";
import React, { useEffect, useState } from "react";
import save from "../../../../../public/imgs/save.png";
import x from "../../../../../public/imgs/x.png";
import Actions from "@/components/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputMask from "react-input-mask";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { handleSave } from "./Handle";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Trash } from "lucide-react";

export default function Page() {
  const router = useRouter();

  const [tipoPessoa, setTipoPessoa] = useState<string>("0");
  const [tipoPlaca, setTipoPlaca] = useState<string>("0");
  const [transportadoras, setTrasportadoras] = useState<any>(null);

  useEffect(() => {
    // @ts-ignore
    document.getElementById("datePicker").valueAsDate = new Date();
    axios.get("http://localhost:3010/trasportadoras").then(res => {
      setTrasportadoras(res.data)
    }).catch(err => {
      console.log(err)
      setTrasportadoras(null)

    })
  })

  const clear = () => {
    document.getElementById("clear")?.click();
    // @ts-ignore
    document.getElementById("datePicker").valueAsDate = new Date();
  };
  return (
    <main className="p-5 w-full h-screen bg-zinc-100 overflow-y-scroll">
      <h1 className="text-2xl font-semibold">Novo</h1>
      <form className="w-full flex flex-col gap-3" action={async (data: FormData) => {
        const msg = await handleSave(data);
        alert(msg);
        if (msg != "Erro na Api") {
          clear();
        }
      }}>
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
                <Input id="datePicker" type="date" name={"dataDeRegisto"} />
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
                    {
                      transportadoras != null && transportadoras.data.map((trans: any, i: number) => (
                        <option value={trans.Id}>{trans.nome}</option>
                      ))
                    }

                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
