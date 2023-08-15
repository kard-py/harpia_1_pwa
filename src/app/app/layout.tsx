import SideBar from "@/components/sidebar";
import { ReactNode } from "react";
import person from "../../../public/imgs/person.png"
import truck from "../../../public/imgs/truck.png"
import box from "../../../public/imgs/box.png"
import printer from "../../../public/imgs/printer.png"
import car from "../../../public/imgs/car.png"
interface Props {
  children: ReactNode
}

const Root = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex flex-row">
      <SideBar.root className="w-64 h-full gap-5 bg-black text-white flex flex-col items-center pt-14">

        <SideBar.option href={"/emissores"}>
          <SideBar.icon src={person} alt="Person" />
          <SideBar.label className="text-white">
            Emissores
          </SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/transportadoras"}>
          <SideBar.icon src={truck} alt="Truck" />
          <SideBar.label className="text-white">
            Transportadoras
          </SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/veiculos"}>
          <SideBar.icon src={car} alt="Car" />
          <SideBar.label className="text-white">
            Veículos
          </SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/operadores"}>
          <SideBar.icon src={person} alt="Person" />
          <SideBar.label className="text-white">
            Operadores
          </SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/produtos"}>
          <SideBar.icon src={box} alt="Box" />
          <SideBar.label className="text-white">
            Produtos
          </SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/passagens"}>
          <SideBar.icon src={truck} alt="Truck" />
          <SideBar.label className="text-white">
            Pesagens
          </SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/relatorio"}>
          <SideBar.icon src={printer} alt="Printer" />
          <SideBar.label className="text-white">
            Relatório
          </SideBar.label>
        </SideBar.option>
      </SideBar.root>
      {children}
    </div>
  )
}
export default Root;