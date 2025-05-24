import { forwardRef } from 'react';
import { Electrolize } from 'next/font/google';
import { TypeAnimation } from 'react-type-animation';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

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
        {projects?.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';
