// Hero Section for the home page

// Import the components
import { useState, useEffect } from 'react';

import { TypeAnimation } from 'react-type-animation';
import { Share_Tech_Mono } from 'next/font/google';

const shareTechMono = Share_Tech_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
});

export function HeroSection() {

  // State to show the "whoami"
  const [showWhoami, setShowWhoami] = useState(true);

  // Effect to hide the "whoami"
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowWhoami(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className='text-white p-8 gap-4 h-screen flex flex-col items-center justify-center'>

      {showWhoami && (
        <div className={`text-left text-3xl md:text-6xl font-mono text-red-500 ${shareTechMono.className}`}>
        <TypeAnimation
          sequence={[
            '> whoami',
            1000,
            '', // delete whoami
          ]}
          wrapper="span"
          speed={50}
          cursor={false}
          repeat={0}
        />
        <span className="text-red-500 animate-blink">_</span>
      </div>
      )}
      
      {!showWhoami && (
        <div className={`text-left text-3xl md:text-6xl font-mono text-red-500 ${shareTechMono.className}`}>
        <TypeAnimation
          sequence={[
            1000,
            'root@brenda-hensley:~$ Pentester',
            2000,
            'root@brenda-hensley:~$ App Security Engineer',
            3000,
            'root@brenda-hensley:~$ Red Team Operator',
            2500,
          ]}
          wrapper="span"
          speed={50}
          cursor={false}
          repeat={0}
        />
        <span className="text-red-500 animate-blink">_</span>
      </div>
      )}
      
    </section>
  );

}