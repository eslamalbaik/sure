
import { Lightbulb, TrendingUp, Users, Target, BrainCog, Activity, Repeat, ShieldCheck, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
const ServicesSection = () => {


const services = [
  {
    icon: BrainCog,
    title: "تعزيز المرونة النفسية",
    description: "برامج تهدف إلى تقوية قدرة الفرد على التكيف مع التحديات والضغوط"
  },
  {
    icon: Activity,
    title: "إدارة الضغوط",
    description: "تقنيات واستراتيجيات فعالة لمواجهة الضغوط النفسية والعملية"
  },
  {
    icon: Repeat,
    title: "دعم مراحل الانتقال في الحياة",
    description: "مرافقة وتوجيه الأفراد خلال التحولات المهمة في حياتهم"
  },
  {
    icon: Users,
    title: "إدارة العلاقات",
    description: "تعزيز مهارات التواصل وبناء علاقات صحية ومتوازنة"
  },
  {
    icon: Heart,
    title: "تعزيز الذكاء العاطفي",
    description: "تنمية القدرة على التعرف على المشاعر والتحكم بها بفعالية"
  },
  {
    icon: ShieldCheck,
    title: "تقدير الذات وبناء الثقة",
    description: "برامج تهدف إلى رفع مستوى الوعي الذاتي وتعزيز الثقة بالنفس"
  }
];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-6">
              خدماتنا الاستشارية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
مجموعة شاملة من الخدمات الاستشارية المتخصصة لدعم الصحة النفسية         
   </p>
            <div className="w-24 h-1 bg-[#f7b731] mx-auto mt-6 rounded-full"></div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50"
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-r from-[#1a365d] to-[#560CAB] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#560CAB] rounded-full opacity-20 group-hover:opacity-40 transition-opacity"></div>
                  </div>
                  <CardTitle className="text-xl font-bold text-[#1a365d] group-hover:text-[#560CAB] transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 leading-relaxed text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#1a365d] via-purple-600 to-[#560CAB] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 border border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 w-32 h-32 border border-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-8">
                لماذا تختار خدماتنا الاستشارية؟
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">خبرة متميزة</h4>
                  <p className="text-white/90">أكثر من 30 سنة في مجال الاستشارات النفسية</p>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">تحوّلات ملموسة</h4>
                  <p className="text-white/90">نتائج فعلية في تحسين جودة الحياة</p>
                </div>
                <div className="group">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">نهج إنساني وشخصي</h4>
                  <p className="text-white/90">نستمع إليك ونعمل معك لتقديم حلول تلائم تجربتك</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
