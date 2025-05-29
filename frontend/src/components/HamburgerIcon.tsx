// HamburgerIcon.tsx
'use client'
import { motion } from 'framer-motion'

export default function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  const top = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 10 },
  }
  const center = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  }
  const bottom = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -10 },
  }

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-8 h-8 relative z-50 cursor-pointer">
      <motion.span
        variants={top}
        animate={isOpen ? 'open' : 'closed'}
        className="block h-[2px] w-8 bg-green-400 rounded-sm glow-green"
      />
      <motion.span
        variants={center}
        animate={isOpen ? 'open' : 'closed'}
        className="block h-[2px] w-8 bg-green-400 rounded-sm glow-green"
      />
      <motion.span
        variants={bottom}
        animate={isOpen ? 'open' : 'closed'}
        className="block h-[2px] w-8 bg-green-400 rounded-sm glow-green"
      />
    </div>
  )
}
