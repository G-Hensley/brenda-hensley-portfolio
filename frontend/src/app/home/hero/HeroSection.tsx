// Hero Section for the home page

// Import the components
import MatrixBackground from '@/components/MatrixBg';
export function HeroSection() {

  return (
    <section className='bg-black text-white p-8 gap-4 h-screen'>
      <MatrixBackground />
      <h1 className='text-4xl font-bold'>Home</h1>
    </section>
  );

}