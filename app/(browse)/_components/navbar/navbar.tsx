import { CommonNavbar } from "@/components/navbar";
import Actions from "./actions";
import Logo from "@/components/navbar/logo";
import SearchBar from "@/components/navbar/search-bar";

const NavBar = () => {
  return (
    <CommonNavbar>
      <Logo title="Gamehub" subtitle="Let's play" />
      <SearchBar path="/search" />
      <Actions />
    </CommonNavbar>
  );
};

export default NavBar;
