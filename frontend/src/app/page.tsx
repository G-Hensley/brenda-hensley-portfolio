// Main page for the portfolio

'use client';

// Import the Home page
import Home from './home/page';
import Navbar from '@/components/Navbar';
export default function Page() {

  return (
    <main className='relative w-full'>
      <Navbar />
      <Home />
    </main>
  )
}
