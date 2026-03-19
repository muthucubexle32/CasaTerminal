// src/components/layout/Navbar.tsx
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search, User, LogIn, Package, Wrench,  } from 'lucide-react';
import logo from "/logo.png";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setActiveMegaMenu(null);
    };
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setMobileMenuOpen(null);
      }
    };

    // Check login status from localStorage
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const type = localStorage.getItem('userType');
    setIsLoggedIn(loggedIn);
    setUserType(type);

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

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserType(null);
    navigate('/');
  };

  const toggleMobileMenu = (label: string) => {
    setMobileMenuOpen(mobileMenuOpen === label ? null : label);
  };

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
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
      navigate(href);
      window.scrollTo(0, 0);
    }
    setIsOpen(false);
  };

  const getDashboardLink = () => {
    switch(userType) {
      case 'seller': return '/seller/dashboard';
      case 'contractor': return '/contractor/dashboard';
      case 'rental': return '/rental/dashboard';
      default: return '/login';
    }
  };

  // Navigation links
  const navLinks = [
    {
      label: "Services",
      href: "#services",
      icon: Package,
      megaMenu: {
        columns: [
          {
            title: "Construction Materials",
            icon: Package,
            links: [
              { name: "Cement & Concrete", href: "/products/cement" },
              { name: "Bricks & Blocks", href: "/products/bricks" },
              { name: "Steel & TMT", href: "/products/steel" },
              { name: "Sand & Aggregates", href: "/products/sand" },
              { name: "Tiles & Flooring", href: "/products/tiles" },
            ],
          },
          {
            title: "Equipment Rental",
            icon: Wrench,
            links: [
              { name: "JCB & Excavators", href: "/rentals?type=heavy" },
              { name: "Cranes & Hoists", href: "/rentals?type=cranes" },
              { name: "Scaffolding", href: "/rentals?type=scaffolding" },
              { name: "Concrete Mixers", href: "/rentals?type=mixers" },
              { name: "Power Tools", href: "/rentals?type=tools" },
            ],
          },
          {
            title: "Professional Services",
            icon: User,
            links: [
              { name: "Contractors", href: "/contractors" },
              { name: "Architects", href: "/contractors?type=architects" },
              { name: "Electricians", href: "/contractors?type=electricians" },
              { name: "Plumbers", href: "/contractors?type=plumbers" },
              { name: "Interior Designers", href: "/contractors?type=interior" },
            ],
          },
        ],
      },
    },
    {
      label: "Member",
      href: "/member",
    },
    {
      label: "Contact",
      href: "#contact",
    },
  ];

  // Determine device type based on window width
  const isDesktop = windowWidth >= 1024;

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
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
            {/* Logo - Responsive sizing */}
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center space-x-1 sm:space-x-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center overflow-hidden"
              >
                {!logoError ? (
                  <img
                    src={logo}
                    alt="Casa Terminal Logo"
                    className="w-full h-full object-cover"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span className="text-[#502d13] font-bold text-sm sm:text-base md:text-xl">CT</span>
                )}
              </motion.div>
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#e9ddc8] group-hover:text-white transition-colors">
                CASA TERMINAL
              </span>
            </Link>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (isDesktop && link.megaMenu) {
                      setActiveMegaMenu(link.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (isDesktop) {
                      setActiveMegaMenu(null);
                    }
                  }}
                >
                  {link.megaMenu ? (
                    <button
                      onClick={() => {
                        if (link.label === 'Services') {
                          scrollToSection('services');
                        } else if (link.label === 'Member') {
                          navigate('/member');
                        }
                      }}
                      className="text-[#e9ddc8]/90 hover:text-white font-medium transition-colors relative group flex items-center gap-1 text-sm xl:text-base px-2 xl:px-3 py-2"
                    >
                      {link.label}
                      <ChevronDown className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-300 ${
                        activeMegaMenu === link.label ? 'rotate-180' : ''
                      }`} />
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e9ddc8] transition-all group-hover:w-full"></span>
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-[#e9ddc8]/90 hover:text-white font-medium transition-colors relative group text-sm xl:text-base px-2 xl:px-3 py-2"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#e9ddc8] transition-all group-hover:w-full"></span>
                    </a>
                  )}

                  {/* Mega Menu - Desktop only */}
                  <AnimatePresence>
                    {link.megaMenu &&
                      activeMegaMenu === link.label &&
                      isDesktop && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => setActiveMegaMenu(link.label)}
                          onMouseLeave={() => setActiveMegaMenu(null)}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] xl:w-[800px] bg-[#502d13] rounded-lg shadow-xl border border-[#e9ddc8]/20 overflow-hidden"
                        >
                          <div className="grid grid-cols-3 gap-4 xl:gap-6 p-4 xl:p-6">
                            {link.megaMenu.columns.map((column, idx) => {
                              const Icon = column.icon;
                              return (
                                <div key={idx}>
                                  <h4 className="font-semibold text-[#e9ddc8] mb-2 xl:mb-3 pb-1 xl:pb-2 border-b border-[#e9ddc8]/20 text-sm xl:text-base flex items-center gap-2">
                                    {Icon && <Icon className="w-4 h-4" />}
                                    {column.title}
                                  </h4>
                                  <ul className="space-y-1 xl:space-y-2">
                                    {column.links.map((item) => (
                                      <li key={item.name}>
                                        <Link
                                          to={item.href}
                                          className="text-[#e9ddc8]/70 hover:text-white text-xs xl:text-sm transition-colors block hover:translate-x-1 transform duration-200 py-1"
                                          onClick={() => {
                                            setActiveMegaMenu(null);
                                            window.scrollTo(0, 0);
                                          }}
                                        >
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Action Icons - Responsive */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowSearch(true)}
                className="p-1.5 sm:p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              {/* User menu for logged in users */}
              {isLoggedIn ? (
                <Link
                  to={getDashboardLink()}
                  className="p-1.5 sm:p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors flex items-center gap-2"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#e9ddc8] rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#502d13]" />
                  </div>
                  <span className="text-xs sm:text-sm capitalize hidden xl:inline">{userType}</span>
                </Link>
              ) : (
                <>
                  {/* User Icon - Opens Admin Login */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/admin/login')}
                    className="p-1.5 sm:p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors relative group"
                    aria-label="Admin Login"
                  >
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#502d13] text-[#e9ddc8] text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Admin Login
                    </span>
                  </motion.button>
                </>
              )}

              {/* Login/Logout button */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-[#e9ddc8] text-[#502d13] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-white transition-colors flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-base"
                >
                  <LogIn className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rotate-180" />
                  <span className="hidden min-[480px]:inline">Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#e9ddc8] text-[#502d13] px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-white transition-colors flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm md:text-base"
                >
                  <LogIn className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                  <span className="hidden min-[480px]:inline">Login</span>
                </Link>
              )}

              {/* Mobile Menu Button - visible on tablet and below */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-[#e9ddc8]/10 transition-colors"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#e9ddc8]" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#e9ddc8]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Menu - Responsive */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-[#502d13] border-t border-[#e9ddc8]/20 overflow-y-auto max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)]"
            >
              <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-2 sm:space-y-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <div key={link.label} className="border-b border-[#e9ddc8]/10 last:border-0">
                      {link.megaMenu ? (
                        <>
                          <button
                            onClick={() => {
                              if (link.label === 'Services') {
                                scrollToSection('services');
                                setIsOpen(false);
                              } else if (link.label === 'Member') {
                                navigate('/member');
                                setIsOpen(false);
                              } else {
                                toggleMobileMenu(link.label);
                              }
                            }}
                            className="w-full flex items-center justify-between py-2 sm:py-3 text-[#e9ddc8] font-medium text-sm sm:text-base"
                          >
                            <span className="flex items-center gap-2">
                              {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                              {link.label}
                            </span>
                            {link.megaMenu && (
                              <ChevronDown
                                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                                  mobileMenuOpen === link.label ? "rotate-180" : ""
                                }`}
                              />
                            )}
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
                                <div className="pb-3 sm:pb-4 space-y-3 sm:space-y-4">
                                  {link.megaMenu.columns.map((column, idx) => {
                                    const ColumnIcon = column.icon;
                                    return (
                                      <div key={idx}>
                                        <h4 className="text-[#ece3d4] text-xs sm:text-sm font-semibold mb-1 sm:mb-2 px-2 flex items-center gap-2">
                                          {ColumnIcon && <ColumnIcon className="w-3 h-3 sm:w-4 sm:h-4" />}
                                          {column.title}
                                        </h4>
                                        <ul className="space-y-1 sm:space-y-2">
                                          {column.links.map((item) => (
                                            <li key={item.name}>
                                              <Link
                                                to={item.href}
                                                className="block px-2 py-1.5 sm:py-2 text-[#e9ddc8]/80 hover:bg-[#e9ddc8]/10 rounded-lg transition-colors text-xs sm:text-sm"
                                                onClick={() => {
                                                  setIsOpen(false);
                                                  window.scrollTo(0, 0);
                                                }}
                                              >
                                                {item.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    );
                                  })}
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
                          className="flex items-center gap-2 py-2 sm:py-3 text-[#e9ddc8] font-medium hover:text-white transition-colors text-sm sm:text-base"
                        >
                          {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                          {link.label}
                        </a>
                      )}
                    </div>
                  );
                })}

                {/* Mobile action buttons */}
                <div className="pt-3 sm:pt-4 grid grid-cols-2 gap-2 sm:gap-3">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to={getDashboardLink()}
                        onClick={() => setIsOpen(false)}
                        className="bg-[#e9ddc8] text-[#502d13] px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-center hover:bg-white transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                      >
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsOpen(false);
                        }}
                        className="bg-transparent border border-[#e9ddc8]/30 text-[#e9ddc8] px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-center hover:bg-[#e9ddc8]/10 transition-colors text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
                      >
                        <LogIn className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="bg-[#e9ddc8] text-[#502d13] px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-center hover:bg-white transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                      >
                        <LogIn className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/admin/login"
                        onClick={() => setIsOpen(false)}
                        className="bg-transparent border border-[#e9ddc8]/30 text-[#e9ddc8] px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-center hover:bg-[#e9ddc8]/10 transition-colors text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2"
                      >
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>Admin</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Search Modal - Responsive */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-xl z-[60] flex items-start justify-center px-3 sm:px-4 pt-12 sm:pt-16 md:pt-24"
            onClick={() => setShowSearch(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full max-w-lg sm:max-w-xl md:max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#e9ddc8] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-1.5 sm:p-2 flex items-center gap-1 sm:gap-2">
                  <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#502d13] ml-2 sm:ml-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search materials, equipment, contractors..."
                    className="flex-1 bg-transparent border-none outline-none text-[#502d13] placeholder-[#502d13]/50 py-2 sm:py-3 text-xs sm:text-sm md:text-base"
                    autoFocus
                  />
                  <button
                    onClick={() => setShowSearch(false)}
                    className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-[#502d13] text-[#e9ddc8] rounded-lg sm:rounded-xl hover:bg-[#7b4a26] transition-colors text-xs sm:text-sm whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>

                <div className="hidden sm:block px-3 sm:px-4 pb-3 sm:pb-4">
                  <p className="text-[#502d13]/50 text-xs mb-1 sm:mb-2">
                    Popular searches:
                  </p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {[
                      "Cement",
                      "JCB",
                      "TMT Steel",
                      "Contractors",
                      "Scaffolding",
                    ].map((item) => (
                      <button
                        key={item}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#502d13]/10 text-[#502d13] text-xs rounded-full hover:bg-[#502d13]/20 transition-colors"
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
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;