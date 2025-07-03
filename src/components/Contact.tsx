
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {

  return (
    <section id="contact" className="py-20 bg-white" dir="rtl">
     
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a365d] mb-4">معلومات التواصل</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              تواصل معنا لأي استفسارات أو لحجز موعد استشارتك
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-[#1a365d]" />
                <CardTitle className="text-xl text-[#1a365d] font-bold">الموقع</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  المركز الطبي<br />
                  الرياض، المملكة العربية السعودية<br />
                  المملكة العربية السعودية
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <Phone className="w-12 h-12 mx-auto mb-4 text-[#f7b731]" />
                <CardTitle className="text-xl text-[#1a365d] font-bold">الهاتف</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  +966 50 123 4567<br />
                  +966 11 234 5678
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <Mail className="w-12 h-12 mx-auto mb-4 text-[#1a365d]" />
                <CardTitle className="text-xl text-[#1a365d] font-bold">البريد الإلكتروني</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  info@subaieconsult.com<br />
                  consultation@subaieconsult.com
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <Clock className="w-12 h-12 mx-auto mb-4 text-[#f7b731]" />
                <CardTitle className="text-xl text-[#1a365d] font-bold">ساعات العمل</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  الأحد - الخميس<br />
                  9:00 ص - 5:00 م<br />
                  <span className="text-sm">بموعد مسبق فقط</span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 bg-gradient-to-r from-[#1a365d] to-[#f7b731] rounded-3xl p-8 text-white text-center shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">جاهز لحجز استشارتك؟</h3>
            <p className="text-xl mb-6 opacity-90 leading-relaxed">
              تواصل معنا اليوم لحجز موعدك مع د. عبدالله الصبيعي
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+966501234567" className="bg-white text-[#1a365d] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors text-lg">
                اتصل الآن
              </a>
              <a href="mailto:info@subaieconsult.com" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#1a365d] transition-colors text-lg">
                أرسل إيميل
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
