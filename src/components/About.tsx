
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Award, Users, Stethoscope } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a365d] mb-4">نبذة عن د. عبدالله الصبيعي</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              طبيب متميز مكرس لتقديم خدمات الاستشارات الطبية الاستثنائية
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <h3 className="text-3xl font-bold text-[#1a365d] mb-6">التميز المهني</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                يتمتع د. عبدالله الصبيعي بخبرة واسعة في الاستشارات الطبية ورعاية المرضى. 
                مع التزامه بالتميز والنهج المتمحور حول المريض، يقدم إرشادات طبية شاملة 
                مصممة خصيصاً للاحتياجات الفردية.
              </p>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                تمتد خبرته عبر مختلف التخصصات الطبية، مما يضمن حصول المرضى على الاستشارة 
                الأنسب والأكثر فعالية لمشاكلهم الصحية المحددة.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-[#f7b731] text-[#1a365d] px-4 py-2 rounded-full font-bold">الاستشارات الطبية</span>
                <span className="bg-[#1a365d] text-white px-4 py-2 rounded-full font-bold">رعاية المرضى</span>
                <span className="bg-[#f7b731] text-[#1a365d] px-4 py-2 rounded-full font-bold">التقييم الصحي</span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="د. عبدالله الصبيعي" 
                className="rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg">
              <CardContent className="pt-6">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 text-[#1a365d]" />
                <h4 className="text-xl font-bold mb-2 text-[#1a365d]">التعليم</h4>
                <p className="text-gray-600">درجة طبية متقدمة مع تدريب متخصص</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 mx-auto mb-4 text-[#f7b731]" />
                <h4 className="text-xl font-bold mb-2 text-[#1a365d]">الاعتراف</h4>
                <p className="text-gray-600">جوائز واعتراف بالتميز الطبي</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 mx-auto mb-4 text-[#1a365d]" />
                <h4 className="text-xl font-bold mb-2 text-[#1a365d]">الخبرة</h4>
                <p className="text-gray-600">سنوات من رعاية المرضى والاستشارات المتفانية</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-lg">
              <CardContent className="pt-6">
                <Stethoscope className="w-12 h-12 mx-auto mb-4 text-[#f7b731]" />
                <h4 className="text-xl font-bold mb-2 text-[#1a365d]">الخبرة</h4>
                <p className="text-gray-600">معرفة ومهارات طبية شاملة</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
