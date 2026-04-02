// src/components/layout/Navbar.tsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search, User, LogIn, Package, Wrench, LogOut } from 'lucide-react';
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
  const [userName, setUserName] = useState<string>('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to detect if device is likely touch‑capable
  const isTouchDevice = useRef(
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  ).current;

  // ✅ NEW: Sync authentication state across tabs / window focus
  useEffect(() => {
    const syncAuth = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const type = localStorage.getItem('userType');
      const name = localStorage.getItem('userName') || '';

      setIsLoggedIn(loggedIn);
      setUserType(type);
      setUserName(name);
    };

    syncAuth(); // initial sync

    window.addEventListener('storage', syncAuth);
    window.addEventListener('focus', syncAuth);

    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('focus', syncAuth);
    };
  }, []);

  // Scroll & resize effects (and close menus on scroll)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (activeMegaMenu) setActiveMegaMenu(null);
    };
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
        setMobileMenuOpen(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeMegaMenu]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setShowSearch(false);
        setActiveMegaMenu(null);
        setProfileDropdownOpen(false);
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
    setUserName('');
    setProfileDropdownOpen(false);
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
    switch (userType) {
      case 'seller': return '/seller/dashboard';
      case 'contractor': return '/contractor/dashboard';
      case 'rental': return '/rental/dashboard';
      default: return '/member';
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
      icon: User,
    },
    {
      label: "Contact",
      href: "#contact",
      icon: null,
    },
  ];

  const isDesktop = windowWidth >= 1024;

  // Toggle mega menu on click (for touch devices and as an alternative for mouse)
  const handleMegaMenuToggle = (label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTouchDevice || !isDesktop) {
      setActiveMegaMenu(activeMegaMenu === label ? null : label);
    } else {
      // For mouse on desktop, we keep hover – but if user clicks, close it
      setActiveMegaMenu(null);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#502d13]/95 backdrop-blur-md shadow-lg' : 'bg-[#502d13]'
          }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <Link to="/" onClick={() => window.scrollTo(0, 0)} className="flex items-center space-x-1 sm:space-x-2 group shrink-0">
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
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-[#e9ddc8] group-hover:text-white transition-colors truncate">
                CASA TERMINAL
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    // Only open mega menu on hover if it's a desktop mouse device
                    if (!isTouchDevice && isDesktop && link.megaMenu) {
                      setActiveMegaMenu(link.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isTouchDevice && isDesktop) {
                      setActiveMegaMenu(null);
                    }
                  }}
                >
                  {link.megaMenu ? (
                    <button
                      onClick={(e) => {
                        // For touch devices or if we want to allow click toggling
                        if (isTouchDevice || !isDesktop) {
                          handleMegaMenuToggle(link.label, e);
                        } else {
                          // For mouse desktop: click can be used to go to services section
                          scrollToSection('services');
                        }
                      }}
                      className="text-[#e9ddc8]/90 hover:text-white font-medium transition-colors relative group flex items-center gap-1 text-sm xl:text-base px-2 xl:px-3 py-2"
                      aria-expanded={activeMegaMenu === link.label}
                    >
                      {link.label}
                      <ChevronDown className={`w-3 h-3 xl:w-4 xl:h-4 transition-transform duration-300 ${activeMegaMenu === link.label ? 'rotate-180' : ''
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

                  {/* Mega Menu */}
                  <AnimatePresence>
                    {link.megaMenu &&
                      activeMegaMenu === link.label &&
                      isDesktop && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-screen max-w-[700px] sm:max-w-[600px] xl:max-w-[700px] bg-[#502d13] rounded-lg shadow-xl border border-[#e9ddc8]/20 overflow-hidden"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 xl:p-6">
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

            {/* Action Icons */}
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

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="p-1.5 sm:p-2 rounded-lg text-[#e9ddc8] hover:bg-[#e9ddc8]/10 transition-colors flex items-center justify-center"
                  aria-label="Profile"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#e9ddc8] rounded-full flex items-center justify-center">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#502d13]" />
                  </div>
                </button>

                <AnimatePresence>
                  {profileDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    >
                      {isLoggedIn ? (
                        <>
                          <div className="p-3 border-b bg-gray-50">
                            <p className="font-medium text-gray-800 truncate">{userName || 'User'}</p>
                            <p className="text-xs text-gray-500 capitalize">{userType}</p>
                          </div>
                          <div className="p-2">
                            <Link
                              to={getDashboardLink()}
                              onClick={() => setProfileDropdownOpen(false)}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                              <User className="w-4 h-4" />
                              Dashboard
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <LogOut className="w-4 h-4" />
                              Logout
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="p-2">
                          <Link
                            to="/login"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                          >
                            <LogIn className="w-4 h-4" />
                            User Login
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

             {/* Login/Logout Button - Redesigned */}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="group flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full 
                             bg-white/10 backdrop-blur-sm border border-white/20
                             text-[#e9ddc8] hover:text-white hover:bg-red-500/80 
                             hover:border-red-400 transition-all duration-200
                             font-medium text-sm sm:text-base shadow-sm"
                >
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2 rounded-full 
                             bg-[#e9ddc8] text-[#502d13] hover:bg-white hover:shadow-md
                             border border-[#d4c4a8] transition-all duration-200
                             font-medium text-sm sm:text-base"
                >
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}

              {/* Mobile Menu Button */}
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

        {/* Mobile Menu */}
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
                                // For mobile, we want to open the accordion, not scroll
                                toggleMobileMenu(link.label);
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
                                className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${mobileMenuOpen === link.label ? "rotate-180" : ""
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
                        <LogOut className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsOpen(false)}
                        className="bg-[#e9ddc8] text-[#502d13] px-3 sm:px- py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-center hover:bg-white transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                      >
                        <LogIn className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>User Login</span>
                      </Link>
                    </>
                  )}
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