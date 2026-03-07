import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Phone, Mail, MessageCircle, 
  Facebook, Twitter, Instagram, Linkedin, 
  ArrowUp, ChevronRight, Clock, Award,
  Shield, Truck
} from 'lucide-react';
import { useState, useEffect } from 'react';
import logo from "/logo.png";

// Try to import logo with fallback


interface FooterSection {
  title: string;
  links?: { name: string; link: string; }[];
  content?: React.ReactNode;
}

interface SocialLink {
  icon: React.ElementType;
  link: string;
  label: string;
}

interface ContactInfoItem {
  Icon: React.ElementType;
  text: string;
  href?: string;
}



const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleSection = (section: string) => setExpandedSection(expandedSection === section ? null : section);

  const footerSections: Record<string, FooterSection> = {
    about: {
      title: 'About Us',
      links: [
        { name: 'About CASA Terminal', link: '/about' },
        { name: 'Construction Services', link: '/services' },
        { name: 'Vendors', link: '/vendors' },
        { name: 'Our Location', link: '/location' },
      ],
    },
    policy: {
      title: 'Policy',
      links: [
        { name: 'Privacy Policy', link: '/privacy' },
        { name: 'Terms & Conditions', link: '/terms' },
        { name: 'FAQ', link: '/faq' },
      ],
    },
    account: {
      title: 'My Account',
      links: [
        { name: 'My Account', link: '/account' },
        { name: 'My Orders', link: '/orders' },
        { name: 'Order Tracking', link: '/track-order' },
      ],
    },
  };

  const socialLinks: SocialLink[] = [
    { icon: Facebook, link: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, link: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, link: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, link: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const features = [
    { icon: Shield, text: "Verified Suppliers" },
    { icon: Award, text: "Quality Assured" },
    { icon: Truck, text: "Fast Delivery" },
    { icon: Clock, text: "24/7 Support" },
  ];

  const contactInfo: ContactInfoItem[] = [
    { Icon: Phone, text: "+91 xxxxx xxxxx", href: "tel:+91xxxxx xxxxx" },
    { Icon: MessageCircle, text: "+91 xxxxx xxxxx", href: "tel:+91xxxxx xxxxx" },
    { Icon: Mail, text: "info@casaterminal.com", href: "mailto:info@casaterminal.com" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <footer id="contact" className="bg-gradient-to-b from-[#502d13] to-[#3d220f] text-[#e9ddc8] relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 2px 2px, #e9ddc8 1px, transparent 0)",
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      {/* Top Wave Decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden rotate-180">
        <svg className="relative block w-full h-6 md:h-12" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="#e9ddc8" fillOpacity="0.05"></path>
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 relative z-10">
        {/* Features Bar - Fully Responsive */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#e9ddc8]/5 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4 text-center border border-[#e9ddc8]/10 hover:border-[#e9ddc8]/30 transition-all duration-300"
            >
              <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#e9ddc8] mx-auto mb-1 sm:mb-2" />
              <p className="text-[10px] sm:text-xs md:text-sm font-medium">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile: Accordion Layout (up to lg) */}
        <div className="lg:hidden space-y-4 sm:space-y-6">
          {/* Company Info - Mobile */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div variants={itemVariants} className="flex flex-col items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden "
              >
                {logo && !logoError ? (
                  <img
                    src={logo}
                    alt="Casa Terminal Logo"
                    className="w-full h-full object-cover"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="text-[#502d13] font-bold text-xl">CT</span>
                )}
              </motion.div>
              <span className="font-display font-bold text-lg sm:text-xl md:text-2xl text-[#e9ddc8]">
                CASA TERMINAL
              </span>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-[#e9ddc8]/70 text-xs sm:text-sm md:text-base max-w-md mx-auto mb-4 sm:mb-6 leading-relaxed px-2">
              India's premier construction marketplace connecting builders, suppliers, and contractors with cutting-edge technology and trusted partnerships.
            </motion.p>
            
            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex justify-center gap-2 sm:gap-3 flex-wrap pb-2">
              {socialLinks.map(({ icon: Icon, link, label }) => (
                <motion.a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-[#e9ddc8]/10 flex items-center justify-center hover:bg-[#e9ddc8] hover:text-[#502d13] transition-all duration-300 border border-[#e9ddc8]/20"
                  aria-label={label}
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Accordion Sections */}
          <div className="space-y-2 sm:space-y-3">
            {Object.entries(footerSections).map(([key, section]) => (
              <motion.div 
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="border border-[#e9ddc8]/10 rounded-lg overflow-hidden backdrop-blur-sm bg-[#e9ddc8]/5"
              >
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-[#e9ddc8]/10 transition-colors"
                >
                  <span className="font-display font-bold text-sm sm:text-base md:text-lg">{section.title}</span>
                  <ChevronRight 
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                      expandedSection === section.title ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: expandedSection === section.title ? 'auto' : 0,
                    opacity: expandedSection === section.title ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 sm:p-4 bg-[#e9ddc8]/5 border-t border-[#e9ddc8]/10">
                    <ul className="space-y-2 sm:space-y-3">
                      {section.links?.map((item) => (
                        <motion.li 
                          key={item.name}
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Link
                            to={item.link}
                            className="text-[#e9ddc8]/70 hover:text-[#e9ddc8] transition-colors flex items-center gap-2 text-xs sm:text-sm"
                            onClick={() => setExpandedSection(null)}
                          >
                            <span className="w-1 h-1 bg-[#e9ddc8]/40 rounded-full group-hover:bg-[#e9ddc8]" />
                            {item.name}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Quick Contact - Mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-br from-[#e9ddc8]/10 to-[#e9ddc8]/5 rounded-lg backdrop-blur-sm border border-[#e9ddc8]/10"
          >
            <h4 className="font-display font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-center">
              Quick Contact
            </h4>
            <div className="space-y-2 sm:space-y-3 text-[#e9ddc8]/70">
              {contactInfo.map(({ Icon, text, href }) => (
                <div key={text} className="flex items-center justify-center gap-2 sm:gap-3">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#e9ddc8] flex-shrink-0" />
                  {href ? (
                    <a href={href} className="text-xs sm:text-sm hover:text-[#e9ddc8] transition-colors break-all">
                      {text}
                    </a>
                  ) : (
                    <span className="text-xs sm:text-sm break-all">{text}</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Desktop Grid Layout (lg and above) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 xl:gap-12">
          {/* Company Info - Desktop */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-lg flex items-center justify-center "
              >
                {logo && !logoError ? (
                  <img
                    src={logo}
                    alt="Casa Terminal Logo"
                    className="w-full h-full object-cover"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="text-[#502d13] font-bold text-xl">CT</span>
                )}
              </motion.div>
              <span className="font-display font-bold text-xl text-[#e9ddc8]">
                CASA TERMINAL
              </span>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-[#e9ddc8]/70 text-sm leading-relaxed">
              India's premier construction marketplace connecting builders, suppliers, and contractors with cutting-edge technology and trusted partnerships.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex gap-2">
              {socialLinks.map(({ icon: Icon, link, label }) => (
                <motion.a
                  key={label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-[#e9ddc8]/10 flex items-center justify-center hover:bg-[#e9ddc8] hover:text-[#502d13] transition-all duration-300 border border-[#e9ddc8]/20"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* About Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-bold text-lg mb-6 relative">
              About Us
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#e9ddc8] to-transparent rounded-full" />
            </h4>
            <ul className="space-y-3">
              {footerSections.about.links?.map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={item.link}
                    className="text-[#e9ddc8]/70 hover:text-[#e9ddc8] transition-colors flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1 h-1 bg-[#e9ddc8]/40 rounded-full group-hover:bg-[#e9ddc8] transition-colors" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Policy Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-bold text-lg mb-6 relative">
              Policy
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#e9ddc8] to-transparent rounded-full" />
            </h4>
            <ul className="space-y-3">
              {footerSections.policy.links?.map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={item.link}
                    className="text-[#e9ddc8]/70 hover:text-[#e9ddc8] transition-colors flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1 h-1 bg-[#e9ddc8]/40 rounded-full group-hover:bg-[#e9ddc8] transition-colors" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* My Account Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-display font-bold text-lg mb-6 relative">
              My Account
              <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-gradient-to-r from-[#e9ddc8] to-transparent rounded-full" />
            </h4>
            <ul className="space-y-3">
              {footerSections.account.links?.map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    to={item.link}
                    className="text-[#e9ddc8]/70 hover:text-[#e9ddc8] transition-colors flex items-center gap-2 group text-sm"
                  >
                    <span className="w-1 h-1 bg-[#e9ddc8]/40 rounded-full group-hover:bg-[#e9ddc8] transition-colors" />
                    {item.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Desktop Contact Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="hidden lg:block mt-12 pt-8 border-t border-[#e9ddc8]/10"
        >
          <div className="grid grid-cols-2 gap-8">
            {/* Office Address */}
            <div className="flex items-start gap-4">
              <div className="bg-gradient-to-br from-[#e9ddc8]/20 to-[#e9ddc8]/5 p-3 rounded-xl">
                <MapPin className="w-5 h-5 text-[#e9ddc8]" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base mb-2">Visit Our Office</h4>
                <div className="text-[#e9ddc8]/70 text-sm space-y-0.5">
                  <p>123, Construction Hub,</p>
                  <p>Chennai, Tamil Nadu - 600119</p>
                  <p>India</p>
                </div>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-display font-bold text-base mb-3">Call Us</h4>
                {contactInfo.slice(0, 2).map(({ Icon, text, href }) => (
                  <a
                    key={text}
                    href={href}
                    className="text-[#e9ddc8]/70 hover:text-[#e9ddc8] transition-colors flex items-center gap-2 mb-2 text-sm"
                  >
                    <Icon className="w-4 h-4" />
                    {text}
                  </a>
                ))}
              </div>
              
              <div>
                <h4 className="font-display font-bold text-base mb-3">Email Us</h4>
                <a
                  href={contactInfo[2].href}
                  className="text-[#e9ddc8]/70 hover:text-[#e9ddc8] transition-colors flex items-center gap-2 text-sm break-all"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {contactInfo[2].text}
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile Address Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="lg:hidden mt-6 sm:mt-8 p-4 sm:p-5 bg-gradient-to-br from-[#e9ddc8]/10 to-[#e9ddc8]/5 rounded-xl border border-[#e9ddc8]/10"
        >
          <h4 className="font-display font-bold text-sm sm:text-base md:text-lg mb-3 sm:mb-4 text-center">Visit Our Office</h4>
          <div className="flex flex-col items-center text-center space-y-2">
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-[#e9ddc8]" />
            <div className="text-[#e9ddc8]/70 text-xs sm:text-sm space-y-0.5">
              <p>123, Construction Hub,</p>
              <p>Chennai, Tamil Nadu - 600119</p>
              <p>India</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e9ddc8]/10 relative z-10 bg-[#3d220f]/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
            <p className="text-[#e9ddc8]/40 text-[10px] sm:text-xs order-2 md:order-1">
              © {new Date().getFullYear()} CASA TERMINAL. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 order-1 md:order-2">
              <Link to="/privacy" className="text-[#e9ddc8]/40 text-[10px] sm:text-xs hover:text-[#e9ddc8] transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-[#e9ddc8]/40 text-[10px] sm:text-xs hover:text-[#e9ddc8] transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: showScrollTop ? 1 : 0, opacity: showScrollTop ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        onClick={scrollToTop}
        className="fixed bottom-20 md:bottom-8 right-4 z-50 bg-gradient-to-r from-[#e9ddc8] to-[#d4b68a] text-[#502d13] p-2.5 sm:p-3 md:p-4 rounded-full shadow-2xl hover:shadow-[#e9ddc8]/30 transition-all duration-300 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:-translate-y-1 transition-transform" />
      </motion.button>

     

      {/* Add bottom padding on mobile to account for fixed nav */}
      <style>{`
        @media (max-width: 768px) {
          body {
            padding-bottom: 56px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;