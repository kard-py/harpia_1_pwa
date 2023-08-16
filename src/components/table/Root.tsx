import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Root = ({ children, ...res }: Props) => {
  return (
    <div className="flex flex-col flex-1 w-full bg-slate-700 p-5 rounded-xl h-5/6 mt-5 overflow-hidden">
      <div className="overflow-y-scroll w-full h-full rounded-lg">
        <table className="min-w-full border rounded-lg overflow-hidden">
          {children}
        </table>
      </div>
    </div>
  );
};

export default Root;
