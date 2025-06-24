
import { Button } from '@/components/ui/button';
import { Calendar, Award, Users } from 'lucide-react';

const Hero = () => {
  const scrollToConsultation = () => {
    const element = document.getElementById('consultation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="bg-gradient-to-br from-[#1a365d] via-[#2d3748] to-[#1a202c] text-white py-20 lg:py-32" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in leading-tight">
                الاستشارات الطبية
                <span className="block text-[#f7b731] mt-2">المتخصصة</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl text-[#f7b731] mb-8 animate-fade-in">
                د. عبدالله الصبيعي
              </h2>
              <p className="text-xl lg:text-2xl mb-12 opacity-90 animate-fade-in leading-relaxed">
                خدمات استشارية طبية متخصصة مع سنوات من الخبرة في تقديم الحلول الصحية المخصصة
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
                <Button 
                  onClick={scrollToConsultation}
                  size="lg" 
                  className="bg-[#f7b731] hover:bg-[#f7b731]/90 text-[#1a365d] px-8 py-4 text-lg font-bold rounded-full"
                >
                  <Calendar className="w-5 h-5 ml-2" />
                  احجز استشارة
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-[#1a365d] px-8 py-4 text-lg font-bold rounded-full"
                >
                  اعرف المزيد
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="د. عبدالله الصبيعي" 
                  className="rounded-2xl w-full h-96 object-cover shadow-2xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-[#f7b731] p-4 rounded-2xl shadow-lg">
                  <Award className="w-8 h-8 text-[#1a365d]" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
            <div className="text-center bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <Award className="w-12 h-12 mx-auto mb-4 text-[#f7b731]" />
              <h3 className="text-xl font-bold mb-2">رعاية متخصصة</h3>
              <p className="opacity-90">خبرة طبية متخصصة مع نتائج مثبتة</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <Users className="w-12 h-12 mx-auto mb-4 text-[#f7b731]" />
              <h3 className="text-xl font-bold mb-2">خدمة شخصية</h3>
              <p className="opacity-90">استشارة مخصصة لاحتياجاتك المحددة</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/20">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-[#f7b731]" />
              <h3 className="text-xl font-bold mb-2">مواعيد مرنة</h3>
              <p className="opacity-90">أوقات مواعيد ملائمة تناسبك</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
