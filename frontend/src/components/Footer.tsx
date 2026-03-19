import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Mail, Instagram, Twitter, Linkedin, ShieldCheck, Globe, Send, Phone } from 'lucide-react';
import { api } from '../lib/api';

export default function Footer() {
  const [telegramUrl, setTelegramUrl] = useState('');
  const [supportEmail, setSupportEmail] = useState('support@investcorp-capital.com');
  const [supportPhone, setSupportPhone] = useState('+966 50 000 0000');

  useEffect(() => {
    Promise.all([
      api.get('/api/settings/telegram_url'),
      api.get('/api/settings/support_email'),
      api.get('/api/settings/support_phone')
    ]).then(([tgRes, emailRes, phoneRes]) => {
      setTelegramUrl(tgRes.data.value);
      setSupportEmail(emailRes.data.value);
      setSupportPhone(phoneRes.data.value);
    }).catch(() => {});
  }, []);
  return (
    <footer className="relative bg-slate-950 pt-20 pb-10 overflow-hidden" dir="rtl">
      {/* Abstract Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-600/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand section */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <span className="text-white font-black text-2xl block leading-none tracking-tight">INVESTCORP</span>
                <span className="text-[hsl(var(--accent))] text-xs font-bold block leading-none mt-1 uppercase tracking-widest">Capital Group</span>
              </div>
            </Link>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm">
              نحن الشريك الموثوق لاستثماراتك في أسواق المال الخليجية. نجمع بين الخبرة العميقة والتقنيات الحديثة لنحقق لك أفضل العوائد المستدامة.
            </p>
            <div className="flex gap-4">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary),0.3)] transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-black text-lg mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[hsl(var(--primary))] rounded-full" />
                روابط سريعة
              </h3>
              <ul className="space-y-4">
                {[
                  { name: 'الرئيسية', path: '/' },
                  { name: 'لماذا تستثمر معنا؟', path: '/why-invest' },
                  { name: 'باقات الاستثمار', path: '/plans' },
                  { name: 'تحليل السوق', path: '/market-analysis' },
                  { name: 'عن الشركة', path: '/about' },
                ].map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-400 hover:text-white hover:mr-2 transition-all duration-300 flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-600 rounded-full" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-black text-lg mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[hsl(var(--accent))] rounded-full" />
                الأسواق الرئيسية
              </h3>
              <ul className="space-y-4 text-gray-400">
                {[
                  { name: 'سوق الأسهم السعودية', ticker: 'TASI' },
                  { name: 'سوق دبي المالي', ticker: 'DFM' },
                  { name: 'سوق أبوظبي للأوراق المالية', ticker: 'ADX' },
                  { name: 'بورصة الكويت', ticker: 'BKR' },
                  { name: 'بورصة قطر', ticker: 'QSE' },
                ].map(market => (
                  <li key={market.ticker} className="flex items-center justify-between group">
                    <span className="group-hover:text-white transition-colors">{market.name}</span>
                    <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded font-mono text-gray-500 uppercase">{market.ticker}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-black text-lg mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-500 rounded-full" />
                تواصل مباشر
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-400 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-green-500/10 group-hover:text-green-500 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-bold">{supportEmail}</span>
                </li>
                <li className="flex items-center gap-3 text-gray-400 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="font-bold">{supportPhone}</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-black text-lg mb-8">التواصل السريع</h4>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                تواصل معنا عبر تليجرام للحصول على رد فوري واستشارات مالية مباشرة.
              </p>
              <a 
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="premium-btn premium-btn-primary w-full py-4 flex items-center justify-center gap-3 group"
              >
                <Send className="w-5 h-5" />
                <span>قناتنا على تليجرام</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full glass border-green-500/20 text-xs text-green-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>مرخص ومعتمد دولياً</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full glass border-blue-500/20 text-xs text-blue-400">
              <Globe className="w-3.5 h-3.5" />
              <span>تغطية خليجية شاملة</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 text-right">
            <p className="text-gray-500 text-xs">© 2025 INVESTCORP CAPITAL. جميع الحقوق محفوظة لشركة إنفستكورب كابيتال القابضة.</p>
            <div className="flex gap-4 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
              <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
              <a href="#" className="hover:text-white transition-colors">إخلاء المسؤولية</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
