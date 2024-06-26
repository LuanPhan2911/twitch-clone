import { ReactNode, Suspense } from "react";
import NavBar from "./_components/navbar/navbar";
import { Sidebar } from "./_components/sidebar/sidebar";
import { CommonSidebarSkeleton } from "@/components/sidebar";
import { Container } from "@/components/sidebar/container";

const BrowseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<CommonSidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </>
  );
};

export default BrowseLayout;
