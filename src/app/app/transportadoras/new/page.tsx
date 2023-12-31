"use client";
import React, { useEffect, useState } from "react";
import save from "../../../../../public/imgs/save.png";
import x from "../../../../../public/imgs/x.png";
import trash from "../../../../../public/imgs/trash.png";
import Actions from "@/components/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputMask from "react-input-mask";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { handelDelete, handleEdit, handleSave } from "./Handle";
import swal from "sweetalert2";
import api from "@/services/api";

interface PageProps {
  params: any;
  searchParams: {
    edit?: string;
  };
}

export default function Page(props: PageProps) {
  const router = useRouter();
  const [tipoPessoa, setTipoPessoa] = useState<string>("0");
  const [uf, setUf] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [logadouro, setLogadouro] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const onChangeCep = (e: any) => {
    const cep = e.currentTarget.value;
    const cepReg = /\d{5}-\d{3}/;
    if (!cepReg.test(cep)) {
      return null;
    }

    fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`, { method: "get" })
      .then((res) => {
        res.json().then((json) => {
          // @ts-ignore
          document.getElementsByName("uf")[0].value = json.state;
          // @ts-ignore
          document.getElementsByName("cidade")[0].value = json.city;
          // @ts-ignore
          document.getElementsByName("bairro")[0].value = json.neighborhood;
          // @ts-ignore
          document.getElementsByName("logaduro")[0].value = json.street;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clear = () => {
    document.getElementById("clear")?.click();
    setBairro("");
    setCidade("");
    setLogadouro("");
    setUf("");
    // @ts-ignore
    document.getElementById("datePicker").valueAsDate = new Date();
  };

  const handleValues = async () => {
    const res = await api.get(`/transportadoras/${props.searchParams.edit}`);
    console.log(res.data.data);
    // @ts-ignore
    document.getElementsByName("dataDeRegisto")[0].value =
      res.data.data.dataDeRegistro;
    // @ts-ignore
    document.getElementsByName("nomeFantasia")[0].value =
      res.data.data.nomeFantasia;
    // @ts-ignore
    document.getElementsByName("nome")[0].value = res.data.data.nome;
    // @ts-ignore
    document.getElementsByName("tipoPessoa")[0].value =
      res.data.data.tipoPessoa;
    // @ts-ignore
    document.getElementsByName("doc")[0].value = res.data.data.doc;
    // @ts-ignore
    document.getElementsByName("inscricaoEstadual")[0].value =
      res.data.data.inscricaoEstadual;
    // @ts-ignore
    document.getElementsByName("logaduro")[0].value = res.data.data.logradouro;
    // @ts-ignore
    document.getElementsByName("numero")[0].value = res.data.data.numero;
    // @ts-ignore
    document.getElementsByName("telefone1")[0].value = res.data.data.telefone1;
    // @ts-ignore
    document.getElementsByName("telefone2")[0].value = res.data.data.telefone2;
    // @ts-ignore
    document.getElementsByName("uf")[0].value = res.data.data.uf;
    // @ts-ignore
    document.getElementsByName("cidade")[0].value = res.data.data.cidade;
    // @ts-ignore
    document.getElementsByName("cep")[0].value = res.data.data.cep;
    // @ts-ignore
    document.getElementsByName("bairro")[0].value = res.data.data.bairro;
    // @ts-ignore
    document.getElementsByName("email")[0].value = res.data.data.email;
  };
  useEffect(() => {
    if (props.searchParams.edit != undefined) {
      handleValues();
    } else {
      // @ts-ignore
      document.getElementById("datePicker").valueAsDate = new Date();
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
                const msg = await handelDelete(
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

          <div className="w-full flex gap-5">
            <div className="h-fit gap-3 space-y-2">
              <Label>Data de Cadastro</Label>
              <Input id="datePicker" type="date" name={"dataDeRegisto"} />
            </div>
          </div>
          <div className="flex w-full gap-5">
            <div className="flex flex-col w-full gap-2">
              <Label>Nome</Label>
              <Input name={"nome"} />
            </div>
            <div className="flex flex-col w-full gap-2">
              <Label>Nome Fantasia</Label>
              <Input name={"nomeFantasia"} />
            </div>
          </div>
          <div className="flex gap-5 ">
            <div>
              <Label>Tipo de Pessoa</Label>
              <div className="rounded-md border  border-input h-10 px-3 bg-white">
                <select
                  name={"tipoPessoa"}
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
                    name={"doc"}
                  />
                </>
              ) : (
                <>
                  <Label>CNPJ</Label>
                  <InputMask
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    mask={"99.999.999/9999-99"}
                    placeholder="00.000.000/0000-00"
                    name={"doc"}
                  />
                </>
              )}
            </div>
          </div>
          <div className="w-full">
            <Label>Inscrição Estadual</Label>
            <Input name={"inscricaoEstadual"} />
          </div>
          <div className="flex w-full gap-5">
            <div className="w-fit gap-2">
              <Label>CEP</Label>
              <InputMask
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                mask={"99999-999"}
                placeholder="00000-000"
                name={"cep"}
                onChange={(e) => {
                  onChangeCep(e);
                }}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <Label>Endereço</Label>
              <Input
                name={"logaduro"}
                value={logadouro}
                onChange={(e) => setLogadouro(e.currentTarget.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Número</Label>
              <Input type="text" name={"numero"} />
            </div>
          </div>
          <div className="flex w-full h-10 gap-3">
            <div className="w-full gap-2">
              <Label>Bairro</Label>
              <Input
                name={"bairro"}
                value={bairro}
                onChange={(e) => setBairro(e.currentTarget.value)}
              />
            </div>
            <div className="w-2/3 gap-2">
              <Label>Cidade</Label>
              <Input
                name={"cidade"}
                value={cidade}
                onChange={(e) => setCidade(e.currentTarget.value)}
              />
            </div>
            <div className="gap-2">
              <Label>UF</Label>
              <Input
                name={"uf"}
                value={uf}
                onChange={(e) => setUf(e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="w-full flex gap-5 h-fit mt-4">
            <div className="w-full">
              <Label>Telefone 1</Label>
              <InputMask
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                mask={"(99) 9 9999-9999"}
                placeholder="(00) 0 0000-0000"
                name={"telefone1"}
              />
            </div>
            <div className="w-full">
              <Label>Telefone 2</Label>
              <InputMask
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                mask={"(99) 9 9999-9999"}
                placeholder="(00) 0 0000-0000"
                name={"telefone2"}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>E-mail</Label>
            <Input name={"email"} />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Observações</Label>
            <Textarea name={"observacao"} rows={10} className="resize-none" />
          </div>
          <div className="hidden">
            <button type="reset" id="clear">
              Limpar Campos
            </button>
          </div>
        </form>
      </main>
    );
  }

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

        <div className="w-full flex gap-5">
          <div className="h-fit gap-3 space-y-2">
            <Label>Data de Cadastro</Label>
            <Input id="datePicker" type="date" name={"dataDeRegisto"} />
          </div>
        </div>
        <div className="flex w-full gap-5">
          <div className="flex flex-col w-full gap-2">
            <Label>Nome</Label>
            <Input name={"nome"} />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Nome Fantasia</Label>
            <Input name={"nomeFantasia"} />
          </div>
        </div>
        <div className="flex gap-5 ">
          <div>
            <Label>Tipo de Pessoa</Label>
            <div className="rounded-md border  border-input h-10 px-3 bg-white">
              <select
                name={"tipoPessoa"}
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
                  name={"doc"}
                />
              </>
            ) : (
              <>
                <Label>CNPJ</Label>
                <InputMask
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  mask={"99.999.999/9999-99"}
                  placeholder="00.000.000/0000-00"
                  name={"doc"}
                />
              </>
            )}
          </div>
        </div>
        <div className="w-full">
          <Label>Inscrição Estadual</Label>
          <Input name={"inscricaoEstadual"} />
        </div>
        <div className="flex w-full gap-5">
          <div className="w-fit gap-2">
            <Label>CEP</Label>
            <InputMask
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              mask={"99999-999"}
              placeholder="00000-000"
              name={"cep"}
              onChange={(e) => {
                onChangeCep(e);
              }}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <Label>Endereço</Label>
            <Input
              name={"logaduro"}
              value={logadouro}
              onChange={(e) => setLogadouro(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Número</Label>
            <Input type="text" name={"numero"} />
          </div>
        </div>
        <div className="flex w-full h-10 gap-3">
          <div className="w-full gap-2">
            <Label>Bairro</Label>
            <Input
              name={"bairro"}
              value={bairro}
              onChange={(e) => setBairro(e.currentTarget.value)}
            />
          </div>
          <div className="w-2/3 gap-2">
            <Label>Cidade</Label>
            <Input
              name={"cidade"}
              value={cidade}
              onChange={(e) => setCidade(e.currentTarget.value)}
            />
          </div>
          <div className="gap-2">
            <Label>UF</Label>
            <Input
              name={"uf"}
              value={uf}
              onChange={(e) => setUf(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="w-full flex gap-5 h-fit mt-4">
          <div className="w-full">
            <Label>Telefone 1</Label>
            <InputMask
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              mask={"(99) 9 9999-9999"}
              placeholder="(00) 0 0000-0000"
              name={"telefone1"}
            />
          </div>
          <div className="w-full">
            <Label>Telefone 2</Label>
            <InputMask
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              mask={"(99) 9 9999-9999"}
              placeholder="(00) 0 0000-0000"
              name={"telefone2"}
            />
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>E-mail</Label>
          <Input name={"email"} />
        </div>
        <div className="flex flex-col w-full gap-2">
          <Label>Observações</Label>
          <Textarea name={"observacao"} rows={10} className="resize-none" />
        </div>
        <div className="hidden">
          <button type="reset" id="clear">
            Limpar Campos
          </button>
        </div>
      </form>
    </main>
  );
}
