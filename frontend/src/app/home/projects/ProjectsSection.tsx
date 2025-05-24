import { forwardRef } from 'react';
import { Electrolize } from 'next/font/google';
import { TypeAnimation } from 'react-type-animation';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

export const ProjectsSection = forwardRef<HTMLDivElement>((props, ref) => {

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  return (
    <section className="flex flex-col gap-8 bg-neutral-950/50 py-4 px-8 md:px-16 min-h-screen items-center" ref={ref}>
      <div className="flex flex-col gap-4 items-center">
        <TypeAnimation
          sequence={['> My Projects', 1000]}
          speed={50}
          className={`text-red-500 ${electrolize.className} text-3xl md:text-6xl`}
        />
      </div>
      <div className="flex flex-wrap gap-8 justify-center">
        {projects?.map((project, index) => (
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
