import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Package, HardHat, Wrench, ArrowRight, Sparkles, ChevronRight } from "lucide-react";

const coreServices = [
  {
    icon: Package,
    title: "Products",
    description: "Premium construction materials at factory prices. Cement, steel, bricks, and more.",
    features: ["50+ Brands", "Quality Guaranteed", "Bulk Discounts"],
    color: "from-amber-600 to-orange-600",
    bgImage: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500",
  },
  {
    icon: Wrench,
    title: "Rental",
    description: "Heavy equipment and machinery on flexible rental terms. JCB, cranes, and more.",
    features: ["Latest Models", "Maintained Fleet", "Operator Available"],
    color: "from-purple-600 to-pink-600",
    bgImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500",
  },
  {
    icon: HardHat,
    title: "Contractors",
    description: "Verified professionals and skilled workforce for your construction needs.",
    features: ["Background Verified", "Skill Tested", "Insurance Covered"],
    color: "from-green-600 to-emerald-600",
    bgImage: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500",
  },
];

const CoreServices = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const handleCardClick = (index: number) => {
    if (isMobile) {
      setActiveCard(activeCard === index ? null : index);
    }
  };

  return (
    <section 
      id="services" 
      ref={ref} 
      className="py-16 md:py-20 lg:py-24 bg-[#e9ddc8] relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-48 md:w-72 lg:w-96 h-48 md:h-72 lg:h-96 bg-[#502d13] rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 md:w-72 lg:w-96 h-48 md:h-72 lg:h-96 bg-[#502d13] rounded-full blur-2xl md:blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#502d13] text-[#e9ddc8] px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4"
          >
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold">Premium Services</span>
          </motion.div>
          
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#502d13] mt-2 md:mt-3 px-4">
            Everything Under One Roof
          </h2>
          <p className="text-[#502d13]/60 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-2 md:mt-4 px-4">
            From raw materials to skilled workforce — we've got your construction needs covered
          </p>
        </motion.div>

        {/* Services Grid - 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {coreServices.map((service, i) => {
            const Icon = service.icon;
            const isActive = hoveredCard === i || activeCard === i;
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                onHoverStart={() => !isMobile && setHoveredCard(i)}
                onHoverEnd={() => !isMobile && setHoveredCard(null)}
                onClick={() => handleCardClick(i)}
                className={`group relative ${
                  isMobile ? 'h-[350px]' : 'h-[380px] md:h-[400px]'
                } rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-300`}
              >
                {/* Background Image with Overlay */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ 
                    scale: isActive ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <img
                    src={service.bgImage}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-80 md:opacity-90 mix-blend-multiply`} />
                </motion.div>

                {/* Content */}
                <div className="absolute inset-0 p-4 sm:p-5 md:p-6 lg:p-8 flex flex-col justify-end text-white">
                  <motion.div
                    animate={{ 
                      y: isActive ? (isMobile ? -10 : -20) : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Icon */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 md:mb-4 ${
                      isActive ? 'scale-110' : ''
                    } transition-transform duration-300`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="font-display font-bold text-xl sm:text-2xl md:text-2xl lg:text-2xl mb-1 md:mb-2">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className={`text-white/80 text-xs sm:text-sm md:text-sm lg:text-sm mb-3 md:mb-4 ${
                      isMobile && !isActive ? 'line-clamp-2' : ''
                    }`}>
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ 
                        opacity: isActive ? 1 : 0,
                        height: isActive ? 'auto' : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="space-y-1.5 md:space-y-2 mb-3 md:mb-4 overflow-hidden"
                    >
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                          <div className="w-1 h-1 bg-white rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </motion.div>
                    
                    {/* Learn More */}
                    <motion.div
                      animate={{ 
                        x: isActive ? (isMobile ? 5 : 10) : 0,
                      }}
                      className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-semibold"
                    >
                      <span>Learn More</span>
                      {isMobile ? (
                        <ChevronRight className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 ${
                          isActive ? 'translate-x-1' : ''
                        }`} />
                      ) : (
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                      )}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Shine Effect */}
                {!isMobile && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                )}

                {/* Touch feedback overlay for mobile */}
                {isMobile && (
                  <div className={`absolute inset-0 bg-black/0 transition-colors duration-300 ${
                    isActive ? 'bg-black/20' : ''
                  }`} />
                )}
              </motion.div>
            );
          })}
        </div>
        

        {/* Mobile View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-8 md:mt-10 lg:hidden"
        >
          <a
            href="#all-services"
            className="inline-flex items-center gap-2 bg-[#502d13] text-[#e9ddc8] px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#7b4a26] transition-colors duration-300 shadow-lg"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Tablet/Desktop View More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="hidden lg:flex justify-center mt-10"
        >
          <a
            href="#all-services"
            className="inline-flex items-center gap-2 text-[#502d13] font-semibold hover:gap-3 transition-all duration-300 group"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreServices;