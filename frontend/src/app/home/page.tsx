// Home Page for the portfolio

// Import the components
import { HeroSection } from './hero/HeroSection';
import MatrixBackground from '@/components/MatrixBg';

export default function Home() {
  return (
    <main className='min-h-svh h-screen bg-zinc-950'>
      <MatrixBackground />
      <HeroSection />
    </main>
  );
}
