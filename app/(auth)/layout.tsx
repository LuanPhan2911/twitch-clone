import { ReactNode } from "react";
import Logo from "./_components/logo";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center space-x-6">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
