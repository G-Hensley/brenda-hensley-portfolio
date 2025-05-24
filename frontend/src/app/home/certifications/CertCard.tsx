'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Certification } from '@/types/types';

interface CertCardProps {
  cert: Certification;
  index: number;
}

export default function CertCard({ cert, index }: CertCardProps) {
  const glowColor = index % 2 === 0 ? 'shadow-red-500/30' : 'shadow-green-500/30';

  return (
    <motion.div
      className={`bg-zinc-900 p-6 rounded-xl border border-zinc-700 ${glowColor} shadow-lg flex flex-col items-center text-white`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Image
        src={cert.fileUrl}
        alt={cert.title}
        width={96}
        height={96}
        className="rounded mb-4 object-contain"
      />
      <h3 className="text-xl font-semibold mb-2 text-center">{cert.title}</h3>
      <div className="bg-black text-green-400 text-sm w-full p-3 rounded-md font-mono whitespace-pre-wrap">
        {`> Issued: ${new Date(cert.dateAcquired).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
        })}
> Skills: ${cert.description.join(', ')}`}
      </div>
    </motion.div>
  );
}
