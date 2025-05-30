import { TypeAnimation } from 'react-type-animation';
import AnimatedAboutMe from './AnimatedAboutMe';
import { useRef, useState, useEffect, forwardRef } from 'react';
import { Electrolize } from 'next/font/google';
import { useInView } from 'framer-motion';
import { User } from 'lucide-react';

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

export const AboutSection = forwardRef<HTMLDivElement>((props, ref) => {
  const typingRef = useRef<HTMLDivElement>(null);
  const [startTyping, setStartTyping] = useState(false);
  const isInView = useInView(typingRef, { once: true });

  // Effect to start the typing animation when the section is in view
  useEffect(() => {
    if (isInView) {
      setStartTyping(true);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      id='about'
      className='relative px-6 pt-20 pb-16 bg-transparent flex flex-col gap-20 items-center min-h-screen h-fit'>
      <div
        ref={typingRef}
        className={`text-center flex items-center text-3xl md:text-6xl text-green-600 text-glow ${electrolize.className} z-10`}>
        <User className='text-green-600 icon-glow mr-4' size={56} />
        {startTyping && (
          <>
            <TypeAnimation
              sequence={[800, 'echo $USER', 1000]}
              speed={50}
              cursor={false}
              repeat={0}
            />
            <span className='text-green-500 animate-blink'>_</span>
          </>
        )}
      </div>
      <AnimatedAboutMe />
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
