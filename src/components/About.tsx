
import { GraduationCap, Briefcase, Target, HeartHandshake, Compass, Star, TrendingUp, Users, MessagesSquare, SquareLibrary, Feather, Cannabis, HandHeart, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';


const AboutSection = () => {


  const features = [
    {
      title: 'مهارات تعزيز التواصل',
      icon: <MessagesSquare className="w-7 h-7 text-white" />,
    },
    {
      title: 'إعادة بناء الثقة',
      icon: <HeartHandshake className="w-7 h-7 text-white" />,
    },
    {
      title: 'استشارات حول الخلافات المتكررة',
      icon: <Users className="w-7 h-7 text-white" />,
    },
    {
      title: 'مهارات التكيف مع التحولات',
      icon: <Compass className="w-7 h-7 text-white" />,
    },
    {
      title: 'إدارة النزاعات',
      icon: <Users className="w-7 h-7 text-white" />,
    },
  ];
  return (
    <section id="about" className="py-20 bg-gray-50 ">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto flex-row-reverse">
          <div className="text-center mb-16">
            <h2 className="text-4xl  font-bold text-[#1a365d] mb-6">
              عن البروفيسور  عبدالله السبيعي
            </h2>

            <div className="w-24 h-1 bg-[#f7b731] mx-auto mt-6 rounded-full"></div>
          </div>
              <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"> */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-center lg:text-right text-[#1a365d] mb-8">
                المؤهلات والخبرات
              </h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#560CAB] rounded-full flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#1a365d]">المؤهلات الأكاديمية</h4>
                    <p className="text-gray-600">زمالة الطب النفسي من الكلية الملكية للأطباء النفسيين - كندا</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#f7b731] rounded-full flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#1a365d]">استشاري مرخص</h4>
                    <p className="text-gray-600">استشاري الطب النفسي في مركز إدراك للاستشارات الطبية
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#560CAB] rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#1a365d]">خبرة متخصصة</h4>
                    <p className="text-gray-600">
                      أكثر من 30 سنة في الطب النفسي والتعليم والتدريب الطبي
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#f7b731] rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#1a365d]">الإنجازات العلمية</h4>
                    <p className="text-gray-600 ">
+94 بحثاً  علمياً منشوراً في شتى المجالات  الصحية ، والنفسية ، والاجتماعية
</p>
                  </div>

                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-[#560CAB] rounded-full flex items-center justify-center flex-shrink-0">
                    <SquareLibrary className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-[#1a365d]">المؤلفات</h4>
                    <p className="text-gray-600 ">مؤلف كتابي: "إن كنت خجولاً عالج نفسك بنفسك" و"صناعة النجاح".

                    </p>
                  </div>

                </div>
                <div className="pt-4">
                  <a href="/about">
                    <Button
                      className="group bg-[#560CAB] hover:bg-[#560CAB]/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      اقرأ المزيد عن الدكتور
                      <ArrowLeft
                        className="w-4 h-4 mr-2 transition-transform duration-300 group-active:-translate-x-1"
                      />
                    </Button>

                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">

                <img
                  src='/assets/doc.jpg'
                  alt="Dr. Abdullah Al-Subaie"
                  className="w-full h-[400px] object-cover rounded-2xl mb-6"
                />
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-[#1a365d] mb-2">
                    ا.د.عبدالله بن سلطان السبيعي
                  </h4>
                  <p className="text-[#f7b731] font-semibold mb-4">
                    استشاري وبروفيسور  الطب النفسي
                  </p>
                </div>
              </div>

              {/* Floating Elements */}
              {/* <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#f7b731] rounded-full flex items-center justify-center shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#560CAB] rounded-full flex items-center justify-center shadow-lg">
                <Feather className="w-6 h-6 text-white" />
              </div> */}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#f7b731]/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#560CAB]/10 rounded-full translate-y-20 -translate-x-20"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-[#560CAB] mb-6 text-center">
                رؤيتنا ورسالتنا
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-8">
                أن نكون "بوصلتك في زمن التحديات" و رسالتنا  هي المساعدة في بناء علاقات أعمق، لتجاوز تحديات الحياة بثقة وسلام.

              </p>
            </div>
          </div>
          <div className="text-center mt-24 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a365d] mb-6">
              مجال عملنا
            </h2>
            <div className="w-24 h-1 bg-[#f7b731] mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-[#560CAB] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-[#560CAB] mb-2">مهارات تعزيز التواصل. </h4>
              {/* <p className="text-gray-600 text-sm">تشخيص شامل لحالة المستفيد النفسية والسلوكية</p> */}
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-[#f7b731] rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-[#560CAB] mb-2">مهارات إعادة بناء الثقة</h4>
              {/* <p className="text-gray-600 text-sm">خطط علاجية تضمن تطورًا نفسيًا طويل الأمد</p> */}
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-[#560CAB] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-[#560CAB] mb-2">استشارات في التعامل مع الخلافات المتكررة</h4>
              {/* <p className="text-gray-600 text-sm">نُقدّم الدعم كجزء من علاقة إنسانية مهنية وآمنة</p> */}
            </div>
          </div>
          <div className="flex justify-center flex-wrap items-center mt-8 gap-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-[#560CAB] rounded-full flex items-center justify-center mx-auto mb-4">
                <HandHeart className="w-8 h-8 overflow-hidden text-white" />
              </div>
              <h4 className="font-semibold text-[#560CAB] mb-2">مهارات التكيف مع تحديات الحياة </h4>
            </div>
            <div className="text-center p-4 ">
              <div className="w-16 h-16 bg-[#f7b731] rounded-full flex items-center justify-center mx-auto mb-4">
                <Cannabis className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-[#560CAB] mb-2">إدارة النزاعات في العمل والعلاقات.</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
