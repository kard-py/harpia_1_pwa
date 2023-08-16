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
export default function Page() {
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

    useEffect(() => {
        // @ts-ignore
        document.getElementById('datePicker').valueAsDate = new Date();
    })
    return (
        <main className="p-5 w-full h-full bg-zinc-100">
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

                <div className="w-full flex gap-5">
                    <div className="w-full h-fit gap-3 space-y-2">
                        <Label >Codigo</Label>
                        <Input
                            type="number"
                            {...register("cod", { required: true })}
                        />
                    </div>
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
                <div className="flex w-full gap-5">

                    <div className="flex flex-col w-full gap-2">
                        <Label>Endreço</Label>
                        <Input {...register("logaduro", { required: true })} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Numero da Casa</Label>
                        <Input type="number" {...register("numero", { required: true })} />
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
                    <div className="w-2/3 gap-2">
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


            </form>

        </main>
    );
}
