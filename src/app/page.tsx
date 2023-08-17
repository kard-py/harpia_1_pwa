'use client';
import { useEffect } from "react"
import { redirect } from "next/navigation"
import Image from "next/image"
import loading from "../../public/imgs/loading.png"
export default function Home() {
  useEffect(()=>{
    redirect("/app")
  })
  return <div className="flex w-full h-full items-center justify-center">
    <div className="w-10">
      <Image src={loading} alt="Loader" className="animate-spin" />
    </div>
  </div>
}
