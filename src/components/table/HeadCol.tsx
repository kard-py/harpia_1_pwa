import React from "react";

interface Props extends React.HTMLAttributes<HTMLTableCellElement> {
  children?: React.ReactNode;
}

const HeadCol = ({ children, ...res }: Props) => {
  return (
    <th
      className="px-6 py-3 text-left text-xs whitespace-nowrap font-medium text-gray-500 uppercase tracking-wider w-fit"
      {...res}
    >
      {children}
    </th>
  );
};

export default HeadCol;
