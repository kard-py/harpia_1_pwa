import React from "react";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
}

const Label = ({ children, ...res }: Props) => {
  return (
    <span className="text-md font-semibold" {...res}>
      {children}
    </span>
  );
};

export default Label;
