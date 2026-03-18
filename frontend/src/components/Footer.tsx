import { Link } from 'react-router-dom';
import { TrendingUp, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="gradient-bg text-white border-t border-white/10" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-gold flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-slate-900" />
              </div>
              <div>
                <span className="font-bold text-lg block leading-tight">INVESTCORP CAPITAL</span>
                <span className="text-amber-400 text-xs block leading-tight">للاستثمار الخليجي</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              شركة رائدة في مجال الاستثمار في أسواق الأسهم الخليجية، نقدم باقات استثمارية مضمونة بعوائد يومية محددة مسبقاً.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-green-400">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">الرئيسية</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors text-sm">خدماتنا</Link></li>
              <li><Link to="/plans" className="text-gray-400 hover:text-white transition-colors text-sm">باقات الاستثمار</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">عن الشركة</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">تواصل معنا</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-green-400">الأسواق</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>تداول السعودية (TASI)</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>سوق دبي المالي (DFM)</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>بورصة أبوظبي (ADX)</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>بورصة الكويت (KSE)</li>
              <li className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span>بورصة قطر (QSE)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-green-400">تواصل معنا</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-400" /> +971 50 123 4567</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-green-400" /> info@investcorp-capital.com</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-400" /> دبي، الإمارات العربية المتحدة</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2025 INVESTCORP CAPITAL للاستثمار. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1">استثمار آمن ومضمون</span>
            <span className="flex items-center gap-1">أفضل عوائد في الخليج</span>
            <span className="flex items-center gap-1">خدمة دولية متميزة</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
