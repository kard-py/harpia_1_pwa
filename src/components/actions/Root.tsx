import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Root = ({ children, ...res }: Props) => {
  return (
    <div className="flex gap-5 mt-5" {...res}>
      {children}
    </div>
  );
};

export default Root;
