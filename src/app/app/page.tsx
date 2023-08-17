"use client";
import Image from "next/image";
import arrowLeft from "../../../public/imgs/arrowLeft.png";
import Actions from "@/components/actions";
import printer from "../../../public/imgs/printer.png";
import { useEffect, useState } from "react";
export default function Page() {

  const ws = () => {
    const ws = new WebSocket("ws://localhost:8080/serial")
    ws.onerror = (e) => {
      console.log("WebSocket Error!");
      console.log(e);
    }
    ws.onopen = (event) => {
      console.log("WebSocket conectado!");
    };

    ws.onmessage = (event) => {
      const data = event.data;
      console.log(data);
    };

    ws.onclose = (event) => {
      console.log("WebSocket desconectado!");
    };
  }

  useEffect(() => {
    // ws()
  }, []);

  return (
    <main className="p-5 w-full min-h-screen h-full bg-zinc-100 ">
      <h1 className="text-2xl font-semibold">Home</h1>
      <div className="flex items-center gap-5 w-full h-full justify-center">
        <div className="w-10">
          <Image src={arrowLeft} alt="Arrow" />
        </div>
        <h3 className="font-semibold">Selecione Uma Opção ao lado para iniciar</h3>
      </div>




      <div>
        Testes WebSocket
      </div>

    </main>
  );
}
