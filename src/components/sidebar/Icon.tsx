import React from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
interface Props extends React.HTMLAttributes<HTMLDivElement> {
    src: string | StaticImport
    alt: string,

}

const Icon = ({ src, alt, ...res }: Props) => {
    return (
        <div className="w-10">
            <Image src={src} alt={alt} />
        </div>
    );
};

export default Icon;


