import { ReactNode } from "react";
import Logo from "./_components/logo";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center gap-x-6">
      <div className="hidden lg:block">
        <Logo />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
