'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import { Electrolize } from 'next/font/google';
import { TypeAnimation } from 'react-type-animation';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { motion, useInView } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    project.skills.forEach(skill => allSkills.add(skill));
  });

  const filterOptions = Array.from(allSkills);


  return (
    <section id='projects' className="flex flex-col gap-12 pt-16 pb-12 px-8 md:px-16 min-h-fit items-center relative" ref={ref}>

      <div className="absolute top-8 right-48">
        <Select onValueChange={(value) => setSelectedSkill(value)}>
          <SelectTrigger className='bg-green-950/20 text-white cursor-pointer border-green-950'>
            <SelectValue placeholder='Filter by skill' />
          </SelectTrigger>
          <SelectContent className='bg-green-950/90 text-white cursor-pointer border-green-950'>
            <SelectItem value='all'>All Skills</SelectItem>
            {filterOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option != 'all' ? option.charAt(0).toUpperCase() + option.slice(1) : ``}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div ref={typingRef} className="flex flex-col gap-4 items-center">
        {startTyping && (
          <TypeAnimation
            sequence={[800, '> My Projects', 1000]}
            speed={50}
            className={`text-red-500 ${electrolize.className} text-3xl md:text-6xl`}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {projects?.filter(project => selectedSkill ? project.skills.includes(selectedSkill) || selectedSkill === 'all' : true).map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            whileInView={{ 
              opacity: 1, 
              scale: [0.5, 1.05, 1], 
              y: [50, -10, 0], 
              rotate: [2, -2, 0] 
            }}
            transition={{
              delay: index * 0.35,
              duration: 0.6,
              type: 'tween',
              ease: 'easeOut',
            }}
            viewport={{ once: true }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';
