
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import ConsultationForms from '@/components/ConsultationForms';
import FAQ from '@/components/FAQ';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <ConsultationForms />
      <Blog />
      <FAQ />
      {/* <Contact /> */}
    </div>
  );
};

export default Index;
