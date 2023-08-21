import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import box from "../../../public/imgs/box.png";
import truck from "../../../public/imgs/truck.png";
import scales from "../../../public/imgs/scales.png";

export default function Page() {
  return (
    <main className="p-5 w-full min-h-screen h-full">
      <h1 className="text-2xl font-semibold">Home</h1>
      <div className="grid grid-cols-3 gap-5 py-5">
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
      <div className="grid grid-cols-3 gap-5 py-5">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ações Rapidas</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </main>
  );
}
