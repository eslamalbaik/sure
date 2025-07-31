
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import ConsultationForms from '@/components/ConsultationForms';
import FAQ from '@/components/FAQ';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
      // import ClientJourney from '@/components/ClientJourney';

const Index = () => {
  useEffect(() => {
  const hash = window.location.hash;
  if (hash) {
    const el = document.querySelector(hash);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 100); // نأخره شوي ليتحمل العنصر
    }
  }
}, []);
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <ConsultationForms />
      <Services />
      {/* <ClientJourney/> */}
      <Blog />
      <FAQ />
      {/* <Contact /> */}
    </div>
  );
};

export default Index;
