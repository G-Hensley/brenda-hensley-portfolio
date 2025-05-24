import Link from "next/link";
import { Electrolize } from "next/font/google";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { Button } from "@/components/ui/button";
const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

export default function Footer() {

  return (
    <footer className="bg-green-950/20 text-white py-4 px-8 md:px-16 border-t border-green-950 flex flex-col items-center gap-8 relative">
      <div className="absolute inset-0 z-0 bg-dot-fade pointer-events-none" />

      <div className="flex gap-36">

        <div className="flex-col flex items-center gap-4">
          <p className={`text-center text-2xl ${electrolize.className}`}>Socials</p>
          <Link href="https://github.com/b-hensley" target="_blank" className="text-green-500 hover:text-green-200 drop-shadow-sm drop-shadow-green-500/20
          ">
            <FiGithub className="hover:scale-115 transition-all duration-300 active:scale-100" size={28} />
          </Link>
          <Link href="https://github.com/b-hensley" target="_blank" className="text-green-500 hover:text-green-200 drop-shadow-sm drop-shadow-green-500/20
          ">
            <FiLinkedin className="hover:scale-115 transition-all duration-300 active:scale-100" size={28} />
          </Link>
        </div>

        <div className="flex-col flex items-center gap-4">
          <Button variant="outline" className="text-white drop-shadow-sm drop-shadow-green-500/20 cursor-pointer
          bg-green-950/20 border-green-950 hover:scale-105 transition-all duration-300 active:scale-100 hover:bg-green-950/30
          hover:text-white">
            Contact Me<FiMail className="scale-140"/>
          </Button>
        </div>
      </div>

      <div className="container mx-auto">
        <p className={`text-center ${electrolize.className}`}>
          &copy; {new Date().getFullYear()}
          <span> </span>
          <Link href="https://github.com/b-hensley" className="text-green-500 hover:text-green-200 glow-link">Brenda Hensley</Link>
          . All rights reserved. Designed and Developed by <span> </span>
          <Link href="https://gavinhensley.dev" className="text-green-500 hover:text-green-200 glow-link">Gavin Hensley</Link>.
        </p>
      </div>
    </footer>
  );
}