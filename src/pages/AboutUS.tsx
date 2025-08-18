
import { GraduationCap, Briefcase, Target, Star, TrendingUp, Users, Feather, SquareLibrary, Calendar, Play, X, Award, BookOpen, Video, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useState } from "react";

const AboutPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSpinning(false);
    }, 1000); // الدوران لمدة 3 ثوانٍ

    return () => clearTimeout(timer);
  }, []);
  const mediaContributions = [
    {
      title: "الصحة النفسية والتوازن الحياتي",
      url: "https://youtu.be/Ggq2-z6bsyc?si=WZxDuql0yZa27JPT",
      thumbnail: "https://img.youtube.com/vi/Ggq2-z6bsyc/maxresdefault.jpg"
    },
    {
      title: "إدارة القلق والضغوط النفسية",
      url: "https://youtu.be/_9JnVZEYNR8?si=f2jiPVIHNsdoNt6v",
      thumbnail: "https://img.youtube.com/vi/_9JnVZEYNR8/maxresdefault.jpg"
    },
    {
      title: "العلاقات الإنسانية والصحة النفسية",
      url: "https://youtu.be/FQl-WoENgBc?si=KRPnIv5sqFsvYI3c",
      thumbnail: "https://img.youtube.com/vi/FQl-WoENgBc/maxresdefault.jpg"
    },
    {
      title: "التطوير الذاتي وبناء الثقة",
      url: "https://youtu.be/P5kgoG9zFzM?si=Vq-Su2Yi7Gp_M6AC",
      thumbnail: "https://img.youtube.com/vi/P5kgoG9zFzM/maxresdefault.jpg"
    },
    {
      title: "الصحة النفسية في مكان العمل",
      url: "https://youtu.be/yHaq267eDI8?si=736lQ9mez35eNNlk",
      thumbnail: "https://img.youtube.com/vi/yHaq267eDI8/maxresdefault.jpg"
    },
    {
      title: "التعامل مع اضطرابات الأكل",
      url: "https://youtu.be/nU3qQPYhfTo?si=8ORlCHRWZHFgnIlV",
      thumbnail: "https://img.youtube.com/vi/nU3qQPYhfTo/maxresdefault.jpg"
    }
  ];

  const scrollToConsultation = () => {
    window.location.href = '/#consultation';
  };

  const openVideo = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : '';
  };

  return (
    <div className=" min-h-screen bg-gray-50" dir="rtl">
      
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#560CAB] via-[#1e2635] to-[#1a202c] text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-[#f7b731] rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#560CAB] rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-7xl mx-auto">
            {/* Main Title */}
            <div className=" text-center mb-16 animate-fade-in">
              {/* <div className="inline-flex items-center justify-center w-20 h-20  rounded-full mb-6">
               <img src="/assets/verficated.png" alt="verficated" />
              </div> */}
         <div className='flex justify-center items-center'>
               <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text ">
                من هو د. عبدالله ؟
              </h1>
                   <div className="w-9 h-9 rounded-full mb-6">
      <img
        src="/assets/verficated.png"
        alt="verficated"
        className={`w-full h-full ${spinning ? "animate-spin" : ""} transition-transform duration-500 ease-in-out`}
      />
    </div>
         </div>
              <div className="w-32 h-1 bg-gradient-to-r from-[#f7b731] to-[#560CAB] mx-auto rounded-full"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Content */}
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-6">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#f7b731] leading-tight">
                    ا.د. عبدالله بن سلطان السبيعي
                  </h2>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <p className="text-lg md:text-xl leading-relaxed opacity-95">
                      استشاري وبروفيسور الطب النفسي في "مركز إدراك للاستشارات الطبية"، المملكة العربية السعودية
                    </p>
                  </div>
                  
                  {/* Key Highlights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white/5 rounded-xl p-4">
                      <Clock className="w-6 h-6 text-[#f7b731] flex-shrink-0" />
                      <span className="text-sm md:text-lg">+30 سنة خبرة</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white/5 rounded-xl p-4">
                      <BookOpen className="w-6 h-6 text-[#f7b731] flex-shrink-0" />
                      <span className="text-sm md:text-lg">+94  بحث علمي</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white/5 rounded-xl p-4">
                      <Award className="w-6 h-6 text-[#f7b731] flex-shrink-0" />
                      <span className="text-sm md:text-lg">زمالة كندية</span>
                    </div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse bg-white/5 rounded-xl p-4">
                      <Users className="w-6 h-6 text-[#f7b731] flex-shrink-0" />
                      <span className="text-sm md:text-lg">آلاف المستفيدين</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={scrollToConsultation}
                  size="lg" 
                  className="bg-[#f7b731] hover:bg-[#f7b731]/90 text-[#1a365d] px-6 md:px-10 py-4 md:py-6 text-lg md:text-xl font-bold rounded-full shadow-2xl hover:shadow-[#f7b731]/25 transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
                >
                  احجز استشارة الآن
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 ml-3" />
                </Button>
              </div>

              {/* Image Section */}
              <div className="relative animate-fade-in">
                <div className="relative">
                  {/* Main Image Container */}
                  <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg p-6 md:p-8 rounded-3xl border border-white/20 shadow-2xl">
                    <img 
                      src='/assets/doc.jpg'
                      alt="د. عبدالله السبيعي"
                      className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                  {/* Achievement Badge */}
                  <div>
                  </div>
                  <div className="absolute top-4 left-4 bg-[#1a365d] rounded-2xl p-3 md:p-4 shadow-xl">
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-[#f7b731]">30+</div>
                      <div className="text-xs md:text-sm text-white">سنة خبرة</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
  
      </section>
      <br />
      <br />
      <br />
      <br />
      <br />
<div className='relative md:hidden'>
     <div className="absolute bottom-0 left-0 right-0">
  <svg
    viewBox="0 0 1200 120"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-auto"
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1a202c" />
        <stop offset="50%" stopColor="#1e2635" />
        <stop offset="100%" stopColor="#1a202c" />
      </linearGradient>
    </defs>
    <path
      d="M0,0V120L1200,60V0H0Z"
      fill="url(#wave-gradient)"
    />
  </svg>
</div>
</div>
      {/* Professional Background with Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Professional Overview */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-12 mb-16">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-4xl font-bold text-[#1a365d] mb-6">
                  النبذة المهنية
                </h3>
                <div className="w-24 h-1 bg-[#f7b731] mx-auto rounded-full"></div>
              </div>
            {/* Professional Positions Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {[
                {
                  icon: "🏥",
                  title: "استشاري وبروفيسور الطب النفسي",
                  organization: "مركز إدراك للاستشارات الطبية",
                  location: "المملكة العربية السعودية",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: "🧠",
                  title: "استشاري ومدرب",
                  organization: "مركز معرفي",
                  location: "",
                  color: "from-green-500 to-green-600"
                },
                {
                  icon: "🌐",
                  title: "المشرف العام",
                  organization: "موقع النفسي",
                  location: "",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  icon: "🏛️",
                  title: "مؤسس",
                  organization: "المجلس السعودي للطب النفسي",
                  location: "",
                  color: "from-indigo-500 to-indigo-600"
                },
                {
                  icon: "🔬",
                  title: "مؤسس",
                  organization: "كرسي أبحاث وتطبيقات الصحة النفسية",
                  location: "جامعة الملك سعود",
                  color: "from-teal-500 to-teal-600"
                },
                {
                  icon: "🎓",
                  title: "عضو مؤسس",
                  organization: "كلية الطب",
                  location: "جامعة الإمام محمد بن سعود الإسلامية",
                  color: "from-orange-500 to-orange-600"
                }
              ].map((position, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${position.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-xl text-white">{position.icon}</span>
                  </div>
                  <h5 className="font-bold text-gray-800 mb-2 text-sm md:text-base">
                    {position.title}
                  </h5>
                  <p className="text-gray-600 text-sm mb-1 font-medium">
                    {position.organization}
                  </p>
                  {position.location && (
                    <p className="text-gray-500 text-xs">
                      {position.location}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Professional Memberships */}
            <div className="mt-12 relative z-10">
              <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
                العضويات المهنية
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    name: "الجمعية الأميركية للأطباء النفسيين",
                    icon: "🇺🇸",
                    type: "عضو"
                },
                  {
                    name: "الاتحاد الإسلامي للأطباء النفسيين",
                    icon: "🕌",
                    type: "عضو"
                  },
                  {
                    name: "الجمعية السعودية للطب النفسي",
                    icon: "🇸🇦",
                    type: "عضو"
                  }
                ].map((membership, index) => (
                  <div 
                    key={index}
                    className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-purple-50 hover:to-blue-50 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300 ml-3">
                      <span className="text-lg">{membership.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {membership.type}
                      </p>
                      <p className="text-xs text-gray-600">
                        {membership.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>



            </div>

            {/* Qualifications & Achievements */}
            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1a365d] mb-6 text-center">
                  المؤهلات الأكاديمية
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-xl">
                    <GraduationCap className="w-6 h-6 md:w-8 md:h-8 text-[#560CAB] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm md:text-base">بكالوريوس الطب والجراحة</p>
                      <p className="text-xs md:text-sm text-gray-600">جامعة الملك عبد العزيز - 1982</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-xl">
                    <Award className="w-6 h-6 md:w-8 md:h-8 text-[#f7b731] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm md:text-base">زمالة الطب النفسي</p>
                      <p className="text-xs md:text-sm text-gray-600">الكلية الملكية للأطباء النفسيين - كندا 1989</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1a365d] mb-6 text-center">
                  الإنجازات العلمية
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-xl">
                    <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-[#560CAB] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm md:text-base">+94  بحثاً علمياً منشوراً</p>
                      <p className="text-xs md:text-sm text-gray-600">في مجالات اضطرابات الأكل والتدخين والأمراض النفسية</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-xl">
                    <SquareLibrary className="w-6 h-6 md:w-8 md:h-8 text-[#f7b731] flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm md:text-base">مؤلف كتابين</p>
                      <p className="text-xs md:text-sm text-gray-600">"إن كنت خجولاً عالج نفسك بنفسك" و"صناعة النجاح"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Media Contributions */}
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-12 mb-16">
              <h3 className="text-2xl md:text-4xl font-bold text-[#1a365d] mb-8 text-center">
                المساهمات الإعلامية
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaContributions.map((video, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => openVideo(getVideoId(video.url))}>
                    <div className="relative">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-32 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-8 h-8 md:w-12 md:h-12 text-white" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-[#1a365d] mb-2 text-sm md:text-base">{video.title}</h4>
                      <p className="text-xs md:text-sm text-gray-600 flex items-center">
                        <Video className="w-3 h-3 md:w-4 md:h-4 ml-2" />
                        مشاهدة الحلقة
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vision & Mission */}
            {/* <div className="bg-gradient-to-br from-[#560CAB] to-[#1a365d] text-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-12 mb-16">
              <h3 className="text-2xl md:text-4xl font-bold mb-8 text-center">
                الرؤية والرسالة
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <Target className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-[#f7b731]" />
                  <h4 className="text-xl md:text-2xl font-bold mb-4">رؤيتنا</h4>
                  <p className="leading-relaxed opacity-90 text-sm md:text-base">
                    تقديم دعم نفسي متخصص ومتكامل، يركز على تمكين الأفراد من تجاوز التحديات النفسية وبناء حياة متوازنة وصحية
                  </p>
                </div>
                <div className="text-center">
                  <Users className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-[#f7b731]" />
                  <h4 className="text-xl md:text-2xl font-bold mb-4">رسالتنا</h4>
                  <p className="leading-relaxed opacity-90 text-sm md:text-base">
                    تقديم خدمات علاجية واستشارية مهنية من خلال فهم دقيق للحالة وخطط علاجية تضمن تطوراً نفسياً طويل الأمد
                  </p>
                </div>
              </div>
            </div> */}

            {/* CTA Section */}
            <div className="bg-[#f7b731] rounded-3xl p-6 md:p-8 lg:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-[#1a365d] mb-6">
                هل تحتاج للدعم النفسي المتخصص؟
              </h3>
              <p className="text-lg md:text-xl text-[#1a365d] mb-8 opacity-90">
                احجز استشارتك الآن واحصل على الدعم المهني الذي تستحقه
              </p>
              <Button 
                onClick={scrollToConsultation}
                size="lg" 
                className="bg-[#1a365d] hover:bg-[#1a365d]/90 text-white px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-bold rounded-full w-full md:w-auto"
              >
                <Calendar className="w-5 h-5 md:w-6 md:h-6 ml-2" />
                احجز استشارة 
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">مشاهدة الحلقة</h3>
              <button onClick={closeVideo} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AboutPage;