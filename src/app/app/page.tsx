
import Image from 'next/image'
import React from 'react'
import add from "../../../public/imgs/add.png"
import printer from "../../../public/imgs/printer.png"
import { usePathname } from 'next/navigation'
export default function Page() {
  return (
    <main className="p-5 w-full h-full bg-zinc-100">
      <h1 className='text-2xl font-semibold'>Home</h1>


      <div className='flex gap-5 mt-5'>
        <button className='flex flex-col items-center'>
          <div className='w-10'>
            <Image src={add} alt='Add' />
          </div>
          <span className='text-md font-semibold'>
            Novo
          </span>
        </button>
        <button className='flex flex-col items-center'>
          <div className='w-10'>
            <Image src={printer} alt='Printer' />
          </div>
          <span className='text-md font-semibold'>
            Imprimir
          </span>
        </button>
      </div>


      <div className='flex flex-col flex-1 w-full bg-slate-700 p-5 rounded-xl text-white h-5/6 mt-5 overflow-hidden'>
        <div className='overflow-y-scroll w-full h-full'>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
          <p>TABELA</p>
        </div>


      </div>
    </main>
  )
}
