
// import { GraduationCap, Briefcase, Target,HeartHandshake,Compass, Star, TrendingUp, Users, MessagesSquare,SquareLibrary,ChevronDown ,Cannabis,HandHeart  } from 'lucide-react';
// import p5 from '/assets/droctor.jpg';
import { clsx } from 'clsx';
// import { useState } from "react";


// const AboutUS = () => {
//   const features = [
//     {
//       title: 'مهارات تعزيز التواصل',
//       icon: <MessagesSquare className="w-7 h-7 text-white" />,
//     },
//     {
//       title: 'إعادة بناء الثقة',
//       icon: <HeartHandshake className="w-7 h-7 text-white" />,
//     },
//     {
//       title: 'استشارات حول الخلافات المتكررة',
//       icon: <Users className="w-7 h-7 text-white" />,
//     },
//     {
//       title: 'مهارات التكيف مع التحولات',
//       icon: <Compass className="w-7 h-7 text-white" />,
//     },
//     {
//       title: 'إدارة النزاعات',
//       icon: <Users className="w-7 h-7 text-white" />,
//     },
//   ];
//   return (
//     <section id="about" className="py-20 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl  font-bold text-[#1a365d] mb-6">
//               عن البروفيسور  عبدالله السبيعي
//             </h2>
//             {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
// استشاري وبروفيسور الطب النفسي في "مركز إدراك للاستشارات الطبية"، المملكة العربية السعودية.
//             </p> */}
//                         <div className="w-24 h-1 bg-[#f7b731] mx-auto mt-6 rounded-full"></div>

//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
//             <div className="space-y-8">
//               <h3 className="text-3xl font-bold text-[#1a365d] mb-8">
//                 المؤهلات والخبرات
//               </h3>
              
//               <div className="space-y-6">
//                 <div className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                   <div className="w-12 h-12 bg-[#560CAB] rounded-full flex items-center justify-center flex-shrink-0">
//                     <GraduationCap className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-lg text-[#1a365d]">المؤهلات الأكاديمية</h4>
//                     <p className="text-gray-600">زمالة في الطب النفسي من الكلية الملكية للأطباء النفسيين - كندا</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                   <div className="w-12 h-12 bg-[#f7b731] rounded-full flex items-center justify-center flex-shrink-0">
//                     <Briefcase className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-lg text-[#1a365d]">استشاري معتمد</h4>
//                     <p className="text-gray-600">.استشاري الطب النفسي في مركز إدراك للإستشارات".
// </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                   <div className="w-12 h-12 bg-[#560CAB] rounded-full flex items-center justify-center flex-shrink-0">
//                     <Target className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-lg text-[#1a365d]">خبرة متخصصة</h4>
//                     <p className="text-gray-600">أكثر من 30 سنة في الطب النفسي</p>
//                   </div>
//                 </div>

//                 <div className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                   <div className="w-12 h-12 bg-[#f7b731] rounded-full flex items-center justify-center flex-shrink-0">
//                     <Star className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-lg text-[#1a365d]">الإنجازات العلمية</h4>
//                     <p className="text-gray-600 ">+٩٤  بحثاً علمياً منشوراً في مجالات: اضطرابات الأكل، التدخين، والأمراض النفسية.</p>
//                   </div>
                      
//                 </div>

//                  <div className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
//                   <div className="w-12 h-12 bg-[#560CAB] rounded-full flex items-center justify-center flex-shrink-0">
//                     <SquareLibrary  className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h4 className="font-semibold text-lg text-[#1a365d]">المؤلفات</h4>
//                     <p className="text-gray-600 ">مؤلف كتابي: "إن كنت خجولاً عالج نفسك بنفسك" و"صناعة النجاح".

// </p>
//                   </div>
                      
//                 </div>
 
//               </div>
//             </div>

//             <div className="relative">
//               <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
//                 <img 
//                   src={p5}
//                   alt="Dr. Abdullah Al-Subaie"
//                   className="w-full h-[400px] object-cover rounded-2xl mb-6"
//                 />
//                 <div className="text-center">
//                   <h4 className="text-2xl font-bold text-[#1a365d] mb-2">
//                    ا.د.عبدالله بن سلطان السبيعي
//                   </h4>
//                   <p className="text-[#f7b731] font-semibold mb-4">
// استشاري وبروفيسور متخصص في الطب النفسي
//                   </p>
//                   {/* <div className="flex justify-center space-x-1">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star key={star} className="w-5 h-5 fill-[#f7b731] text-[#f7b731]" />
//                     ))}
//                   </div> */}
//                 </div>
//               </div>
              
//               {/* Floating Elements */}
//               <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#f7b731] rounded-full flex items-center justify-center shadow-lg">
//                 <Star className="w-10 h-10 text-white" />
//               </div>
//               <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#560CAB] rounded-full flex items-center justify-center shadow-lg">
//                 <MessagesSquare  className="w-8 h-8 text-white" />
//               </div>
//             </div>
//           </div>

  

//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutUS;
import { useState } from 'react';
import { GraduationCap, Briefcase, Target, Star, TrendingUp, Users, MessagesSquare, SquareLibrary, Calendar, Play, X, Award, BookOpen, Video, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import p5 from '/assets/droctor.jpg';

const AboutPage = () => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

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

  // const timeline = [
  //   {
  //     year: "2012",
  //     title: "المشرف على كرسي أبحاث وتطبيقات الصحة النفسية",
  //     institution: "جامعة الملك سعود",
  //     icon: Target,
  //     color: "bg-[#560CAB]"
  //   },
  //   {
  //     year: "2001",
  //     title: "أستاذ الطب النفسي",
  //     institution: "جامعة الملك سعود",
  //     icon: GraduationCap,
  //     color: "bg-[#f7b731]"
  //   },
  //   {
  //     year: "1996",
  //     title: "رئيس قسم الطب النفسي",
  //     institution: "مستشفى الملك فهد للحرس الوطني",
  //     icon: Briefcase,
  //     color: "bg-[#560CAB]"
  //   },
  //   {
  //     year: "1990-1995",
  //     title: "رئيس قسم الطب النفسي",
  //     institution: "مستشفى الملك خالد الجامعي",
  //     icon: Star,
  //     color: "bg-[#f7b731]"
  //   },
  //   {
  //     year: "1990-1995",
  //     title: "رئيس نادي الطب النفسي والعلوم السلوكية",
  //     institution: "جامعة الملك سعود",
  //     icon: Users,
  //     color: "bg-[#560CAB]"
  //   },
  //   {
  //     year: "1993",
  //     title: "استشاري الطب النفسي",
  //     institution: "مستشفى الملك خالد الجامعي",
  //     icon: Award,
  //     color: "bg-[#f7b731]"
  //   },
  //   {
  //     year: "1989",
  //     title: "زمالة الطب النفسي",
  //     institution: "الكلية الملكية للأطباء النفسيين - كندا",
  //     icon: GraduationCap,
  //     color: "bg-[#560CAB]"
  //   },
  //   {
  //     year: "1982",
  //     title: "بكالوريوس الطب والجراحة",
  //     institution: "جامعة الملك عبد العزيز",
  //     icon: BookOpen,
  //     color: "bg-[#f7b731]"
  //   }
  // ];

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
                  <div className="w-12 h-12  rounded-full mb-6">
               <img src="/assets/verficated.png" alt="verficated" />
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
                      <span className="text-sm md:text-lg">+25 بحث علمي</span>
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
                  <Calendar className="w-5 h-5 md:w-6 md:h-6 ml-3" />
                  احجز استشارة الآن
                </Button>
              </div>

              {/* Image Section */}
              <div className="relative animate-fade-in">
                <div className="relative">
                  {/* Main Image Container */}
                  <div className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-lg p-6 md:p-8 rounded-3xl border border-white/20 shadow-2xl">
                    <img 
                      src={p5}
                      alt="د. عبدالله السبيعي"
                      className="w-full h-[300px] md:h-[500px] object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-16 h-16 md:w-24 md:h-24 bg-[#f7b731] rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    <Star className="w-8 h-8 md:w-12 md:h-12 text-[#1a365d]" />
                  </div>
                  <div className="absolute -bottom-4 md:-bottom-6 -left-4 md:-left-6 w-14 h-14 md:w-20 md:h-20 bg-[#560CAB] rounded-full flex items-center justify-center shadow-2xl">
                    <MessagesSquare className="w-7 h-7 md:w-10 md:h-10 text-white" />
                  </div>
                  
                  {/* Achievement Badge */}
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
<div className='relative'>
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
              
              <div className="text-base md:text-lg text-gray-700 leading-relaxed space-y-6 mb-12">
                <p>
                  استشاري وبروفيسور الطب النفسي في "مركز إدراك للاستشارات الطبية"، المملكة العربية السعودية. 
                  وهو استشاري ومدرب في "مركز معرفي"، والمشرف العام على موقع النفسي"، كما أنه مؤسس كل من "المجلس السعودي للطب النفسي"، 
                  و"كرسي أبحاث وتطبيقات الصحة النفسية" في "جامعة الملك سعود، وعضو مؤسس في كلية الطب في جامعة الإمام محمد بن سعود الإسلامية".
                </p>
                <p>
                  يشغل عضوية كل من "الجمعية الأميركية للأطباء النفسيين"، و"الاتحاد الإسلامي للأطباء النفسيين"، و"الجمعية السعودية للطب النفسي".
                </p>
              </div>

              {/* Timeline - Fully Responsive */}
              {/* <div className="relative">
                <h4 className="text-xl md:text-2xl font-bold text-[#1a365d] mb-8 text-center">المسيرة المهنية</h4>
                
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#560CAB] to-[#f7b731] rounded-full"></div>
                
                <div className="block md:hidden absolute right-6 top-0 h-full w-1 bg-gradient-to-b from-[#560CAB] to-[#f7b731] rounded-full"></div>
                
                <div className="space-y-6 md:space-y-8">
                  {timeline.map((item, index) => (
                    <div key={index} className={`relative ${
                      // Mobile: all items aligned to the left
                      // Desktop: alternating alignment
                      index % 2 === 0 
                        ? 'md:flex md:flex-row-reverse' 
                        : 'md:flex'
                    } flex`}>
                      
                      <div className="block md:hidden absolute right-6 transform translate-x-1/2 w-4 h-4 bg-white border-4 border-[#560CAB] rounded-full z-10 top-6"></div>
                      
                      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-[#560CAB] rounded-full z-10 top-6"></div>
                      
                      <div className={`w-full md:w-5/12 pr-12 md:pr-0 ${
                        index % 2 === 0 
                          ? 'md:text-right md:pr-8' 
                          : 'md:text-left md:pl-8'
                      }`}>
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse mb-3 flex-wrap">
                            <div className={`w-10 h-10 md:w-12 md:h-12 ${item.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                              <item.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div className="bg-[#f7b731] text-[#1a365d] px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold">
                              {item.year}
                            </div>
                          </div>
                          <h5 className="font-bold text-[#1a365d] mb-2 text-base md:text-lg leading-tight">{item.title}</h5>
                          <p className="text-gray-600 flex items-start text-sm md:text-base">
                            <MapPin className="w-4 h-4 ml-2 text-[#560CAB] flex-shrink-0 mt-0.5" />
                            <span>{item.institution}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="hidden md:block md:w-5/12"></div>
                    </div>
                  ))}
                </div>
              </div> */}
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
                      <p className="font-semibold text-sm md:text-base">+25 بحثاً علمياً منشوراً</p>
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
            <div className="bg-gradient-to-br from-[#560CAB] to-[#1a365d] text-white rounded-3xl shadow-xl p-6 md:p-8 lg:p-12 mb-16">
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
            </div>

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