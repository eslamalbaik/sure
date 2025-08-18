
import { Button } from '@/components/ui/button';
import { Calendar, Award, Phone, ArrowLeft, Waypoints, Users } from 'lucide-react';
import doctor from '/Hero.webp'
import { Star } from 'lucide-react';
import { Heart } from 'lucide-react'; 

const Hero = () => {
  const scrollToConsultation = () => {
    const element = document.getElementById('consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
const avatars = [
    '/assets/avatar/a1 (1).avif',
    '/assets/avatar/a1 (1).jpg',
    '/assets/avatar/a1 (2).avif',
    '/assets/avatar/a1 (2).jpg',
    '/assets/avatar/a1 (3).jpg',
    
  ];
  return (
    <section id="home" className="bg-gradient-to-br rounded-bl-[85px] rounded-br-[85px]  from-[#560CAB] via-[#3e0a79] to-[#1a202c] text-white border-r-[40px] border-l-[40px] border-white py-[50px] lg:py-[80px]" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div className="text-center lg:text-right">
              {/* <div className="inline-flex gap-2 bg-white/20 rounded-full p-2">
              <span className="bg-green-500 w-3 h-3 rounded-full animate-pulse mr-2 mt-1"></span>
                <span className="text-xs">ابدأ رحلتك معنا </span>
              </div> */}
              <h1 className="text-4xl font-Brands  lg:text-[55px] font-bold mb-6 animate-fade-in leading-tight">
                شور للإستشارات
              </h1>
              <p className="text-xl lg:text-2xl mb-12 opacity-90 animate-fade-in leading-relaxed">
                نفترض فيك السلامة، فلا نعالجك ولا نقودك، بل نقف معك ونسير بجانبك
              </p>
              <div className='flex justify-center lg:justify-start items-center gap-4'>
                <a href="/about-shor">
                  <Button
                    className="group bg-white hover:bg-[#560CAB]/90 hover:text-white text-[#560CAB] px-6 py-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                  >
                    أعرف أكثر عن شور
                    <ArrowLeft
                      className="w-4 h-4 mr-2 transition-transform duration-300 group-active:-translate-x-1"
                    />
                  </Button>

                </a>
           
              </div>
           <br />
            </div>

            <div className="relative">
              <img
                src={doctor}
                alt="د. عبدالله الصبيعي"
                className="w-[1200px]  h-[400px] "

              />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
