import React from "react";
import LandingPageNavBar from "./_components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col py-10 px-10 xl:px-0 container">
      <LandingPageNavBar />
      {children}
    </div>
  );
};

export default Layout;
