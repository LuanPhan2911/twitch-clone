import { ReactNode, Suspense } from "react";
import NavBar from "./_components/navbar/nav-bar";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar/sidebar";
import Container from "./_components/sidebar/container";

const BrowseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>

        <Container>{children}</Container>
      </div>
    </>
  );
};

export default BrowseLayout;
