
import { Menu, X, Phone, Mail } from 'lucide-react';
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
>      <div className="container mx-auto px-28">
        <div className="flex items-center justify-between h-20">
         <a href="/">
             <div className="flex items-center space-x-4 space-x-reverse">
            {/* <h1 className="text-2xl font-bold text-[#1a365d]">د. عبدالله الصبيعي</h1> */}
            <img src={logo} className='w-28 h-14' alt="logo website"/>
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
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
            >
                 عن الدكتور عبدالله
            </button>
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
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            <div className="flex items-center gap-2 px-8 py-4 text-sm font-bold rounded-full bg-[#560CAB]  text-white">
            <span>  احجز استشارتك الأن</span>
              <Phone className="w-4 h-4" />
            </div>
          </div>

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
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('/')}
                className="text-right px-4 py-2 text-gray-700 hover:text-[#1a365d] transition-colors"
              >
                الرئيسية
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-right px-4 py-2 text-gray-700 hover:text-[#1a365d] transition-colors"
              >
                  عن الدكتور عبدالله
              </button>
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
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
