
const Footer = () => {
  return (
    <footer className="bg-[#1a365d] text-white py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#f7b731]">د. عبدالله الصبيعي</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                خدمات استشارية طبية متخصصة مكرسة لتقديم إرشادات الرعاية الصحية الخبيرة والرعاية الشخصية للمرضى.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-[#f7b731] transition-colors">الرئيسية</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-[#f7b731] transition-colors">نبذة</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-[#f7b731] transition-colors">الخدمات</a></li>
                <li><a href="#consultation" className="text-gray-300 hover:text-[#f7b731] transition-colors">الاستشارات</a></li>
                <li><a href="#faq" className="text-gray-300 hover:text-[#f7b731] transition-colors">الأسئلة الشائعة</a></li>
                <li><a href="#blog" className="text-gray-300 hover:text-[#f7b731] transition-colors">المدونة</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-[#f7b731] transition-colors">التواصل</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">معلومات التواصل</h4>
              <div className="space-y-2 text-gray-300">
                <p>+966 50 123 4567</p>
                <p>info@subaieconsult.com</p>
                <p>الرياض، المملكة العربية السعودية</p>
                <p>الأحد - الخميس: 9:00 ص - 5:00 م</p>
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
