'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Certification } from '@/types/types';
import { Share_Tech_Mono } from 'next/font/google';

const shareTechMono = Share_Tech_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
});

interface CertCardProps {
  cert: Certification;
  index: number;
}

export default function CertCard({ cert, index }: CertCardProps) {
  const glowColor = 'glow-red';

  return (
    <motion.div
      className={`bg-zinc-900/30 p-4 items-center rounded-xl border border-zinc-800 ${glowColor} shadow-lg flex text-white
      hover:scale-105 transition-all duration-300 justify-between gap-4 hover:bg-red-900/20 backdrop-blur-[1p] self-stretch`}
      initial={{ y: 50, scale: 0.60 }}
      whileInView={{ y: 0, scale: 1 }}
      transition={{ duration: 0.4,
        stiffness: 180,
        damping: 50,
        delay: index * 0.3,  }}
      viewport={{ once: true }}
    >

      <div className="flex flex-col h-fit items-center">
        <Image
          src={cert.fileUrl}
          alt={cert.title}
          width={80}
          height={80}
          className="rounded object-contain h-32 w-32"
        />
        <div className={`text-green-500 text-lg  rounded-md font-mono ${shareTechMono.className}`}>
          {`${new Date(cert.dateAcquired).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
          })}` 
          }
        </div>
      </div>
      
      <div className={`text-green-500 text-lg w-full rounded-md font-mono whitespace-pre-wrap flex flex-col gap-2 items-center ${shareTechMono.className}`}>
        <ul className='flex flex-col gap-2 items-center flex-wrap justify-center text-sm'>
          {cert.description.map((skill, index) => (
            <li className='bg-zinc-900/80 border border-zinc-800 text-sm px-3 
              pt-2 pb-1.5 rounded-md text-glow' key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
