import React from "react";

interface Props extends React.HTMLAttributes<HTMLTableSectionElement> {
  children?: React.ReactNode;
}

const Head = ({ children, ...res }: Props) => {
  return (
    <thead className="bg-gray-200">
      <tr>{children}</tr>
    </thead>
  );
};

export default Head;
