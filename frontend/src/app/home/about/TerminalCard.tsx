import { motion } from 'framer-motion';
import { Electrolize, Share_Tech_Mono } from 'next/font/google';
import { BrainCircuit, NotebookPen, BriefcaseBusiness, Globe, GlobeLock, HeartHandshake } from "lucide-react";
import { TypeAnimation } from 'react-type-animation';

const electrolize = Electrolize({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-electrolize',
});

const shareTechMono = Share_Tech_Mono({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
});

const logData = [
  {
    id: 1,
    icon: <BrainCircuit className='w-6 h-6 text-green-500 icon-glow' />,
    filename: 'Early-Curiosity.log',
    lines: [
      'Bypassed parental controls and BIOS locks at 5 years old.', 
      'I was always curious about how tech works.',
      'Created a Minecraft server at 11 years old.',
      'Started doing tech support for family and friends at 6 years old.',
    ],
  },
  {
    id: 2,
    icon: <NotebookPen className='w-6 h-6 text-green-500 icon-glow' />,
    filename: 'Education.log',
    lines: [
      'Earned my CC in 2023.',
      'Started my Cybersecurity degree in 2024.',
      'Earned my A+, Network+, Security+, CySA+, Pentest+, SSCP, ITIL v4, and Linux Essentials certifications in less than 6 months.',
      'Graduated from WGU in 2025.',
    ],
  },
  {
    id: 3,
    icon: <HeartHandshake className='w-6 h-6 text-green-500 icon-glow' />,
    filename: 'Motherhood.log',
    lines: ['Three kids, full-time job', 'Cybersecurity degree complete'],
  },
  {
    id: 4,
    icon: <Globe className='w-6 h-6 text-green-500 icon-glow' />,
    filename: 'Cyber-Experience.log',
    lines: ['Red team internship', 'Python tooling', 'TryHackMe Top 6%'],
  },
  {
    id: 5,
    icon: <BriefcaseBusiness className='w-6 h-6 text-green-500 icon-glow' />,
    filename: 'Career-Journey.log',
    lines: ['Red team internship', 'Python tooling', 'TryHackMe Top 6%'],
  },
  {
    id: 6,
    icon: <GlobeLock className='w-6 h-6 text-green-500 icon-glow' />,
    filename: 'My-Mission.log',
    lines: ['Red team internship', 'Python tooling', 'TryHackMe Top 6%'],
  }
];

export default function TerminalCard() {

  return (
    <motion.div className='grid grid-cols-12 gap-8 w-full'
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 1.5 }}
    >
      {logData.map(entry => {
        return (
          <div key={entry.id} className={`bg-neutral-950/30 backdrop-blur-[2px] border border-red-600/50 glow-red pb-4 px-4 pt-12 rounded-lg h-fit col-span-4 relative 
          ${logData.indexOf(entry) % 2 === 0 ? 'mt-12' : logData.indexOf(entry) % 1 === 0 ? 'mt-24' : logData.indexOf(entry) % 3 === 0 ? 'mt-36' : ''}`}>
            <div className='absolute top-0 left-0 w-full h-fit bg-red-600/20 rounded-t-md flex items-center justify-between py-1 px-4 backdrop-blur-[2px]'>
              <div className="flex gap-2 p-0 items-center justify-center">
                <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <div className='flex items-center gap-2'>
                {entry.icon}
                <h2 className={`${electrolize.className} text-green-500 text-lg xl:text-xl`}>{entry.filename}</h2>
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              {entry.lines.map((line, index) => (
                <TypeAnimation
                  key={index}
                  sequence={[line]}
                  speed={50}
                  cursor={false}
                className={`${shareTechMono.className} text-green-500 text-base xl:text-lg`}
                />
              ))}
            </div>
          </div>
        )
      })}
    </motion.div>
  )
  
}