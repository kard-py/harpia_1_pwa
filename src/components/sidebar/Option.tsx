"use client";
import Link, { LinkProps } from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface Props extends LinkProps {
  children?: React.ReactNode
  href: string | object
}

const Option = ({ children, href, ...res }: Props) => {
  var path: string = usePathname()





  return (
    <Link href={href} tabIndex={-1} className={`w-full h-10 flex gap-3 flex-row px-3 items-center ${path == href ? "opacity-100" : "opacity-70"} hover:opacity-90 hover:scale-105 select-none cursor-pointer bg-black`} {...res}>
      {children}
    </Link>
  );
};

export default Option;