
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
    <section id="home" className="bg-gradient-to-br from-purple via-purple/90 to-purple/80 text-white py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Professional Medical Consultation
          </h1>
          <h2 className="text-2xl lg:text-3xl text-gold mb-8 animate-fade-in">
            Dr. Abdullah Al-Subaie
          </h2>
          <p className="text-xl lg:text-2xl mb-12 opacity-90 animate-fade-in">
            Expert medical consultations with years of experience in providing personalized healthcare solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              onClick={scrollToConsultation}
              size="lg" 
              className="bg-gold hover:bg-gold/90 text-white px-8 py-3 text-lg"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Book Consultation
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-purple px-8 py-3 text-lg"
            >
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-gold" />
              <h3 className="text-xl font-semibold mb-2">Expert Care</h3>
              <p className="opacity-90">Specialized medical expertise with proven results</p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-gold" />
              <h3 className="text-xl font-semibold mb-2">Personalized Service</h3>
              <p className="opacity-90">Tailored consultation for your specific needs</p>
            </div>
            <div className="text-center">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gold" />
              <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
              <p className="opacity-90">Convenient appointment times that work for you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
