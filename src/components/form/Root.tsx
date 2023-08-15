import React from "react";

interface Props extends React.HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode
}

const Root = ({children, ...res}: Props) => {
  return (
    <form {...res}>
    {children}
    </form>
  );
};

export default Root;