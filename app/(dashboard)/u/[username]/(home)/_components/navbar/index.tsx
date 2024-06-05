import { CommonNavbar } from "@/components/navbar";
import Logo from "@/components/navbar/logo";
import { Actions } from "./actions";

export const NavBar = () => {
  return (
    <CommonNavbar>
      <Logo title="GameHub" subtitle=" Creator Dashboard" />
      <Actions />
    </CommonNavbar>
  );
};
