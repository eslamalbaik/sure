
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, FileText, Clock, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "الاستشارات الطبية",
      description: "تقييمات طبية شاملة ونصائح خبير لمختلف المشاكل والحالات الصحية."
    },
    {
      icon: FileText,
      title: "التقييم الصحي",
      description: "تقييمات صحية مفصلة ومراجعات طبية لتوجيه قراراتك الصحية."
    },
    {
      icon: Clock,
      title: "المتابعة",
      description: "استشارة ومراقبة مستمرة لضمان النتائج الصحية المثلى والتعافي."
    },
    {
      icon: Shield,
      title: "الرعاية الوقائية",
      description: "إرشادات صحية استباقية وتدابير وقائية للحفاظ على صحتك."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a365d] mb-4">خدماتنا</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              خدمات استشارية طبية شاملة مصممة لتلبية احتياجاتك الصحية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                  <service.icon className="w-16 h-16 mx-auto mb-4 text-[#1a365d] group-hover:text-[#f7b731] transition-colors duration-300" />
                  <CardTitle className="text-xl text-[#1a365d] group-hover:text-[#f7b731] transition-colors duration-300 font-bold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-[#1a365d] to-[#2d3748] rounded-3xl p-8 text-white text-center shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">لماذا تختار خدماتنا الاستشارية؟</h3>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              نقدم استشارات طبية شخصية ومهنية مع التركيز على احتياجاتك الصحية الفردية واهتماماتك.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
                <h4 className="text-xl font-bold mb-2 text-[#f7b731]">التميز المهني</h4>
                <p className="opacity-90">معرفة طبية خبيرة وخبرة مثبتة</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
                <h4 className="text-xl font-bold mb-2 text-[#f7b731]">رعاية شخصية</h4>
                <p className="opacity-90">استشارة مخصصة لاحتياجاتك المحددة</p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
                <h4 className="text-xl font-bold mb-2 text-[#f7b731]">خدمة سرية</h4>
                <p className="opacity-90">الخصوصية والسرية في جميع الاستشارات</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
