'use client';

import { useQuery } from '@tanstack/react-query';
import { getSkills } from '@/lib/api';
import { Skill } from '@/types/types';
import { Electrolize } from 'next/font/google';
import { motion } from 'framer-motion';

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

export function SkillsScroll() {
  const { data: skills = [] } = useQuery<Skill[]>({
    queryKey: ['skills'],
    queryFn: getSkills,
  });

  const loopedSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    <section className="relative w-full overflow-hidden">

      {/* CSS-based animated scroll */}
      <div className="overflow-hidden whitespace-nowrap py-8">
        <div className="flex animate-[scroll_40s_linear_infinite] w-max hover:[animation-play-state:paused]">
          {loopedSkills.map((skill, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 50, delay: index * 0.05, duration: 0.5 }}
              key={`${skill._id || skill.title}-${index}`}
              viewport={{ once: true }}
              className={`px-6 py-2 text-sm md:text-lg text-tra font-mono rounded-full glow-red border border-red-950 bg-red-900/30 shadow shadow-red-500/30 text-white mx-4 ${electrolize.className}`}
            >
              {skill.title}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
