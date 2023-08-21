"use client";
import React, { useEffect, useState } from "react";
import save from "../../../../public/imgs/save.png";
import x from "../../../../public/imgs/x.png";
import Actions from "@/components/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputMask from "react-input-mask";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [uf, setUf] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [logadouro, setLogadouro] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [site, setSite] = useState<string>("");
  const [doc, setDoc] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [placa, setPlaca] = useState<string>("");
  const [tipoPlaca, setTipoPlaca] = useState<string>("");
  const [dataRegistro, setDataRegistro] = useState<string>("");
  const [tipoPessoa, setTipoPessoa] = useState<string>("0");
  return (
    <main className="p-5 w-full h-screen bg-zinc-100 overflow-y-scroll">
      <h1 className="text-2xl font-semibold">Novo</h1>
      <form className="w-full flex flex-col gap-3">
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
        <div className="flex flex-col w-fit gap-2">
          <Label>Placa</Label>
          <Input name={"placa"} />
        </div>
        <div className="flex flex-col w-80 gap-2">
          <Label>Motorista</Label>
          <Input name={"motorista"} />
        </div>
        <div className="flex gap-5">
          <div>
            <Label>Transportadora</Label>
            <div className="rounded-md border bg-white border-input h-10 px-3">
              <select
                name={"transportadora"}
                className="w-fit h-full outline-none"
                value={tipoPessoa}
                onChange={(e) => {
                  setTipoPessoa(e.currentTarget.value);
                }}
              >
                <option value={0}>Vale do Rio Verde</option>
                <option value={1}>Agro Vaje</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
