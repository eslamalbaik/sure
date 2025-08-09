
import { Facebook, Instagram, X,Mail, ArrowBigDown, ArrowBigRight, ArrowBigLeft } from "lucide-react";
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
خدمات استشارية لإكتساب الثقة والتكيف مع التحديات، وإدارة النزاعات.              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-[#f7b731] transition-colors">الرئيسية</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-[#f7b731] transition-colors">  عن الدكتور عبدالله السبيعي</a></li>
                <li><a href="#faq" className="text-gray-300 hover:text-[#f7b731] transition-colors">الأسئلة الشائعة</a></li>
                <li><a href="#blog" className="text-gray-300 hover:text-[#f7b731] transition-colors">المدونة</a></li>
              </ul>
            </div>
            
   <div>
  <h4 className="text-xl font-bold mb-4">تابعنا على السوشال ميديا</h4>
  <div className="flex items-center gap-4 text-gray-300">
    {/* <a
      href="https://www.facebook.com/shor_consulting/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      className="hover:text-blue-500 transition-colors"
    >
      <Facebook size={24} />
    </a> */}
    <a
      href="https://x.com/Shor_Consulting?s=08"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="hover:text-sky-400 transition-colors"
    >
      <X size={24} />
    </a>
    <a
      href="https://www.instagram.com/shor_consulting/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      className="hover:text-pink-400 transition-colors"
    >
      <Instagram size={24} />
    </a>
    <a
      href="https://www.tiktok.com/@shor_consulting"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="TikTok"
      className="hover:text-red-500 transition-colors"
    >
      <TikTokIcon className="w-8 h-8 hover:text-black transition-colors" />
    </a>
  </div>

  {/* دعم فني عبر الإيميل */}
  <div className="mt-6 text-gray-300">
      <a  href="mailto:shor.helpdesk@gmail.com"  aria-label="Support"><button 
      className="text-sm font-semibold mb-2 hover:bg-green-400  hover:border-green-400 hover:text-white transition-colors flex justify-center items-center gap-4   bg-white border-2 px-4 py-2 text-black rounded-lg  border-[#f7b731]">  الدعم الفني <Mail size={20} /></button></a>
  </div>
</div>

          </div>
          
          <hr className="border-gray-600 my-8" />
          
          <div className="text-center text-gray-300">
            <p>&copy; 2025 د. عبدالله السبيعي. جميع الحقوق محفوظة. | خدمات الاستشارات  العامة</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
