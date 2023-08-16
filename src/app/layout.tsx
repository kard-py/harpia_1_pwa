import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Login from "./login/page";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Balança - Fazenda Nova Morada",
  description: "Harpia LTDA.",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  const isAuth = true;

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        {isAuth ? children : <Login />}
      </body>
    </html>
  );
}
