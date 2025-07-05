
import { Filter, Users, CheckCircle, ArrowRight, Shield, Target, Clock } from 'lucide-react';

const ClientJourney = () => {
  const journeySteps = [
    {
      number: "01",
      title: "الفلتر المستوى الأول",
      subtitle: "نموذج بوصلة البداية",
      description: "يتوجه العميل إلى صفحة الحجز ويملأ نموذج بوصلة البداية قبل حجز الموعد",
      icon: Filter,
      color: "bg-[#560CAB]",
      features: [
        "تقييم أولي للحالة",
        "فهم احتياجات العميل",
        "تحديد مدى الملاءمة للخدمة"
      ]
    },
    {
      number: "02", 
      title: "الفلتر المستوى الثاني",
      subtitle: "توجيه العملاء المناسبين",
      description: "توجيه العملاء بشكل مسؤول وأخلاقي إلى الخدمة المناسبة أو المكان الصحيح",
      icon: Users,
      color: "bg-[#f7b731]",
      features: [
        "تقييم التخصص المطلوب",
        "إدارة التوقعات",
        "التوجيه المهني"
      ]
    },
    {
      number: "03",
      title: "الفلتر المستوى الثالث", 
      subtitle: "رسالة التأكيد والتحضير",
      description: "إرسال رسالة تأكيد شاملة مع سؤال تحضيري لضمان جدية العميل والتزامه",
      icon: CheckCircle,
      color: "bg-[#560CAB]",
      features: [
        "تأكيد تفاصيل الجلسة",
        "أسئلة تحضيرية",
        "ضمان الالتزام"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#1a365d] mb-6">
              رحلة العميل في شُور
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              آلية متعددة المستويات لفلترة العملاء لضمان جودة الخدمة والتعامل الاحترافي
            </p>
            <div className="w-24 h-1 bg-[#f7b731] mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Journey Steps */}
          <div className="space-y-8 mb-16">
            {journeySteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 hover:shadow-2xl transition-shadow duration-300">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="order-2 lg:order-1">
                      <div className="flex items-center mb-6">
                        <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center ml-4`}>
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="text-[#f7b731] font-bold text-lg mb-1">المستوى {step.number}</div>
                          <h3 className="text-2xl font-bold text-[#1a365d]">{step.title}</h3>
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-semibold text-[#560CAB] mb-4">{step.subtitle}</h4>
                      <p className="text-gray-700 leading-relaxed mb-6">{step.description}</p>
                      
                      <div className="grid grid-cols-1 gap-3">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 ml-2 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="order-1 lg:order-2">
                      <div className={`${step.color} rounded-3xl p-8 text-white text-center relative overflow-hidden`}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                        <div className="relative z-10">
                          <div className="text-6xl font-bold mb-4 opacity-90">{step.number}</div>
                          <step.icon className="w-20 h-20 mx-auto opacity-80" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrow between steps */}
                {index < journeySteps.length - 1 && (
                  <div className="flex justify-center my-8">
                    <ArrowRight className="w-8 h-8 text-[#f7b731] transform rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-br from-[#560CAB] to-[#1a365d] rounded-3xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold text-center mb-8">فوائد آلية الفلترة</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 text-[#f7b731]" />
                <h4 className="text-xl font-bold mb-3">ضمان الجودة</h4>
                <p className="opacity-90">التأكد من أن كل عميل يحصل على الخدمة المناسبة له</p>
              </div>
              <div className="text-center">
                <Target className="w-16 h-16 mx-auto mb-4 text-[#f7b731]" />
                <h4 className="text-xl font-bold mb-3">دقة التوجيه</h4>
                <p className="opacity-90">توجيه العملاء للمكان الصحيح بطريقة مسؤولة وأخلاقية</p>
              </div>
              <div className="text-center">
                <Clock className="w-16 h-16 mx-auto mb-4 text-[#f7b731]" />
                <h4 className="text-xl font-bold mb-3">توفير الوقت</h4>
                <p className="opacity-90">تحسين كفاءة الجلسات من خلال التحضير المسبق</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientJourney;