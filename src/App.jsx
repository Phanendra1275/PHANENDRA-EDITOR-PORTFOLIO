import { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Preloader onComplete={() => setLoading(false)} />
      
      <div className={`relative min-h-screen bg-bg-darkest text-text-primary selection:bg-accent selection:text-bg-darkest overflow-hidden antialiased transition-opacity duration-1000 ${
        loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'
      }`}>
        {/* Cinematic Ambient Grid/Texture Overlay */}
        <div className="fixed inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.015] via-transparent to-transparent" />
        
        {/* Header Sticky Navigation */}
        <Navbar />

        {/* Main Single Page Sections */}
        <main className="relative z-20">
          <Hero />
          <Portfolio />
          <About />
          <Services />
          <Testimonials />
          <Contact />
        </main>

        {/* Footer Signature */}
        <Footer />
      </div>
    </>
  );
}
