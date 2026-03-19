import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'الرئيسية', path: '/' },
  { name: 'لماذا نحن؟', path: '/why-invest' },
  { name: 'باقات الاستثمار', path: '/plans' },
  { name: 'تداول مباشر', path: '/trading' },
  { name: 'تحليل السوق', path: '/market-analysis' },
  { name: 'خدماتنا', path: '/services' },
  { name: 'عن الشركة', path: '/about' },
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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2 px-4' : 'py-4 px-6'
      }`}
    >
      <div 
        className={`max-w-7xl mx-auto rounded-3xl transition-all duration-500 ${
          scrolled ? 'glass px-6 py-2' : 'px-4 py-2'
        }`}
      >
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <span className="text-white font-black text-xl block leading-none tracking-tight">INVESTCORP</span>
              <span className="text-[hsl(var(--accent))] text-[10px] font-bold block leading-none mt-1 uppercase tracking-widest">Capital Group</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2" dir="rtl">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 relative group ${
                  location.pathname === link.path
                    ? 'text-[hsl(var(--primary))]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[hsl(var(--primary))] rounded-full animate-fade-in" />
                )}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-right" />
              </Link>
            ))}
            
            <div className="h-6 w-[1px] bg-white/10 mx-2" />
            
            <Link
              to="/client-login"
              className="premium-btn premium-btn-primary py-2.5 px-6 text-sm flex items-center gap-2"
            >
              <span>دخول المستثمر</span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl glass text-white transition-all active:scale-95"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div 
        className={`lg:hidden fixed inset-x-4 top-20 transition-all duration-500 transform ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-slate-900/98 border border-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl shadow-black/50 space-y-2 overflow-hidden" dir="rtl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-2xl text-base font-bold transition-all ${
                location.pathname === link.path
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-white/10">
            <Link
              to="/client-login"
              onClick={() => setIsOpen(false)}
              className="block w-full premium-btn premium-btn-primary text-center py-4"
            >
              دخول المستثمر
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
