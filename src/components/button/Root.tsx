import React from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Root = ({children, ...res}: Props) => {
  return (
    <button {...res}>
    {children}
    </button>
  );
};

export default Root;