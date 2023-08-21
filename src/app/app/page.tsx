import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import box from "../../../public/imgs/box.png";
import truck from "../../../public/imgs/truck.png";
import person from "../../../public/imgs/person.png";
import menu from "../../../public/imgs/menu.png";
import scales from "../../../public/imgs/scales.png";
import { Overview } from "@/components/chart";
import Actions from "@/components/actions";


export default function Page() {


  return (
    <main className="p-5 w-full min-h-screen h-full">
      <div className="flex items-center gap-5">
        <div className="w-10 md:hidden">
          <Image src={menu} alt="Menu" />
        </div>
        <h1 className="text-2xl font-semibold">Home</h1>
      </div>
      <div className="my-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 py-5">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-semibold">Produtos</CardTitle>
              <div className="w-10">
                <Image src={box} alt="" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-semibold">
                Transportadoras
              </CardTitle>
              <div className="w-10">
                <Image src={truck} alt="" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+320</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-md font-semibold">Pesagens</CardTitle>
              <div className="w-10">
                <Image src={scales} alt="" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
            </CardContent>
          </Card>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 py-5">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Ações Rapidas</CardTitle>
            </CardHeader>
            <CardContent>
              <Actions.root className="grid xl:grid-cols-4 grid-cols-1 gap-5">
                <Actions.action>
                  <Actions.icon src={scales} alt="Scales" />
                  <Actions.label>Nova Pesagem</Actions.label>
                </Actions.action>

                <Actions.action>
                  <Actions.icon src={person} alt="Person" />
                  <Actions.label>Novo Operador</Actions.label>
                </Actions.action>

                <Actions.action>
                  <Actions.icon src={truck} alt="Truck" />
                  <Actions.label>Nova Transportadora</Actions.label>
                </Actions.action>

                <Actions.action>
                  <Actions.icon src={person} alt="Person" />
                  <Actions.label>Novo Motorista</Actions.label>
                </Actions.action>
              </Actions.root>
            </CardContent>

          </Card>
        </div>
      </div>
    </main >
  );
}
