import React from 'react';
import { Link } from 'react-router-dom';
import shorLogo from '/assets/logonew.png'


const AboutShor = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">عن شور</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            بوصلتك في زمن التحديات
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        
        {/* Vision Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 transform hover:scale-105 transition duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center ml-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">رؤيتنا</h2>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              في شور، نؤمن أن كل إنسان يستحق من يستمع إليه، لا من يقوده أو يفرض عليه طريقًا. رؤيتنا أن نكون "بوصلتك في زمن التحديات"، نرافقك بخبرة ووعي، ونساعدك على أن ترى الصورة كاملة، وتبني قراراتك بثقة وسلام.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 transform hover:scale-105 transition duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center ml-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">رسالتنا</h2>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              رسالتنا تتجسد في تقديم استشارات متخصصة تدعمك في تجاوز العقبات النفسية والشخصية، وبناء علاقات أعمق، وحياة أكثر اتزانًا ورضا.
            </p>
          </div>
        </section>

        {/* Why Shor Section */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">لماذا "شور"؟</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition duration-300">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <p className="text-lg font-semibold text-gray-800">نحن لا نعالجك، بل نرافقك</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition duration-300">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👁️</span>
                </div>
                <p className="text-lg font-semibold text-gray-800">لا نوجهك، بل نساعدك على أن ترى الطريق بنفسك</p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition duration-300">
                <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛠️</span>
                </div>
                <p className="text-lg font-semibold text-gray-800">لا نطرح حلولاً جاهزة، بل نعمل معك لتصمم حلك الخاص</p>
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Areas */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">مجالات الاستشارة</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "مهارات تعزيز التواصل الفعّال",
                "إعادة بناء الثقة في العلاقات",
                "التكيف مع تحديات الحياة اليومية",
                "إدارة النزاعات المهنية والشخصية",
                "معالجة الخلافات المتكررة"
              ].map((area, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
                  <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center ml-4">
                    <span className="text-purple-700 font-bold">✓</span>
                  </div>
                  <span className="text-lg text-gray-800">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-xl p-8 md:p-12 text-white">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center ml-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">خبراتنا</h2>
            </div>
            <p className="text-lg md:text-xl leading-relaxed">
              يقود "شور" البروفيسور د. عبدالله السبيعي، أحد أبرز المتخصصين في الطب النفسي في الوطن العربي، بخبرة تزيد عن 30 عامًا، وأكثر من 94 بحثًا علميًا منشورًا، ومؤلفات أثرت المكتبة النفسية العربية.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              🎯 في شور، نحن لا نقدم مجرد استشارات…
            </p>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
              نحن نمضي معك خطوة بخطوة نحو التمكين النفسي والوضوح الداخلي
            </p>
            <p className="text-xl md:text-2xl font-bold text-purple-700 mb-8">
              📅 احجز استشارتك الآن، وابدأ رحلتك نحو حياة أكثر توازنًا
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href='/#consultation'  className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-4 px-8 rounded-xl text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                احجز الآن
              </a>
              <a href='/about' className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-8 rounded-xl text-xl transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                اعرف المزيد عن الدكتور عبدالله السبيعي
              </a>
            </div>
          </div>
        </section>
      </div>

    
    </div>
  );
};

export default AboutShor;




