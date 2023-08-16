import React from "react";

interface Props extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

const Line = ({ children, ...res }: Props) => {
  return (
    <tr
      className="select-none cursor-pointer"
      onClick={(e) => {
        const table: any = document.getElementById("tabela");
        for (let i = 0; i < table.childNodes.length; i++) {
          const child = table.childNodes[i];
          child.classList.remove("bg-blue-300");
        }

        e.currentTarget.classList.toggle("bg-blue-300");
      }}
    >
      {children}
    </tr>
  );
};

export default Line;
