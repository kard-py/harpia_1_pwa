import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Action = ({ children, ...res }: Props) => {
  return (
    <button className="flex flex-col items-center" {...res}>
      {children}
    </button>
  );
};

export default Action;
