'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { Electrolize } from 'next/font/google';
import { TypeAnimation } from 'react-type-animation';
import ProjectCard from './ProjectCard';
import { getProjects } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { motion, useInView } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FolderClosed } from 'lucide-react';

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

export const ProjectsSection = forwardRef<HTMLDivElement>((props, ref) => {
  const typingRef = useRef(null);
  const isInView = useInView(typingRef, { once: true });

  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (isInView) {
      setStartTyping(true);
    }
  }, [isInView]);

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const allSkills = new Set<string>();
  projects?.forEach((project) => {
    project.skills.forEach((skill) => allSkills.add(skill));
  });

  const filterOptions = Array.from(allSkills);

  return (
    <section
      id='projects'
      className='flex flex-col gap-20 pt-20 pb-12 px-8 md:px-16 min-h-fit items-center relative'
      ref={ref}>
      <div className='absolute top-20 right-64'>
        <Select onValueChange={(value) => setSelectedSkill(value)}>
          <SelectTrigger className='bg-green-950/20 glow-green text-white cursor-pointer border-green-950 text-lg'>
            <SelectValue placeholder='Filter by skill' />
          </SelectTrigger>
          <SelectContent className='bg-green-950/90 text-white cursor-pointer border-green-900'>
            <SelectItem className='text-lg' value='all'>
              All Skills
            </SelectItem>
            {filterOptions.map((option) => (
              <SelectItem key={option} value={option} className='text-base'>
                {option != 'all'
                  ? option.charAt(0).toUpperCase() + option.slice(1)
                  : ``}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div
        ref={typingRef}
        className={`text-center text-3xl md:text-6xl text-red-600 text-glow ${electrolize.className} z-10 flex items-center`}>
        <FolderClosed className='text-red-600 icon-glow mr-4' size={56} />
        {startTyping && (
          <>
            <TypeAnimation
              sequence={[800, 'My Projects', 1000]}
              speed={50}
              cursor={false}
              repeat={0}
            />
            <span className='text-red-500 animate-blink'>_</span>
          </>
        )}
      </div>
      <div className='flex flex-wrap gap-8 justify-center w-full'>
        {projects
          ?.filter((project) =>
            selectedSkill
              ? project.skills.includes(selectedSkill) ||
                selectedSkill === 'all'
              : true
          )
          .map((project, index) => (
            <motion.div
              key={project._id}
              className='flex basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(20%-1.6rem)] max-w-sm'
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              whileInView={{
                opacity: 1,
                scale: [0.5, 1.05, 1],
                y: [50, -10, 0],
                rotate: [2, -2, 0],
              }}
              transition={{
                delay: index * 0.35,
                duration: 0.6,
                type: 'tween',
                ease: 'easeOut',
              }}
              viewport={{ once: true }}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';
