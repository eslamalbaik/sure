
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Award, Users, Stethoscope } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple mb-4">About Dr. Abdullah Al-Subaie</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A distinguished medical professional dedicated to providing exceptional healthcare consultation services
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Dr. Abdullah Al-Subaie" 
                className="rounded-lg shadow-xl w-full h-96 object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-purple mb-6">Professional Excellence</h3>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                Dr. Abdullah Al-Subaie brings extensive experience in medical consultation and patient care. 
                With a commitment to excellence and patient-centered approach, he provides comprehensive 
                medical guidance tailored to individual needs.
              </p>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                His expertise spans various medical disciplines, ensuring that patients receive the most 
                appropriate and effective consultation for their specific health concerns.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-gold text-white px-4 py-2 rounded-full">Medical Consultation</span>
                <span className="bg-purple text-white px-4 py-2 rounded-full">Patient Care</span>
                <span className="bg-gold text-white px-4 py-2 rounded-full">Health Assessment</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 text-purple" />
                <h4 className="text-xl font-semibold mb-2">Education</h4>
                <p className="text-gray-600">Advanced medical degree with specialized training</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Award className="w-12 h-12 mx-auto mb-4 text-gold" />
                <h4 className="text-xl font-semibold mb-2">Recognition</h4>
                <p className="text-gray-600">Awards and recognition for medical excellence</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 mx-auto mb-4 text-purple" />
                <h4 className="text-xl font-semibold mb-2">Experience</h4>
                <p className="text-gray-600">Years of dedicated patient care and consultation</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Stethoscope className="w-12 h-12 mx-auto mb-4 text-gold" />
                <h4 className="text-xl font-semibold mb-2">Expertise</h4>
                <p className="text-gray-600">Comprehensive medical knowledge and skills</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
