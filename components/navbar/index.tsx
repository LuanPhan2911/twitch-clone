interface CommonNavbarProps {
  children: React.ReactNode;
}

export const CommonNavbar = ({ children }: CommonNavbarProps) => {
  return (
    <nav
      className="fixed top-0 left-0 h-20 
  w-full z-[49] bg-[#252731] px-2 lg:px-4 flex justify-between shadow-sm items-center"
    >
      {children}
    </nav>
  );
};
