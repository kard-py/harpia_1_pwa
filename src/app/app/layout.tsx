import SideBar from "@/components/sidebar";
import { ReactNode } from "react";
import person from "../../../public/imgs/person.png";
import truck from "../../../public/imgs/truck.png";
import box from "../../../public/imgs/box.png";
import printer from "../../../public/imgs/printer.png";
import car from "../../../public/imgs/car.png";
import home from "../../../public/imgs/home.png";
import scales from "../../../public/imgs/scales.png";
interface Props {
  children: ReactNode;
}

const Root = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex flex-row">
      <SideBar.root className="md:w-64 w-0 h-screen overflow-y-scroll gap-5 bg-black text-white flex flex-col items-center pt-5">
        <SideBar.option href={"/"}>
          <SideBar.icon src={home} alt="Home" />
          <SideBar.label className="text-white">Home</SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/emissores"}>
          <SideBar.icon src={person} alt="Person" />
          <SideBar.label className="text-white">Emissores</SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/transportadoras"}>
          <SideBar.icon src={truck} alt="Truck" />
          <SideBar.label className="text-white">Transportadoras</SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/veiculos"}>
          <SideBar.icon src={car} alt="Car" />
          <SideBar.label className="text-white">Veículos</SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/operadores"}>
          <SideBar.icon src={person} alt="Person" />
          <SideBar.label className="text-white">Operadores</SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/produtos"}>
          <SideBar.icon src={box} alt="Box" />
          <SideBar.label className="text-white">Produtos</SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/pesagens"}>
          <SideBar.icon src={scales} alt="Scales" />
          <SideBar.label className="text-white">Pesagens</SideBar.label>
        </SideBar.option>
        <SideBar.option href={"/relatorio"}>
          <SideBar.icon src={printer} alt="Printer" />
          <SideBar.label className="text-white">Relatório</SideBar.label>
        </SideBar.option>
      </SideBar.root>
      <div className="overflow-y-scroll w-full h-screen">
        {children}
      </div>
    </div>
  );
};
export default Root;
