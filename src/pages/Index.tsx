
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
// import ConsultationForms from '@/components/ConsultationForms';
import FAQ from '@/components/FAQ';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { Users, Waypoints } from 'lucide-react';
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
         <div className="text-center my-16">
            <h2 className="text-4xl  font-bold text-[#1a365d] mb-6">
              مسارات شور
            </h2>
            <div className="w-24 h-1 bg-[#f7b731] mx-auto mt-6 rounded-full"></div>
          </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mt-20">
  <div className="bg-gradient-to-br from-[#560CAB] via-[#1e2635] to-[#1a202c] text-white  text-center bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
    <Waypoints className="w-12 h-12 mx-auto mb-4 text-[#f7b731]" />
    <h3 className="text-xl font-bold mb-2">مسار إدراك</h3>
    <p className="opacity-90 max-w-[400px] mx-auto mb-4">
      خدمات استشارات طبية "مجانية" لمراجعي البروفيسور عبدالله السبيعي بمركز إدراك للإستشارات الطبية.
    </p>
    <a
     href="/medical-consultation"
      className="inline-block px-6 py-2 bg-[#f7b731] text-white font-semibold rounded-xl hover:bg-yellow-400 transition"
    >
      للإستشارة إضغط هنا
    </a>
  </div>

  <div className="text-center text-white bg-gradient-to-br from-[#560CAB] via-[#1e2635] to-[#1a202c] bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
    <Users className="w-12 h-12 mx-auto mb-4 text-[#f7b731]" />
    <h3 className="text-xl font-bold mb-2">مسارات شور</h3>
    <p className="opacity-90 max-w-[400px] mx-auto mb-4">
خدمة إستشارية، مدفوعة (غير طبية)،  في مجالات العمل والعلاقات وتحولات الحياة    </p>
    <a
      href="/personal-consultation"
      className="inline-block  px-6 py-2 bg-[#f7b731] text-white font-semibold rounded-xl hover:bg-yellow-400 transition"
    >
      للإستشارة إضغط هنا
    </a>
</div>

    </div>
      <About />
      {/* <ConsultationForms /> */}
      <Services />
      {/* <ClientJourney/> */}
      <Blog />
      <FAQ />
      {/* <Contact /> */}
    </div>
  );
};

export default Index;
