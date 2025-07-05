
import { Facebook, Instagram, X } from "lucide-react";
import {TikTokIcon} from '@/components/ui/TikTokIcon'
import logo from '/logo-footer.png'

const Footer = () => {
  return (
    <footer className="bg-[#1a365d] text-white py-12 border-t-4 border-[#f7b731]"  dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img src={logo} className='w-28 h-16' alt="logo website"/>
<br />
              <p className="text-gray-300 mb-4 leading-relaxed">
                خدمات استشارية طبية متخصصة مكرسة لتقديم إرشادات الرعاية الصحية الخبيرة والرعاية الشخصية للمرضى.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-[#f7b731] transition-colors">الرئيسية</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-[#f7b731] transition-colors">  عن الدكتور عبدالله</a></li>
                <li><a href="#consultation" className="text-gray-300 hover:text-[#f7b731] transition-colors">الاستشارات</a></li>
                <li><a href="#faq" className="text-gray-300 hover:text-[#f7b731] transition-colors">الأسئلة الشائعة</a></li>
                <li><a href="#blog" className="text-gray-300 hover:text-[#f7b731] transition-colors">المدونة</a></li>
                <li><a href="/terms" className="text-gray-300 hover:text-[#f7b731] transition-colors">شروط الاستخدام</a></li>
                <li><a href="/privacy" className="text-gray-300 hover:text-[#f7b731] transition-colors">سياسة الخصوصية</a></li>
              </ul>
            </div>
            
   <div>
      <h4 className="text-xl font-bold mb-4">تابعنا على السوشال ميديا</h4>
      <div className="flex items-center gap-4 text-gray-300">
        <a
          href="https://www.facebook.com/Prof.Subaie/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-blue-500 transition-colors"
        >
          <Facebook size={24} />
        </a>
        <a
          href="prof_subaie"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
          className="hover:text-sky-400 transition-colors"
        >
          <X size={24} />
        </a>
        <a
          href="https://www.instagram.com/prof_subaie/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-pink-400 transition-colors"
        >
          <Instagram size={24} />
        </a>
        <a
          href="https://www.tiktok.com/@prof.subaie"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="hover:text-red-500 transition-colors"
        >
          <TikTokIcon className="w-8 h-8 hover:text-black transition-colors" />
        </a>
      </div>
            </div>
          </div>
          
          <hr className="border-gray-600 my-8" />
          
          <div className="text-center text-gray-300">
            <p>&copy; 2024 د. عبدالله الصبيعي. جميع الحقوق محفوظة. | خدمات الاستشارات الطبية المتخصصة</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
