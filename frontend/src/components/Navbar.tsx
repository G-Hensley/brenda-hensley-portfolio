import Link from "next/link";
import { Share_Tech_Mono } from 'next/font/google';
import { motion } from 'framer-motion';

const shareTechMono = Share_Tech_Mono({
    weight: ['400'],
    subsets: ['latin'],
    variable: '--font-share-tech-mono',
});

export default function Navbar() {
  return (
    <nav className="text-green-400 fixed top-0 z-60 w-full flex justify-center text-lg ">
        <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 5 }}

        >
          <div className={`${shareTechMono.className} bg-zinc-950/40 backdrop-blur-sm px-8 py-4 border-2 flex gap-16 border-red-900 border-t-0 glow-red
          rounded-b-lg items-center`}>
              <Link className="hover:text-green-800 transition-all duration-300 glow-link" href="/">Home</Link>
              <Link className="hover:text-green-800 transition-all duration-300 glow-link" href="#skills">Skills</Link>
              <Link className="hover:text-green-800 transition-all duration-300 glow-link" href="#projects">Projects</Link>
              <Link className="hover:text-green-800 transition-all duration-300 glow-link" href="#about">About</Link>
          </div>
        </motion.div>
    </nav>
  )
}
