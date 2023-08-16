import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Col = ({ children, ...res }: Props) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap" {...res}>
      {children}
    </td>
  );
};

export default Col;
