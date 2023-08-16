"use client";
import Image from "next/image";
import arrowLeft from "../../../public/imgs/arrowLeft.png";
import Actions from "@/components/actions";
import printer from "../../../public/imgs/printer.png";


export default function Page() {

  const generatePDF = async () => {
    console.log('PDF Generated...');
  };

  return (
    <main className="p-5 w-full min-h-screen h-full bg-zinc-100 ">
      <h1 className="text-2xl font-semibold">Home</h1>
      <div className="flex items-center gap-5 w-full h-full justify-center">
        <div className="w-10">
          <Image src={arrowLeft} alt="Arrow" />
        </div>
        <h3 className="font-semibold">Selecione Uma Opção ao lado para iniciar</h3>
      </div>



    </main>
  );
}
