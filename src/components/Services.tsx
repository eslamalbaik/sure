
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, FileText, Clock, Shield } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "Medical Consultation",
      description: "Comprehensive medical evaluations and expert advice for various health concerns and conditions."
    },
    {
      icon: FileText,
      title: "Health Assessment",
      description: "Detailed health assessments and medical reviews to guide your healthcare decisions."
    },
    {
      icon: Clock,
      title: "Follow-up Care",
      description: "Ongoing consultation and monitoring to ensure optimal health outcomes and recovery."
    },
    {
      icon: Shield,
      title: "Preventive Care",
      description: "Proactive health guidance and preventive measures to maintain your well-being."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive medical consultation services designed to meet your healthcare needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <service.icon className="w-16 h-16 mx-auto mb-4 text-purple group-hover:text-gold transition-colors" />
                  <CardTitle className="text-xl text-purple group-hover:text-gold transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-purple to-purple/90 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Why Choose Our Consultation Services?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              We provide personalized, professional medical consultation with a focus on your individual health needs and concerns.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-2 text-gold">Professional Excellence</h4>
                <p className="opacity-90">Expert medical knowledge and proven experience</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2 text-gold">Personalized Care</h4>
                <p className="opacity-90">Tailored consultation for your specific needs</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2 text-gold">Confidential Service</h4>
                <p className="opacity-90">Privacy and confidentiality in all consultations</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
