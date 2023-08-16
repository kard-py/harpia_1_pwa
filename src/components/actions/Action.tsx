import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined
}

const Action = ({ children, type, ...res }: Props) => {
  return (
    <button type={type} className="flex flex-col items-center" {...res}>
      {children}
    </button>
  );
};

export default Action;
