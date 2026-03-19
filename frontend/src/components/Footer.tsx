import { Link } from 'react-router-dom';
import { TrendingUp, Phone, Mail, MapPin, MessageCircle, Send, Shield, Award, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative text-white border-t border-white/5 overflow-hidden" dir="rtl">
      {/* Background decorations */}
      <div className="absolute inset-0 gradient-bg"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-b border-white/5">
          {[
            { icon: Shield, text: 'استثمار آمن ومضمون 100%' },
            { icon: Award, text: 'أفضل عوائد في أسواق الخليج' },
            { icon: Clock, text: 'دعم فني متواصل 24/7' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-3 py-3">
              <item.icon className="w-5 h-5 text-green-400" />
              <span className="text-gray-300 text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shadow-lg shadow-amber-500/20">
                <TrendingUp className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <span className="font-black text-lg block leading-tight tracking-wide">INVESTCORP</span>
                <span className="text-amber-400/80 text-xs block leading-tight font-medium">CAPITAL للاستثمار الخليجي</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              شركة رائدة في مجال الاستثمار في أسواق الأسهم الخليجية منذ 2017، نقدم باقات استثمارية مضمونة بعوائد يومية محددة مسبقاً.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-green-600/20 border border-white/10 hover:border-green-500/30 flex items-center justify-center transition-all duration-300 group">
                <MessageCircle className="w-4 h-4 text-gray-400 group-hover:text-green-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/30 flex items-center justify-center transition-all duration-300 group">
                <Send className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 hover:bg-amber-600/20 border border-white/10 hover:border-amber-500/30 flex items-center justify-center transition-all duration-300 group">
                <Mail className="w-4 h-4 text-gray-400 group-hover:text-amber-400" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base mb-5 text-white flex items-center gap-2">
              <span className="w-1.5 h-5 bg-green-500 rounded-full"></span>
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'الرئيسية' },
                { to: '/services', label: 'خدماتنا' },
                { to: '/plans', label: 'باقات الاستثمار' },
                { to: '/about', label: 'عن الشركة' },
                { to: '/faq', label: 'الأسئلة الشائعة' },
                { to: '/contact', label: 'تواصل معنا' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-green-400 transition-colors"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-5 text-white flex items-center gap-2">
              <span className="w-1.5 h-5 bg-green-500 rounded-full"></span>
              الأسواق المدعومة
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { flag: '🇸🇦', name: 'تداول السعودية (TASI)' },
                { flag: '🇦🇪', name: 'سوق دبي المالي (DFM)' },
                { flag: '🇦🇪', name: 'بورصة أبوظبي (ADX)' },
                { flag: '🇰🇼', name: 'بورصة الكويت (KSE)' },
                { flag: '🇶🇦', name: 'بورصة قطر (QSE)' },
              ].map((market, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-400">
                  <span className="text-base">{market.flag}</span>
                  {market.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-5 text-white flex items-center gap-2">
              <span className="w-1.5 h-5 bg-green-500 rounded-full"></span>
              تواصل معنا
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-600/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <span className="text-gray-500 text-xs block">الهاتف</span>
                  <span className="text-gray-300">+971 50 123 4567</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-600/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <span className="text-gray-500 text-xs block">البريد الإلكتروني</span>
                  <span className="text-gray-300">info@investcorp-capital.com</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-600/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <span className="text-gray-500 text-xs block">المقر الرئيسي</span>
                  <span className="text-gray-300">دبي، الإمارات العربية المتحدة</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} INVESTCORP CAPITAL للاستثمار. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <Link to="/faq" className="hover:text-gray-400 transition-colors">سياسة الخصوصية</Link>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <Link to="/faq" className="hover:text-gray-400 transition-colors">الشروط والأحكام</Link>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <Link to="/contact" className="hover:text-gray-400 transition-colors">الدعم الفني</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
