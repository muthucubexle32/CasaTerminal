import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Star, Clock, MapPin, Package, HardHat, Wrench, Sparkles } from "lucide-react";

const services = [
  {
    title: "Premium Cement",
    category: "Materials",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500",
    price: "₹350/bag",
    rating: 4.5,
    delivery: "24hrs",
    location: "All Cities",
  },
  {
    title: "JCB Rentals",
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=500",
    price: "₹1200/hr",
    rating: 4.8,
    delivery: "Same Day",
    location: "Major Cities",
  },
  {
    title: "Steel TMT Bars",
    category: "Materials",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500",
    price: "₹65/kg",
    rating: 4.6,
    delivery: "48hrs",
    location: "All Cities",
  },
  {
    title: "Skilled Masons",
    category: "Labor",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500",
    price: "₹800/day",
    rating: 4.7,
    delivery: "24hrs",
    location: "Metros",
  },
  {
    title: "Scaffolding",
    category: "Equipment",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500",
    price: "₹50/sqft",
    rating: 4.4,
    delivery: "Same Day",
    location: "All Cities",
  },
  {
    title: "Architects",
    category: "Services",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500",
    price: "Custom",
    rating: 4.9,
    delivery: "Flexible",
    location: "Remote",
  },
];

const ServiceCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) setIsInView(true);
  }, [inView]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const cardWidth = isMobile ? 260 : isTablet ? 280 : 320;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });

      const newIndex = direction === "left" 
        ? Math.max(0, currentIndex - 1)
        : Math.min(services.length - 1, currentIndex + 1);
      setCurrentIndex(newIndex);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      scroll("right");
    } else if (isRightSwipe) {
      scroll("left");
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

 

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const cardWidth = isMobile ? 260 : isTablet ? 280 : 320;
      const gap = 24;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(Math.min(services.length - 1, Math.max(0, newIndex)));
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-20 bg-[#e9ddc8] relative overflow-hidden"
    >
      {/* Fixed Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-64 h-64 bg-[#502d13] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-[#502d13] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* "Everything Under One Roof" Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#502d13] text-[#e9ddc8] px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-3 md:mb-4"
          >
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-semibold">Complete Solutions</span>
          </motion.div>
          
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#502d13] mt-2 md:mt-3 px-4">
            Everything Under One Roof
          </h2>
          <p className="text-[#502d13]/60 text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto mt-2 md:mt-4 px-4">
            From premium materials to expert contractors — all your construction needs in one place
          </p>

          {/* Service Categories */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-6 md:mt-8">
            {[
              { icon: Package, label: "Products" },
              { icon: Wrench, label: "Rental" },
              { icon: HardHat, label: "Contractors" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-1.5 sm:gap-2 bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md"
              >
                <item.icon className="w-3 h-3 sm:w-4 sm:h-4 text-[#502d13]" />
                <span className="text-xs sm:text-sm font-medium text-[#502d13]">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 md:mb-8 lg:mb-10"
        >
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[#502d13]">
              Featured Services
            </h2>
            <p className="text-[#502d13]/60 text-xs sm:text-sm md:text-base mt-1">
              Hand-picked solutions for your project
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden lg:flex gap-3 mt-4 sm:mt-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("left")}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#502d13] text-[#e9ddc8] flex items-center justify-center hover:bg-[#7b4a26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous slide"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll("right")}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#502d13] text-[#e9ddc8] flex items-center justify-center hover:bg-[#7b4a26] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next slide"
              disabled={currentIndex === services.length - 1}
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </motion.button>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient Overlays */}
         
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 lg:w-20 bg-gradient-to-l from-[#e9ddc8] to-transparent z-10 pointer-events-none" />

          {/* Carousel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-x-auto pb-4 sm:pb-6 md:pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ 
              scrollbarWidth: "none", 
              msOverflowStyle: "none",
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: isMobile ? 0 : -10 }}
                onClick={() => isMobile && setSelectedService(selectedService === i ? null : i)}
                className={`group flex-shrink-0 w-[240px] xs:w-[260px] sm:w-[280px] md:w-[300px] lg:w-[320px] snap-start cursor-pointer ${
                  isMobile ? 'active:scale-95 transition-transform' : ''
                }`}
              >
                <div className={`bg-white rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl md:hover:shadow-2xl transition-all duration-300 ${
                  selectedService === i ? 'ring-2 ring-[#502d13]' : ''
                }`}>
                  {/* Image Container - No shadow/blur below */}
                  <div className="relative h-32 xs:h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#502d13] text-[#e9ddc8] text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                      {service.category}
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-[#e9ddc8] text-[#502d13] text-[8px] xs:text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg">
                      {service.price}
                    </div>

                    {/* Rating Badge - Mobile Only */}
                    {isMobile && (
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[8px] xs:text-[9px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                        <Star className="w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                        <span>{service.rating}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-3 xs:p-3.5 sm:p-4 md:p-5 lg:p-6">
                    <h3 className="font-display font-bold text-sm xs:text-base sm:text-lg md:text-xl text-[#502d13] mb-1 sm:mb-2">
                      {service.title}
                    </h3>
                    
                    {/* Desktop Rating */}
                    {!isMobile && (
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs sm:text-sm font-semibold text-[#502d13]">{service.rating}</span>
                        </div>
                        <span className="text-[#502d13]/40 text-xs">•</span>
                        <div className="flex items-center gap-0.5 sm:gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#502d13]/60" />
                          <span className="text-[10px] sm:text-xs text-[#502d13]/60">{service.delivery}</span>
                        </div>
                      </div>
                    )}

                    {/* Description - Always visible */}
                    <p className="text-[#502d13]/60 text-[10px] xs:text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4 line-clamp-2">
                      Premium quality guaranteed with manufacturer warranty
                    </p>

                    {/* Mobile: Show extra details when selected */}
                    {isMobile && selectedService === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2 pt-2 border-t border-[#502d13]/10">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-[#502d13]/60" />
                            <span className="text-[10px] xs:text-xs text-[#502d13]/60">{service.location}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Book Now Button */}
                    <button 
                      className={`text-[#502d13] font-semibold flex items-center gap-1 sm:gap-2 group/btn text-xs sm:text-sm md:text-base ${
                        isMobile ? 'w-full justify-center py-1.5 sm:py-2 bg-[#502d13]/5 rounded-lg' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Book:', service.title);
                      }}
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center mt-6 sm:mt-8 md:mt-10"
        >
          <a
            href="#all-services"
            className="inline-flex items-center gap-1.5 sm:gap-2 text-[#502d13] font-semibold text-sm sm:text-base hover:gap-2 sm:hover:gap-3 transition-all duration-300 group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCarousel;