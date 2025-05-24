import Link from "next/link";
import { Electrolize } from 'next/font/google';

const electrolize = Electrolize({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-electrolize',
});

export default function Navbar() {
  return (
    <nav className="text-green-400 fixed top-0 z-50 w-full flex justify-center text-lg ">
        <div className={`${electrolize.className} bg-zinc-950/40 backdrop-blur-[5px] px-8 py-4 border-2 flex gap-16 border-red-900 border-t-0 glow-red
        rounded-b-lg`}>
            <Link className="hover:text-green-800 transition-all duration-300 glow-link" href="/">Home</Link>
            <Link className="hover:text-green-800 transition-all duration-300 glow-link" href="/about">About</Link>
            <Link className="hover:text-green-800 transition-all duration-300 glow-link" href="/projects">Projects</Link>
        </div>
    </nav>
  )
}
