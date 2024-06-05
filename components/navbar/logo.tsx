import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Logo = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-x-4 hover:opacity-75 transition mr-2">
        <div className="bg-white rounded-full p-1">
          <Image
            src={"/twitch-icon.svg"}
            height={"32"}
            width={"32"}
            alt="Logo"
          />
        </div>
        <div className="flex-col items-center hidden lg:flex">
          <p className={cn("text-xl font-semibold", font.className)}>{title}</p>
          <p className={cn("text-sm text-muted-foreground", font.className)}>
            {subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
