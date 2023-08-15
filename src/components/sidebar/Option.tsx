import Link, { LinkProps } from "next/link";
import React from "react";

interface Props extends LinkProps {
  children?: React.ReactNode
  href: string | object
}

const Option = ({ children, href, ...res }: Props) => {
  return (
    <Link href={"/app" + href} className="w-full h-10 flex gap-3 flex-row px-3 items-center hover:opacity-40 select-none cursor-pointer bg-black" {...res}>
      {children}
    </Link>
  );
};

export default Option;