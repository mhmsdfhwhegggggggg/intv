import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, LogIn } from 'lucide-react';

const navLinks = [
  { name: 'الرئيسية', path: '/' },
  { name: 'خدماتنا', path: '/services' },
  { name: 'باقات الاستثمار', path: '/plans' },
  { name: 'عن الشركة', path: '/about' },
  { name: 'الأسئلة الشائعة', path: '/faq' },
  { name: 'تواصل معنا', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/5' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl gradient-gold flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300 group-hover:scale-105">
              <TrendingUp className="w-6 h-6 text-slate-900" />
            </div>
            <div className="text-right">
              <span className="text-white font-black text-lg block leading-tight tracking-wide">INVESTCORP</span>
              <span className="text-amber-400/80 text-[10px] block leading-tight font-medium">CAPITAL للاستثمار الخليجي</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1" dir="rtl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-green-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 right-1/2 translate-x-1/2 w-5 h-0.5 bg-green-400 rounded-full"></span>
                )}
              </Link>
            ))}
            <Link
              to="/client-login"
              className="mr-3 px-5 py-2.5 bg-gradient-to-l from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-green-500/40 flex items-center gap-2 hover:scale-105"
            >
              <LogIn className="w-4 h-4" />
              دخول المستثمر
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2.5 rounded-xl hover:bg-white/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`lg:hidden transition-all duration-400 overflow-hidden ${
        isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-slate-900/98 backdrop-blur-xl border-t border-white/10 px-4 py-4 space-y-1" dir="rtl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                location.pathname === link.path
                  ? 'bg-green-600/15 text-green-400 border border-green-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/client-login"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-3 bg-gradient-to-l from-green-600 to-green-500 text-white rounded-xl text-sm font-bold text-center mt-3 shadow-lg shadow-green-600/25"
          >
            دخول المستثمر
          </Link>
        </div>
      </div>
    </nav>
  );
}
