import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const Root = ({children, ...res}: Props) => {
  return (
    <div {...res}>
    {children}
    </div>
  );
};

export default Root;