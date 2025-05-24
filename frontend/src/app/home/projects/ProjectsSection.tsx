import { forwardRef } from 'react';
import { Electrolize } from 'next/font/google';
import { TypeAnimation } from 'react-type-animation';

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

export const ProjectsSection = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <section className="flex flex-col gap-4 bg-neutral-950/50 p-4  min-h-screen" ref={ref}>
      <div className="flex flex-col gap-4 items-center">
        <TypeAnimation
          sequence={['> My Projects', 1000]}
          speed={50}
          className={`text-red-500 ${electrolize.className} text-3xl md:text-6xl`}
        />
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';
