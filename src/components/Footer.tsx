
const Footer = () => {
  return (
    <footer className="bg-purple text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gold">Dr. Abdullah Al-Subaie</h3>
              <p className="text-gray-300 mb-4">
                Professional medical consultation services dedicated to providing expert healthcare guidance and personalized patient care.
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-300 hover:text-gold transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-300 hover:text-gold transition-colors">About</a></li>
                <li><a href="#services" className="text-gray-300 hover:text-gold transition-colors">Services</a></li>
                <li><a href="#consultation" className="text-gray-300 hover:text-gold transition-colors">Consultation</a></li>
                <li><a href="#contact" className="text-gray-300 hover:text-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-300">
                <p>+966 50 123 4567</p>
                <p>info@subaieconsult.com</p>
                <p>Riyadh, Saudi Arabia</p>
                <p>Sunday - Thursday: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
          
          <hr className="border-gray-600 my-8" />
          
          <div className="text-center text-gray-300">
            <p>&copy; 2024 Dr. Abdullah Al-Subaie. All rights reserved. | Professional Medical Consultation Services</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
