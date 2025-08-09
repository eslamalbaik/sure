import { Menu, X, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import logo from '/logo-removebg-preview (4).png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConsultationDropdownOpen, setIsConsultationDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

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
    >
      <div className="container mx-auto lg:pr-28">
        <div className="flex items-center justify-between gap-8 h-20">
          <a href="/">
            <div className="flex items-center space-x-4 space-x-reverse">
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
              </button>
            </a>
            <a href="/about-shor">
              <button 
                className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
              >
                عن شور
              </button>
            </a>
            
            {/* Consultation Dropdown */}
    
            <a href="/about">
              <button 
                className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
              >
                عن د.عبدالله
              </button>
            </a>
            
            <a 
              href="/#faq"
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
            >
              الأسئلة الشائعة
            </a>
            <a 
              href='/#blog'
              className="text-gray-700 hover:text-[#1a365d] transition-colors font-medium"
            >
              المدونة
            </a>
          </nav>

          {/* Contact Info */}
               <a  href="mailto:shor.helpdesk@gmail.com"  aria-label="Support" className="relative hidden lg:flex items-center justify-center p-4 px-8 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-[#560CAB] rounded-full shadow-md group">
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#560CAB] group-hover:translate-x-0 ease">
              <Phone className="w-4 h-4" />
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-[#560CAB] transition-all duration-300 transform group-hover:translate-x-full ease">الدعم الفني</span>
            <span className="relative invisible">الدعم الفني</span>
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
          <div className="md:hidden pb-4">
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
                </button>
              </a>
              
              {/* Mobile Consultation Dropdown */}
              <a href='/#faq' 
                className="text-right px-4 py-2 text-gray-700 hover:text-[#1a365d] transition-colors"
              >
                الأسئلة الشائعة
              </a>
              <a href='/#blog'
                className="text-right px-4 py-2 text-gray-700 hover:text-[#1a365d] transition-colors"
              >
                المدونة
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;