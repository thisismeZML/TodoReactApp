import React from "react";

const MainHeader = ({ children }) => {
  return (
    <h1 className=' className=" col-span-12 font-custom text-[4.5rem] tracking-wide font-[800] opacity-15 -translate-y-9 '>
      {children}
    </h1>
  );
};

export default MainHeader;
