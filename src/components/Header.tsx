
import { Menu, X, Phone, Mail, Shield } from 'lucide-react';
import logo from '/logo-removebg-preview (4).png'
import { useEffect, useState } from 'react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scroll down → Hide
      setIsVisible(false);
    } else {
      // Scroll up → Show
      setIsVisible(true);
    }

    setLastScrollY(currentScrollY);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [lastScrollY]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
<header
  className={`bg-white shadow-lg sticky top-0 z-50 transition-transform duration-300 ${
    isVisible ? 'translate-y-0' : '-translate-y-full'
  }`}
  dir="rtl"
>      <div className="container mx-auto lg:px-28">
        <div className="flex items-center justify-between gap-8  h-20">
         <a href="/">
             <div className="flex items-center space-x-4 space-x-reverse">
            {/* <h1 className="text-2xl font-bold text-[#1a365d]">د. عبدالله الصبيعي</h1> */}
            <img src={logo} className='lg:w-28 lg:h-14 w-24 h-12' alt="logo website"/>
          </div>
         </a>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
          <a href="/">
               <button 
              onClick={() => scrollToSection('/')}
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
            >
              الرئيسية
            </button></a>
          <a href="/about">
              <button 
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
            >
                 عن الدكتور عبدالله
            </button>
          </a>
            <button 
              onClick={() => scrollToSection('consultation')}
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
            >
              الاستشارات
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
            >
              الأسئلة الشائعة
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
            >
              المدونة
            </button>
            {/* <a href="/admin">
              <button className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                الإدارة
              </button>
            </a> */}
          </nav>

          {/* Contact Info */}
          {/* <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-full bg-[#560CAB]  text-white">
            <span>  احجز استشارتك الأن</span>
              <Phone className="w-4 h-4" />
            </div>
          </div> */}
        <a href="#consultation" className="relative hidden lg:flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#560CAB] rounded-full shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#560CAB] group-hover:translate-x-0 ease">
              <Phone className="w-4 h-4" />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-[#560CAB] transition-all duration-300 transform group-hover:translate-x-full ease">احجز استشارتك الأن</span>
            <span className="relative invisible">احجز استشارتك الأن</span>
        </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden  pb-4">
            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('/')}
                className="text-right px-4 py-2 text-gray-700 hover:text-[#1a365d] transition-colors"
              >
                الرئيسية
              </button>
           <a href="/about">
              <button 
                className="text-right px-4 py-2 text-gray-700 hover:text-[#1a365d] transition-colors"
              >
                  عن الدكتور عبدالله
              </button></a>
              <button 
                onClick={() => scrollToSection('consultation')}
                className="text-right px-4 py-2 text-gray-700 hover:text-[#1a365d] transition-colors"
              >
                الاستشارات
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-right px-4 py-2 text-gray-700 hover:text-[#1a365d] transition-colors"
              >
                الأسئلة الشائعة
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className="text-right px-4 py-2 text-gray-700 hover:text-[#1a365d] transition-colors"
              >
                المدونة
              </button>
              {/* <a href="/admin">
                <button className="text-right px-4 py-2 text-gray-700 hover:text-[#1a365d] transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  الإدارة
                </button>
              </a> */}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
