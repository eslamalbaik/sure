
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "ما هي خدمات الاستشارات المتاحة؟",
      answer: "نقدم استشارات طبية متخصصة في مختلف المجالات الطبية، بما في ذلك الاستشارات العامة والتخصصية، مع توفير الإرشادات الطبية المناسبة لكل حالة."
    },
    {
      question: "كيف يمكنني حجز موعد للاستشارة؟",
      answer: "يمكنك حجز موعد من خلال ملء نموذج الاستشارة المتاح على الموقع، أو التواصل معنا مباشرة عبر الهاتف أو البريد الإلكتروني."
    },
    {
      question: "ما هي أوقات العمل؟",
      answer: "أوقات العمل من الأحد إلى الخميس من الساعة 9:00 صباحاً حتى 5:00 مساءً. نقدم أيضاً مواعيد خاصة حسب الحاجة."
    },
    {
      question: "هل تتوفر استشارات عن بُعد؟",
      answer: "نعم، نوفر خدمات الاستشارات الطبية عن بُعد من خلال منصات التواصل المختلفة لضمان وصول الخدمة لجميع المرضى."
    },
    {
      question: "ما هي تكلفة الاستشارة؟",
      answer: "تختلف تكلفة الاستشارة حسب نوع الخدمة والوقت المطلوب. للحصول على معلومات مفصلة حول الأسعار، يرجى التواصل معنا مباشرة."
    },
    {
      question: "هل يمكنني الحصول على تقرير طبي؟",
      answer: "نعم، نقدم تقارير طبية مفصلة بعد الاستشارة تتضمن التشخيص والتوصيات العلاجية المناسبة."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-gradient-to-br from-gray-50 to-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#1a365d]">الأسئلة الشائعة</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              إجابات على الأسئلة الأكثر شيوعاً حول خدماتنا الطبية
            </p>
            <div className="w-24 h-1 bg-[#f7b731] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-right flex items-center justify-between focus:outline-none"
                >
                  <h3 className="text-lg font-semibold text-[#1a365d] flex-1">
                    {item.question}
                  </h3>
                  <div className="mr-4 text-[#f7b731]">
                    {openItems.includes(index) ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </button>

                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
