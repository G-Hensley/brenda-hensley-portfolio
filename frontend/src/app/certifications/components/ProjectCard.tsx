import { Project } from '@/types/types';
import Image from 'next/image';
import { Share_Tech_Mono, Electrolize } from 'next/font/google';
import { useState } from 'react';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import { motion } from 'framer-motion';

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

export default function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className='bg-zinc-900/30 rounded-xl border border-neutral-800 shadow-lg flex flex-col h-full w-full
      hover:scale-105 transition-all duration-300 hover:shadow-md hover:shadow-red-500/50 relative backdrop-blur-[1px]'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Image
        src={project.fileUrl}
        alt={project.title}
        width={350}
        height={200}
        className='rounded-t-xl w-full object-cover'
      />
      <div className='flex flex-col flex-grow p-4 gap-2'>
        <h1
          className={`text-2xl font-bold text-center ${electrolize.className} text-green-600`}>
          {project.title}
        </h1>
        <p
          className={`text-md text-center flex-grow ${shareTechMono.className} text-green-600`}>
          {project.description}
        </p>
        <div className='flex flex-row gap-x-4 gap-y-2 flex-wrap justify-center items-center mt-auto'>
          {project.skills.map((skill) => (
            <p
              key={Date.now() + Math.random()}
              className={`text-sm ${shareTechMono.className} border border-zinc-800 bg-zinc-900/60 rounded-md px-3 
              pt-2 pb-1.5 uppercase text-red-500 text-glow`}>
              {skill}
            </p>
          ))}
        </div>
      </div>
      {isHovered && (
        <div className='absolute w-full h-full flex items-center justify-center bg-black/90 rounded-xl'>
          <Link
            href={project.link}
            target='_blank'
            className={`text-md text-green-600 z-30 bg-green-950/90 rounded-xl px-4 py-2
            hover:text-green-400 hover:scale-110 transition-all duration-300 hover:shadow-sm hover:text-glow hover:outline-green-500/50 hover:outline-1
            active:scale-100 ${electrolize.className} flex flex-row gap-2 items-center`}>
            View Project <FiExternalLink className='inline-block' />
          </Link>
        </div>
      )}
    </motion.div>
  );
}
