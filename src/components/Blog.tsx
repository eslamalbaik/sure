
import { Calendar, User, ArrowLeft } from 'lucide-react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "أهمية الفحص الدوري للوقاية من الأمراض",
      excerpt: "تعرف على أهمية إجراء الفحوصات الطبية الدورية ودورها في الكشف المبكر عن الأمراض والوقاية منها.",
      date: "15 ديسمبر 2024",
      author: "د. عبدالله الصبيعي",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "الوقاية"
    },
    {
      id: 2,
      title: "التغذية السليمة وأثرها على الصحة العامة",
      excerpt: "دليل شامل حول أسس التغذية الصحية وكيفية تأثيرها على جودة الحياة والصحة العامة للإنسان.",
      date: "10 ديسمبر 2024",
      author: "د. عبدالله الصبيعي",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "التغذية"
    },
    {
      id: 3,
      title: "إدارة الضغط النفسي والتوتر في الحياة اليومية",
      excerpt: "استراتيجيات عملية للتعامل مع ضغوط الحياة اليومية وتأثيرها على الصحة النفسية والجسدية.",
      date: "5 ديسمبر 2024",
      author: "د. عبدالله الصبيعي",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "الصحة النفسية"
    },
    {
      id: 4,
      title: "أحدث التطورات في الطب الحديث",
      excerpt: "نظرة على أحدث الابتكارات والتقنيات الطبية وكيف تساهم في تحسين جودة الرعاية الصحية.",
      date: "1 ديسمبر 2024",
      author: "د. عبدالله الصبيعي",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "تقنيات طبية"
    },
    {
      id: 5,
      title: "النوم الصحي وأثره على الأداء اليومي",
      excerpt: "أهمية الحصول على نوم كافٍ وجودته في تحسين الصحة العامة والأداء المهني والشخصي.",
      date: "25 نوفمبر 2024",
      author: "د. عبدالله الصبيعي",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "نمط الحياة"
    },
    {
      id: 6,
      title: "الوقاية من أمراض القلب والأوعية الدموية",
      excerpt: "نصائح علمية مهمة للوقاية من أمراض القلب والحفاظ على صحة الجهاز الدوري.",
      date: "20 نوفمبر 2024",
      author: "د. عبدالله الصبيعي",
      image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "أمراض القلب"
    }
  ];

  return (
    <section id="blog" className="py-16 bg-gradient-to-br from-[#1a365d] to-[#2d5a87]" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">المدونة الطبية</h2>
            <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
              مقالات ونصائح طبية من د. عبدالله الصبيعي لتعزيز الوعي الصحي والوقاية من الأمراض
            </p>
            <div className="w-24 h-1 bg-[#f7b731] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group hover:transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#f7b731] text-[#1a365d] px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1a365d] mb-3 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  <button className="flex items-center text-[#1a365d] hover:text-[#f7b731] font-semibold transition-colors group-hover:translate-x-1 transform duration-300">
                    <span className="ml-2">اقرأ المزيد</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-[#f7b731] hover:bg-[#e5a428] text-[#1a365d] px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
              عرض جميع المقالات
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
