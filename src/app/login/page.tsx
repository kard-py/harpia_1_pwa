import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import persons from "../../../public/imgs/persons.png"

export default function Login() {
  return (
    <main className='p-5 flex flex-col overflow-y-scroll items-center justify-center w-full h-full'>
      <form className='md:w-96 w-full m-2 h-fit p-2 flex flex-col gap-2'>
        <div className='w-full flex'>
          <div className='w-32'>
            <Image src={persons} alt="Usuarios" />
          </div>
          <div className='flex flex-1 w-full items-center px-4'>
            <h1 className='text-3xl font-bold text-slate-800'>Fazenda Nova Morada</h1>
          </div>
        </div>
        <div className='flex flex-col w-full gap-5'>
          <Label>Usuario:</Label>
          <Input />
          <Label>Senha:</Label>
          <Input type='password' />
          <Button>Entrar</Button>
        </div>
      </form>
    </main>
  )
}
