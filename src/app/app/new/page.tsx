"use client";
import React, { useEffect, useState } from "react";
import save from "../../../../public/imgs/save.png";
import x from "../../../../public/imgs/x.png";
import Actions from "@/components/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
interface Props {
    params: {}
    searchParams: {
        type: string
    }
}
export default function Page(props: Props) {
    if (!props.searchParams.type) {
        redirect("/app")
    }
    const { register, handleSubmit, setValue } = useForm();
    const [tipoPessoa, setTipoPessoa] = useState<string>("0");
    const onSubmit = (data: any) => {
        console.log(data);
    };

    const cep = (e: any) => {
        const cep = e.currentTarget.value;
        const cepReg = /\d{5}-\d{3}/
        if (!cepReg.test(cep)) {
            return null
        }

        fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`, { method: "get" }).then((res) => {
            res.json().then(json => {
                setValue("uf", json.state)
                setValue("logaduro", json.street)
                setValue("cidade", json.city)
                setValue("bairro", json.neighborhood)
            })
        }).catch(
            err => {
                console.log(err);
            }
        )
    };
    const placa = (e: any, tipo: string) => {
        const placa = e.currentTarget.value;
        if (tipo == "antiga") {
            var placaReg = /^[A-Z]{1,3}-?\d{2}-?\d{2}$/
        } else {
            var placaReg = /^[A-Z]{3}\d{4}$/
        }

        if (!placaReg.test(placa)) {
            return null
        }


        console.log("Placa Digitada");


    }

    useEffect(() => {
        if (props.searchParams.type == "emissores" || props.searchParams.type == "operadores" || props.searchParams.type == "produtos" || props.searchParams.type == "relatorios" || props.searchParams.type == "transportadoras" || props.searchParams.type == "veiculos") {
            // @ts-ignore
            document.getElementById('datePicker').valueAsDate = new Date();
        }
    })
    return (
        <main className="p-5 w-full h-screen bg-zinc-100 overflow-y-scroll">
            <h1 className="text-2xl font-semibold">Novo</h1>
            <form
                className="w-full flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
            >

                <Actions.root>
                    <Actions.action type="submit">
                        <Actions.icon src={save} alt="Save" />
                        <Actions.label>Salvar</Actions.label>
                    </Actions.action>

                    <Link href={"/app"}>
                        <Actions.action>
                            <Actions.icon src={x} alt="X" />
                            <Actions.label>Cancelar</Actions.label>
                        </Actions.action>
                    </Link>
                </Actions.root>

                {props.searchParams.type == "emissores" &&
                    <>
                        <div className="w-full flex gap-5">

                            <div className="h-fit gap-3 space-y-2">
                                <Label>Data de Cadastro</Label>
                                <Input
                                    id="datePicker"
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
                                <div className="rounded-md border bg-white border-input h-10 px-3">
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
                        <div className="flex w-full gap-5">

                            <div className="w-fit gap-2">
                                <Label>CEP</Label>
                                <InputMask
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    mask={"99999-999"}
                                    placeholder="00000-000"
                                    {...register("cep", {
                                        required: true,
                                        onChange: (e) => {
                                            cep(e);
                                        },
                                    })} />

                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <Label>Endreço</Label>
                                <Input {...register("logaduro", { required: true })} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Numero</Label>
                                <Input type="text" {...register("numero", { required: true })} />
                            </div>
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
                                <InputMask
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    mask={"(99) 9 9999-9999"}
                                    placeholder="(00) 0 0000-0000"
                                    {...register("telefone1", { required: true })}
                                />
                            </div>
                            <div className="w-full">
                                <Label>Telefone 2</Label>
                                <InputMask
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    mask={"(99) 9 9999-9999"}
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
                            <Textarea {...register("observacao", { required: false })} rows={10} className="resize-none" />
                        </div>
                    </>
                }

                {props.searchParams.type == "operadores" &&
                    <>
                        <div className="w-full flex gap-5">

                            <div className="h-fit gap-3 space-y-2">
                                <Label>Data de Cadastro</Label>
                                <Input
                                    id="datePicker"
                                    type="date"
                                    {...register("dataDeRegisto", { required: true })}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <Label>Nome</Label>
                            <Input {...register("nome", { required: true })} />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <Label>Senha</Label>
                            <Input type="password" {...register("pass", { required: true })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>CPF</Label>
                            <InputMask
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                mask={"999.999.999-99"}
                                placeholder="000.000.000-00"
                                {...register("doc", { required: true })}
                            />
                        </div>
                        <div className="w-full flex gap-5 h-fit mt-4">
                            <div className="w-full">
                                <Label>Telefone 1</Label>
                                <InputMask
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    mask={"(99) 9 9999-9999"}
                                    placeholder="(00) 0 0000-0000"
                                    {...register("telefone1", { required: true })}
                                />
                            </div>
                            <div className="w-full">
                                <Label>Telefone 2</Label>
                                <InputMask
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    mask={"(99) 9 9999-9999"}
                                    placeholder="(00) 0 0000-0000"
                                    {...register("telefone2", { required: false })}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <Label>Email</Label>
                            <Input {...register("email", { required: false })} />
                        </div>

                    </>
                }

                {props.searchParams.type == "produtos" &&
                    <>
                    </>
                }
                {props.searchParams.type == "relatorios" &&
                    <>
                    </>
                }
                {props.searchParams.type == "transportadoras" &&
                    <>
                        <div className="w-full flex gap-5">

                            <div className="h-fit gap-3 space-y-2">
                                <Label>Data de Cadastro</Label>
                                <Input
                                    id="datePicker"
                                    type="date"
                                    {...register("dataDeRegisto", { required: true })}
                                />
                            </div>
                        </div>
                        <div className="flex w-full gap-5">

                            <div className="flex flex-col w-full gap-2">
                                <Label>Nome</Label>
                                <Input {...register("nome", { required: true })} />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <Label>Nome Fantasia</Label>
                                <Input {...register("nomeFantasia", { required: true })} />
                            </div>
                        </div>
                        <div className="flex gap-5 ">
                            <div>
                                <Label>Tipo de Pessoa</Label>
                                <div className="rounded-md border  border-input h-10 px-3 bg-white">
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
                        <div className="flex w-full gap-5">

                            <div className="w-fit gap-2">
                                <Label>CEP</Label>
                                <InputMask
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    mask={"99999-999"}
                                    placeholder="00000-000"
                                    {...register("cep", {
                                        required: true,
                                        onChange: (e) => {
                                            cep(e);
                                        },
                                    })} />

                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <Label>Endreço</Label>
                                <Input {...register("logaduro", { required: true })} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Numero</Label>
                                <Input type="text" {...register("numero", { required: true })} />
                            </div>
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
                                <InputMask
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    mask={"(99) 9 9999-9999"}
                                    placeholder="(00) 0 0000-0000"
                                    {...register("telefone1", { required: true })}
                                />
                            </div>
                            <div className="w-full">
                                <Label>Telefone 2</Label>
                                <InputMask
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    mask={"(99) 9 9999-9999"}
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
                            <Textarea {...register("observacao", { required: false })} rows={10} className="resize-none" />
                        </div>
                    </>
                }
                {props.searchParams.type == "veiculos" &&
                    <>
                        <div className="w-full flex gap-5">

                            <div className="h-fit gap-3 space-y-2">
                                <Label>Data de Cadastro</Label>
                                <Input
                                    id="datePicker"
                                    type="date"
                                    {...register("dataDeRegisto", { required: true })}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-fit gap-2">
                            <Label>Placa</Label>
                            <Input {...register("placa", { required: true })} />
                        </div>
                        <div className="flex flex-col w-80 gap-2">
                            <Label>Motorista</Label>
                            <Input {...register("motorista", { required: true })} />
                        </div>
                        <div className="flex gap-5">
                            <div>
                                <Label>Transportadora</Label>
                                <div className="rounded-md border bg-white border-input h-10 px-3">
                                    <select
                                        {...register("transportadora", { required: true })}
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
                    </>
                }



            </form>

        </main>
    );
}
