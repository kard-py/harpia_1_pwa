import Image from "next/image";
import exemplo1 from "../../../../public/imgs/exemplo1.png";
import exemplo2 from "../../../../public/imgs/exemplo2.png";

export default function Page() {
    return (
        <main className="p-5 w-full min-h-screen h-full bg-zinc-100 ">
            <h1 className="text-2xl font-semibold">Guia Rapido</h1>
            <div className="flex flex-col p-5 w-full h-full mb-20">
                <h3 className="font-semibold mb-5">
                    Este é um guia rápido de como operar o sistema.</h3>
                <p>Nosso sistema é simples, prático e rápido de ser operado. Nós visamos a produtividade e interatividade. Mas afinal, como operar o sistema?</p>
                <p>Para tornar a operação do sistema rápida e fácil, optamos por dois tipos de telas.</p>
                <h3 className="font-semibold my-5">1. Tela de Visualização</h3>
                <div className="flex p-5 gap-5 items-center">
                    <div>
                        <Image src={exemplo1} alt="Exemplo 1" />
                    </div>
                    <p>{"Esta tela é destinada exclusivamente à visualização dos registros, composta pelo nome da tela, por exemplo: 'Emissores', e algumas ações como imprimir e adicionar um novo registro. Além disso, apresenta uma tabela com todos os registros daquele mesmo tipo."}</p>
                </div>
                <h3 className="font-semibold my-5">2. Tela de Adição</h3>
                <div className="flex p-5 gap-5 items-center">
                    <div>
                        <Image src={exemplo2} alt="Exemplo 2" />
                    </div>
                    <p>{"Esta tela é destinada exclusivamente à adição dos registros, composta pelo nome da tela: 'Novo', e algumas ações como salvar e cancelar. Além disso, apresenta um formulario com todos os campos para o registros daquele mesmo tipo."}</p>
                </div>

            </div>

        </main>
    );
}
