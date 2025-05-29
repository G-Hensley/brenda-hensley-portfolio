import Link from 'next/link';
import { Share_Tech_Mono } from 'next/font/google';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const shareTechMono = Share_Tech_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
});

export default function Navbar() {
  const [isActive, setIsActive] = useState('home');

  const handleClick = (link: string) => {
    setIsActive(link);
  };

  // Use useEffect to handle the active link when the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'certs', 'projects', 'about'];
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;

      // If at the bottom of the page, activate 'about'
      if (scrollPosition + windowHeight >= fullHeight - 10) {
        setIsActive('about');
        return;
      }

      // Find which section is currently in view
      let currentSection = 'home';
      let smallestDistance = Infinity;

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top;

          // Check distance from element top to a point 100px from viewport top
          // This accounts for the navbar height
          const distance = Math.abs(elementTop - 100);

          console.log(
            `Section: ${sectionId}, Top: ${elementTop}, Distance: ${distance}`
          );

          // If this section's top is closer to our reference point, it's the active one
          if (distance < smallestDistance && elementTop < windowHeight * 0.5) {
            smallestDistance = distance;
            currentSection = sectionId;
          }
        } else {
          console.log(`Section ${sectionId} not found!`);
        }
      });

      setIsActive(currentSection);
    };

    // Run on mount
    handleScroll();

    // Add scroll listener with throttling for performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener);
    return () => window.removeEventListener('scroll', scrollListener);
  }, []);

  return (
    <nav className='text-green-400 fixed top-0 z-60 w-full flex justify-center text-lg '>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut', delay: 5 }}>
        <div
          className={`${shareTechMono.className} bg-zinc-950/40 backdrop-blur-sm px-8 py-4 border-2 flex gap-16 border-red-900 border-t-0 glow-red
          rounded-b-lg items-center`}>
          <Link
            onClick={() => handleClick('home')}
            className={`${
              isActive === 'home' ? 'text-red-800' : 'hover:text-green-600'
            } transition-all duration-300 glow-link`}
            href='#home'>
            Home
          </Link>
          <Link
            onClick={() => handleClick('certs')}
            className={`${
              isActive === 'certs' ? 'text-red-800' : 'hover:text-green-600'
            } transition-all duration-300 glow-link`}
            href='#certs'>
            Certifications
          </Link>
          <Link
            onClick={() => handleClick('projects')}
            className={`${
              isActive === 'projects' ? 'text-red-800' : 'hover:text-green-600'
            } transition-all duration-300 glow-link`}
            href='#projects'>
            Projects
          </Link>
          <Link
            onClick={() => handleClick('about')}
            className={`${
              isActive === 'about' ? 'text-red-800' : 'hover:text-green-600'
            } transition-all duration-300 glow-link`}
            href='#about'>
            About
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}
