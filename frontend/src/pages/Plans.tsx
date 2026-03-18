import { Link } from 'react-router-dom';
import { CheckCircle, Star, ArrowUpRight } from 'lucide-react';

const plans = [
  {
    name: 'الإمارات',
    flag: '🇦🇪',
    minInvest: '5,750',
    maxProfit: '1,100',
    period: '60 يوم',
    popular: false,
    features: ['عوائد يومية مضمونة', 'سحب فوري', 'دعم على مدار الساعة', 'تقارير يومية', 'إدارة محترفة'],
  },
  {
    name: 'الكويت',
    flag: '🇰🇼',
    minInvest: '500',
    maxProfit: '180',
    period: '60 يوم',
    popular: false,
    features: ['عوائد يومية مضمونة', 'سحب فوري', 'دعم على مدار الساعة', 'تقارير يومية', 'إدارة محترفة'],
  },
  {
    name: 'قطر',
    flag: '🇶🇦',
    minInvest: '7,200',
    maxProfit: '1,680',
    period: '60 يوم',
    popular: true,
    features: ['عوائد يومية مضمونة', 'سحب فوري', 'دعم على مدار الساعة', 'تقارير يومية', 'إدارة محترفة', 'مدير حساب خاص'],
  },
  {
    name: 'السعودية',
    flag: '🇸🇦',
    minInvest: '4,750',
    maxProfit: '1,800',
    period: '60 يوم',
    popular: false,
    features: ['عوائد يومية مضمونة', 'سحب فوري', 'دعم على مدار الساعة', 'تقارير يومية', 'إدارة محترفة', 'أولوية الدعم'],
  },
];

export default function Plans() {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero */}
      <section className="gradient-bg pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">باقات الاستثمار</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">اختر الباقة المناسبة لك وابدأ رحلتك الاستثمارية مع أفضل العوائد في أسواق الخليج</p>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mt-6"></div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`glass rounded-2xl p-6 relative hover:scale-105 transition-all duration-300 ${
                  plan.popular ? 'border-green-500/50 ring-2 ring-green-500/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    الأكثر طلباً
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{plan.flag}</div>
                  <h3 className="text-white font-bold text-xl">{plan.name}</h3>
                </div>
                <div className="text-center mb-6">
                  <div className="text-gray-400 text-sm mb-1">ربح يومي</div>
                  <div className="text-green-400 font-black text-2xl">{plan.maxProfit} $</div>
                  <div className="text-gray-500 text-xs mt-2">أقل استثمار</div>
                  <div className="text-white font-bold">{plan.minInvest} $</div>
                  <div className="text-gray-500 text-xs mt-1">{plan.period}</div>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block text-center py-3 rounded-xl font-bold text-sm transition-all ${
                    plan.popular
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/30'
                      : 'border border-green-500/30 text-green-400 hover:bg-green-600/10'
                  }`}
                >
                  عرض الباقات
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">مميزات جميع الباقات</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'ضمان رأس المال', desc: 'رأس مالك محمي بالكامل مع ضمان استرداده في أي وقت' },
              { title: 'عوائد يومية ثابتة', desc: 'أرباح يومية محددة مسبقاً ومضمونة طوال فترة الاستثمار' },
              { title: 'سحب فوري', desc: 'إمكانية سحب الأرباح أو رأس المال في أي وقت دون قيود' },
            ].map((f, i) => (
              <div key={i} className="glass rounded-xl p-8 text-center">
                <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">مستعد للاستثمار؟</h2>
          <p className="text-gray-400 mb-8">تواصل معنا الآن لاختيار الباقة المثالية لك</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-600/30">
            <ArrowUpRight className="w-5 h-5" />
            تواصل معنا
          </Link>
        </div>
      </section>
    </div>
  );
}
