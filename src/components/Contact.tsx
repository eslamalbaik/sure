
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple mb-4">Contact Information</h2>
            <p className="text-xl text-gray-600">
              Get in touch with us for any inquiries or to schedule your consultation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="w-12 h-12 mx-auto mb-4 text-purple" />
                <CardTitle className="text-xl text-purple">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Medical Center<br />
                  Riyadh, Saudi Arabia<br />
                  Kingdom of Saudi Arabia
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Phone className="w-12 h-12 mx-auto mb-4 text-gold" />
                <CardTitle className="text-xl text-purple">Phone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  +966 50 123 4567<br />
                  +966 11 234 5678
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mail className="w-12 h-12 mx-auto mb-4 text-purple" />
                <CardTitle className="text-xl text-purple">Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  info@subaieconsult.com<br />
                  consultation@subaieconsult.com
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="w-12 h-12 mx-auto mb-4 text-gold" />
                <CardTitle className="text-xl text-purple">Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Sunday - Thursday<br />
                  9:00 AM - 5:00 PM<br />
                  <span className="text-sm">By appointment only</span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-16 bg-gradient-to-r from-purple to-gold rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Schedule Your Consultation?</h3>
            <p className="text-xl mb-6 opacity-90">
              Contact us today to book your appointment with Dr. Abdullah Al-Subaie
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+966501234567" className="bg-white text-purple px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Call Now
              </a>
              <a href="mailto:info@subaieconsult.com" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple transition-colors">
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
