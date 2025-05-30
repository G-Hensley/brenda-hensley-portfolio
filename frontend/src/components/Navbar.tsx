import Link from 'next/link';
import { Share_Tech_Mono } from 'next/font/google';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import HamburgerIcon from './HamburgerIcon';

// Fonts
const shareTechMono = Share_Tech_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
});

export default function Navbar() {
  // State for the active link
  const [isActive, setIsActive] = useState('home');
  // State for the hamburger menu
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (link: string) => {
    setIsActive(link);
    // Close the menu when a link is clicked
    setMenuOpen(false);
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

  // Links for the menu
  const navLinks = [
    { name: 'Home', href: '/', key: 'home' },
    { name: 'Certs', href: '/skills', key: 'certs' },
    { name: 'Projects', href: '/skills#projects', key: 'projects' },
    { name: 'About', href: '/#about', key: 'about' },
    { name: 'Blog', href: '/blog', key: 'blog' },
  ]

  return (
    <nav className="text-green-400 fixed top-0 z-60 w-full flex justify-center text-lg">
      <motion.div
  className="w-full lg:w-auto"
  initial={{ opacity: 0, y: -100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
>
  {/* 🟢 Hamburger Icon – mobile only */}
  <div className="lg:hidden pr-8 absolute right-0">
    <button onClick={() => setMenuOpen(!menuOpen)}>
      <HamburgerIcon isOpen={menuOpen} />
    </button>
  </div>

  {/* 🟢 Desktop Nav – always visible on lg+ */}
  <div
    className={`${shareTechMono.className} hidden lg:flex flex-col lg:flex-row items-center gap-8 lg:gap-16 px-8 py-4 border-2 border-red-900 border-t-0 bg-zinc-950/40 backdrop-blur-sm glow-red rounded-b-lg mt-16 lg:mt-0`}
  >
    {navLinks.map(({ name, href, key }) => (
      <Link
        key={key}
        href={href}
        onClick={() => handleClick(key)}
        className={`${
          isActive === key ? 'text-red-800' : 'hover:text-green-600'
        } transition-all duration-300 glow-link`}
      >
        {name}
      </Link>
    ))}
  </div>

  {/* 🟡 Mobile Nav – conditional rendering */}
  <AnimatePresence>
    {menuOpen && (
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y:0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={`${shareTechMono.className} lg:hidden flex flex-col items-center gap-8 px-8 pt-16 pb-8 border-2 border-red-900 bg-zinc-950/40 backdrop-blur-sm rounded-b-lg glow-red`}
      >
        {navLinks.map(({ name, href, key }) => (
          <Link
            key={key}
            href={href}
            onClick={() => handleClick(key)}
            className={`${
              isActive === key ? 'text-red-800' : 'hover:text-green-600'
            } transition-all duration-300 glow-link`}
          >
            {name}
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
    </nav>
  );
  
}
