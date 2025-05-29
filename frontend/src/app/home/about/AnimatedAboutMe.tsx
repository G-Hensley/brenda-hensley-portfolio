import { motion } from "framer-motion";
import { Share_Tech_Mono, Electrolize } from "next/font/google";
import './about.css';

const shareTechMono = Share_Tech_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
});

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

export default function AnimatedAboutMe() {
  return (
    <div className="text-white text-4xl font-bold text-center">
        <div className="grid grid-cols-6 gap-8">

            {/* Early Curiosity */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="col-span-6 md:col-span-3 bg-zinc-900/30 p-4 rounded-lg border border-zinc-800 flex flex-col gap-4 shadow-glow relative"
            >
              <div className="flex gap-2 w-full justify-center">
                <h3 className={`text-2xl font-semibold text-green-600 shadow-lg ${electrolize.className} text-glow`}># Early Curiosity</h3>
              </div>
              <p className={`text-[19px] leading-relaxed ${shareTechMono.className} text-left text-zinc-200`}>
                I&apos;ve been breaking and fixing tech since I was five. It started with bypassing parental controls and recovering a BIOS-locked laptop. That early curiosity for how things work has driven me ever since.
              </p>
            </motion.div>

            {/* Education Journey */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="col-span-6 md:col-span-3 bg-zinc-900/30 p-4 rounded-lg border border-zinc-800 flex flex-col gap-4 shadow-glow"
            >
              <h3 className={`text-2xl font-semibold text-green-600 shadow-lg ${electrolize.className} text-glow`}>&gt;  Education Journey</h3>
              <p className={`text-[19px] leading-relaxed ${shareTechMono.className} text-left text-zinc-200`}>
                I began my cybersecurity degree in 2023 while eight months pregnant with my second child. I graduated six months later with a newborn and three kids at home.
              </p>
            </motion.div>

            {/* Cyber Experience */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="col-span-6 md:col-span-4 bg-zinc-900/30 p-4 rounded-lg border border-zinc-800 flex flex-col gap-4 shadow-glow"
            >
              <h3 className={`text-2xl font-semibold text-green-600 shadow-lg ${electrolize.className} text-glow`}>&gt;  Cyber Experience</h3>
              <p className={`text-[19px] leading-relaxed ${shareTechMono.className} text-left text-zinc-200`}>
                I&apos;ve earned Security+, CySA+, and Pentest+, completed a red team internship, and built a home lab. I work with tools like Burp Suite, Nmap, Hydra, and GitLeaks—and write automation scripts in Python and AI.
              </p>
            </motion.div>

            {/* Career Journey */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="col-span-6 md:col-span-2 bg-zinc-900/30 p-4 rounded-lg border border-zinc-800 flex flex-col gap-4 shadow-glow"
            >
              <div className="absolute inset-0 pointer-events-none bg-[url('/scanlines.svg')] opacity-5" />
              <h3 className={`text-2xl font-semibold text-green-600 shadow-lg ${electrolize.className} text-glow`}>$ Motherhood & Career</h3>
              <p className={`text-[19px] leading-relaxed ${shareTechMono.className} text-left text-zinc-200`}>
                I&apos;ve worked full-time in legal support while raising three kids and building my cyber career from the ground up.
              </p>
            </motion.div>

            {/* Mission and Future */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="justify-self-start bg-zinc-900/30 p-4 rounded-lg border border-zinc-800 flex flex-col gap-4 shadow-glow col-span-6"
            >
              <h3 className={`text-2xl font-semibold text-green-600 shadow-lg ${electrolize.className} text-glow`}># Why Cybersecurity?</h3>
              <p className={`text-[19px] leading-relaxed ${shareTechMono.className} text-center text-zinc-200`}>
                I&apos;m in the top 6% on TryHackMe, prepping for the DoD Cyber Sentinel Challenge, and driven by a love of solving problems hands-on.
              </p>
            </motion.div>
            
        </div>
    </div>
  );
}
