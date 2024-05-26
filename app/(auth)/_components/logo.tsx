import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image src={"/twitch-icon.svg"} alt="Logo" width={"80"} height={"80"} />
      </div>
      <div className="flex flex-col items-center">
        <p className={cn("text-xl font-semibold", font.className)}>GameHub</p>
        <p className={cn("text-sm text-muted-foreground", font.className)}>
          Let&apos;s play
        </p>
      </div>
    </div>
  );
};

export default Logo;
