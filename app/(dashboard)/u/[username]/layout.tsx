import { getSelfByUsername } from "@/lib/auth-services";
import { redirect } from "next/navigation";
import { NavBar } from "./(home)/_components/navbar";
import { Sidebar } from "./(home)/_components/sidebar";

interface CreatorLayoutProps {
  params: {
    username: string;
  };
  children: React.ReactNode;
}

const CreatorLayout = async ({ children, params }: CreatorLayoutProps) => {
  const self = await getSelfByUsername(params.username);
  if (!self) {
    return redirect("/");
  }
  return (
    <>
      <NavBar />
      <div className="flex h-full pt-20">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default CreatorLayout;
