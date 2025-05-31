// Main page for the portfolio

'use client';

// Import the Home page
import Home from './home/page';
import Navbar from '@/components/Navbar';
import ContactModal from '@/components/ContactModal';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function Page() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className='relative w-full bg-zinc-950'>
      <Navbar />
      <Home />
      <ContactModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Footer setIsOpen={setIsOpen} />
    </main>
  )
}
