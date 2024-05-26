import { ReactNode } from "react";
import NavBar from "./_components/navbars/nav-bar";
import Sidebar from "./_components/sidebar/sidebar";
import Container from "./_components/sidebar/container";

const BrowseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="flex h-full pt-20">
        <Sidebar />

        <Container>{children}</Container>
      </div>
    </>
  );
};

export default BrowseLayout;
