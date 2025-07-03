
import { Calendar, User, ArrowLeft } from 'lucide-react';

const Blog = () => {
const blogPosts = [
  {
    id: 1,
    title: "هل يمكن العيش بلا هموم؟",
    excerpt: "يأتيني في العيادة كثير ممن يعانون من القلق والخوف الذي يفسد حياتهم ويعيق تحقيق كثير من أمورهم.",
    date: "1 يوليو 2025",
    image: "https://media.caramel.la/-28FLAChc?e=0,0,1080,996&f=webp&r=2304",
    author: "د. عبدالله السبيعي",
    category: "القلق",
    url:"https://profsubaie.com/7sGyFElBL/hl-ymkn-alaysh-bla-hmwm"
  },
  {
    id: 2,
    title: "كن سعيداً وانشر السعادة",
    excerpt: "يأتيني في العيادة الكثير من الناس يشكون من السأم أو فقدان الشغف أو ربما الشعور بالضيق والكآبة.",
    date: "28 يونيو 2025",
    author: "د. عبدالله السبيعي",
    image: "/assets/blog1.webp",
    category: "السعادة",
    url:"https://profsubaie.com/zclovW_A7/kn-saydaan-wanshr-alsaadh"
  },
  {
    id: 3,
    title: "غيبوبة رمضان واضطرابات النوم",
    excerpt: "اضطرابات النوم تحدث عندما تكون (الساعة البيولوجية) غير متزامنة مع البيئة الخارجية، وهذا تماماً ما يحدث في رمضان.",
    date: "20 يونيو 2025",
    author: "د. عبدالله السبيعي",
    image: "https://media.caramel.la/VglEEjZ4R?e=0,0,704,528&f=webp&r=480",
    category: "النوم"  ,
    url:"https://profsubaie.com/H8U2draZM/ghybwbh-rmdhan-hlwl-amlyh"
  },
  {
    id: 4,
    title: "وسائل التواصل الاجتماعي: ما لها وما عليها",
    excerpt: "لا أحد ينكر أن لوسائل التواصل الاجتماعي دور واضح في حياتنا اليومية… إلا أن له أثرٌ سلبيٌ يفوق ذلك بكثير.",
    date: "12 يونيو 2025",
    author: "د. عبدالله السبيعي",
    image: "https://media.caramel.la/xvzBhog7O?e=0,0,1024,748&f=webp&r=480",
    category: "سلوك اجتماعي",
    url:"https://profsubaie.com/SlwcYFHcw/wsael-altwasl-alajtmaay-ma-lha-wma-alyha"
  },
  {
    id: 5,
    title: "أفكار للترابط الأسري",
    excerpt: "الكل مشغول بالعمل وزحام المواصلات والأبناء في مدارسهم… أما عطلة نهاية الأسبوع فمخطط لها بعض الأعمال المؤجلة أو تبقى زيارة الأجداد هي المتنفس الوحيد.",
    date: "5 يونيو 2025",
    author: "د. عبدالله السبيعي",
    image: "https://media.caramel.la/LowDmBi3E?e=0,0,1024,710&f=webp&r=2304",
    category: "العلاقات الأسرية",
    url:"https://profsubaie.com/2D381Od0k/afkar-lltrabt-alasry"
  },
  {
    id: 6,
    title: "إدمان المواد الإباحية",
    excerpt: "إدمان الإباحية، يعرف أيضا باسم \"استخدام المواد الإباحية القهري\" وهو نمط من السلوك حيث يواجه المرء صعوبة كبيرة في السيطرة.",
    date: "28 مايو 2025",
    author: "د. عبدالله السبيعي",
    image: "https://media.caramel.la/xr9sLI5wT?e=0,0,704,528&f=webp&r=480",
    category: "الإدمان",
    url:"https://profsubaie.com/AlhoPF_BA/idman-almwad-alibahyh"
  }
];


  return (
    <section id="blog" className="py-16 bg-gradient-to-br from-[#1a365d] to-[#2d5a87]" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">مدونة كبسولة</h2>
            <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
              مقالات ونصائح طبية من د. عبدالله السبيعي لتعزيز الوعي الصحي والوقاية من الأمراض
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
           <a href={post.url} target='_blank'>
                  <button className="flex items-center text-[#1a365d] hover:text-[#f7b731] font-semibold transition-colors group-hover:translate-x-1 transform duration-300">
                    <span className="ml-2">اقرأ المزيد</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
           <a href="https://profsubaie.com/" target='_blank'>
                <button className="bg-[#f7b731] hover:bg-[#e5a428] text-[#1a365d] px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl">
              عرض جميع المقالات
            </button>
           </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
