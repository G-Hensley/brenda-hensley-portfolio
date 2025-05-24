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
  const glowColor = index % 2 === 0 ? 'glow-red' : 'glow-green';

  return (
    <motion.div
      className={`bg-black/50 p-4 rounded-xl border border-neutral-800 ${glowColor} shadow-lg flex flex-col items-center text-white w-72
      hover:scale-105 transition-all duration-300 justify-between gap-4 h-fit hover:bg-red-900/30`}
      initial={{ y: 50, scale: 0.60 }}
      whileInView={{ y: 0, scale: 1 }}
      transition={{ duration: 0.4,
        stiffness: 180,
        damping: 50,
        delay: index * 0.3,  }}
      viewport={{ once: true }}
    >
      <Image
        src={cert.fileUrl}
        alt={cert.title}
        width={96}
        height={96}
        className="rounded object-contain"
      />
      <div className={`text-green-500 text-md w-full p-3 rounded-md font-mono whitespace-pre-wrap ${shareTechMono.className}`}>
        {`> Issued: ${new Date(cert.dateAcquired).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        })}
> Skills: ${cert.description.join(', ')}`}
      </div>
    </motion.div>
  );
}
