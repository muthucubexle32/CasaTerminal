import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search, User, LogIn } from 'lucide-react';

// Try to import logo with fallback
let logo;
try {
  // Try using the @ alias first
  logo = new URL('/src/assets/logo.png', import.meta.url).href;
} catch (e) {
  // Fallback to null if import fails
  logo = null;
}

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "#services",
    megaMenu: {
      columns: [
        {
          title: "Construction Materials",
          links: [
            "Cement & Concrete",
            "Bricks & Blocks",
            "Steel & TMT",
            "Sand & Aggregates",
            "Tiles & Flooring",
          ],
        },
        {
          title: "Equipment Rental",
          links: [
            "JCB & Excavators",
            "Cranes & Hoists",
            "Scaffolding",
            "Concrete Mixers",
            "Power Tools",
          ],
        },
        {
          title: "Professional Services",
          links: [
            "Contractors",
            "Architects",
            "Electricians",
            "Plumbers",
            "Interior Designers",
          ],
        },
      ],
    },
  },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setActiveMegaMenu(null);
    };
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setMobileMenuOpen(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setShowSearch(false);
        setActiveMegaMenu(null);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMobileMenu = (label: string) => {
    setMobileMenuOpen(mobileMenuOpen === label ? null : label);
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
      scrollToSection(href.substring(1));
    } else {
      // Handle home link
      window.location.href = href;
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#502d13]/95 backdrop-blur-md shadow-lg' : 'bg-[#502d13]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden bg-[#e9ddc8]"
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
              <span className="text-2xl font-bold text-[#e9ddc8] group-hover:text-white transition-colors">
                CASA TERMINAL
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (windowWidth >= 768) {
                      link.megaMenu && setActiveMegaMenu(link.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (windowWidth >= 768) {
                      setActiveMegaMenu(null);
                    }
                  }}
                >
                  {link.megaMenu ? (
                    <button
                      onClick={() => link.label === 'Services' && scrollToSection('services')}
                      className="text-[#e9ddc8]/90 hover:text-white font-medium transition-colors relative group flex items-center gap-1"
                    >
                      {link.label}
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        activeMegaMenu === link.label ? 'rotate-180' : ''
                      }`} />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e9ddc8] transition-all group-hover:w-full"></span>
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-[#e9ddc8]/90 hover:text-white font-medium transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e9ddc8] transition-all group-hover:w-full"></span>
                    </a>
                  )}

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {link.megaMenu &&
                      activeMegaMenu === link.label &&
                      windowWidth >= 768 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setActiveMegaMenu(link.label)}
                          onMouseLeave={() => setActiveMegaMenu(null)}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-7 w-[800px] bg-[#502d13] rounded-lg shadow-xl border border-[#e9ddc8]/20 overflow-hidden"
                        >
                          <div className="grid grid-cols-3 gap-6 p-6">
                            {link.megaMenu.columns.map((column, idx) => (
                              <div key={idx}>
                                <h4 className="font-semibold text-[#e9ddc8] mb-3 pb-2 border-b border-[#e9ddc8]/20">
                                  {column.title}
                                </h4>
                                <ul className="space-y-2">
                                  {column.links.map((item) => (
                                    <li key={item}>
                                      <a
                                        href="#"
                                        className="text-[#e9ddc8]/70 hover:text-white text-sm transition-colors block hover:translate-x-1 transform duration-200"
                                        onClick={() => setActiveMegaMenu(null)}
                                      >
                                        {item}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSearch(true)}
                className="p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="hidden sm:block p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors"
                aria-label="User account"
              >
                <User className="w-5 h-5" />
              </motion.a>

              <Link
                to="/member"
                className="bg-[#e9ddc8] text-[#502d13] px-4 py-2 rounded-lg font-semibold hover:bg-white transition-colors flex items-center space-x-2"
              >
                <LogIn className="w-5 h-5" />
                <span>Become a Member</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-[#e9ddc8]/10 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6 text-[#e9ddc8]" /> : <Menu className="w-6 h-6 text-[#e9ddc8]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#502d13] border-t border-[#e9ddc8]/20"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <div key={link.label} className="border-b border-[#e9ddc8]/10 last:border-0">
                    {link.megaMenu ? (
                      <>
                        <button
                          onClick={() => toggleMobileMenu(link.label)}
                          className="w-full flex items-center justify-between py-3 text-[#e9ddc8] font-medium"
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={`w-5 h-5 transition-transform duration-300 ${
                              mobileMenuOpen === link.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {mobileMenuOpen === link.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-4 space-y-4">
                                {link.megaMenu.columns.map((column, idx) => (
                                  <div key={idx}>
                                    <h4 className="text-[#e9ddc8]/60 text-sm font-semibold mb-2 px-2">
                                      {column.title}
                                    </h4>
                                    <ul className="space-y-2">
                                      {column.links.map((item) => (
                                        <li key={item}>
                                          <a
                                            href="#"
                                            className="block px-2 py-2 text-[#e9ddc8]/80 hover:bg-[#e9ddc8]/10 rounded-lg transition-colors"
                                            onClick={() => setIsOpen(false)}
                                          >
                                            {item}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={link.href}
                        onClick={(e) => {
                          handleNavClick(e, link.href);
                          setIsOpen(false);
                        }}
                        className="block py-3 text-[#e9ddc8] font-medium hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                ))}

                {/* Mobile action buttons */}
                <div className="pt-4 grid grid-cols-2 gap-3">
                  <Link
                    to="/member"
                    onClick={() => setIsOpen(false)}
                    className="bg-[#e9ddc8] text-[#502d13] px-6 py-3 rounded-xl font-semibold text-center hover:bg-white transition-colors flex items-center justify-center space-x-2"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Become a Member</span>
                  </Link>
                  <a
                    href="#"
                    className="bg-transparent border border-[#e9ddc8]/30 text-[#e9ddc8] px-6 py-3 rounded-xl font-semibold text-center hover:bg-[#e9ddc8]/10 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xl z-[60] flex items-start justify-center px-4 pt-16 sm:pt-24"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#e9ddc8] rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-2 flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#502d13] ml-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search for materials, equipment, contractors..."
                    className="flex-1 bg-transparent border-none outline-none text-[#502d13] placeholder-[#502d13]/50 py-4 text-sm sm:text-base"
                    autoFocus
                  />
                  <button
                    onClick={() => setShowSearch(false)}
                    className="px-3 sm:px-4 py-2 bg-[#502d13] text-[#e9ddc8] rounded-xl hover:bg-[#7b4a26] transition-colors text-sm sm:text-base whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>

                <div className="hidden sm:block px-4 pb-4">
                  <p className="text-[#502d13]/50 text-xs mb-2">
                    Popular searches:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Cement",
                      "JCB",
                      "TMT Steel",
                      "Contractors",
                      "Scaffolding",
                    ].map((item) => (
                      <button
                        key={item}
                        className="px-3 py-1 bg-[#502d13]/10 text-[#502d13] text-xs rounded-full hover:bg-[#502d13]/20 transition-colors"
                        onClick={() => {
                          console.log("Search:", item);
                          setShowSearch(false);
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;