import { Link } from 'react-router-dom';
import { CheckCircle, Star, ArrowUpRight, Shield, TrendingUp, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'الكويت',
    flag: '🇰🇼',
    minInvest: '500',
    maxProfit: '180',
    period: '60 يوم',
    popular: false,
    features: ['عوائد يومية مضمونة', 'سحب فوري', 'دعم على مدار الساعة', 'تقارير يومية', 'إدارة محترفة'],
    borderColor: 'border-blue-500/20',
    accentColor: 'text-blue-400',
  },
  {
    name: 'السعودية',
    flag: '🇸🇦',
    minInvest: '4,750',
    maxProfit: '1,800',
    period: '60 يوم',
    popular: false,
    features: ['عوائد يومية مضمونة', 'سحب فوري', 'دعم على مدار الساعة', 'تقارير يومية', 'إدارة محترفة', 'أولوية الدعم'],
    borderColor: 'border-green-500/20',
    accentColor: 'text-green-400',
  },
  {
    name: 'قطر',
    flag: '🇶🇦',
    minInvest: '7,200',
    maxProfit: '1,680',
    period: '60 يوم',
    popular: true,
    features: ['عوائد يومية مضمونة', 'سحب فوري', 'دعم على مدار الساعة', 'تقارير يومية', 'إدارة محترفة', 'مدير حساب خاص'],
    borderColor: 'border-green-500/40',
    accentColor: 'text-green-400',
  },
  {
    name: 'الإمارات',
    flag: '🇦🇪',
    minInvest: '5,750',
    maxProfit: '1,100',
    period: '60 يوم',
    popular: false,
    features: ['عوائد يومية مضمونة', 'سحب فوري', 'دعم على مدار الساعة', 'تقارير يومية', 'إدارة محترفة'],
    borderColor: 'border-amber-500/20',
    accentColor: 'text-amber-400',
  },
];

export default function Plans() {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero */}
      <section className="gradient-bg pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-green-600/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-6">
            <Crown className="w-4 h-4" />
            <span className="font-medium">باقات استثمارية متنوعة</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5">
            باقات <span className="text-gradient">الاستثمار</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            اختر الباقة المناسبة لك وابدأ رحلتك الاستثمارية مع أفضل العوائد المضمونة في أسواق الخليج
          </p>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl transition-all duration-500 group ${
                  plan.popular ? 'lg:-mt-4 lg:mb-4' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -inset-[1px] bg-gradient-to-b from-green-500/50 via-green-500/20 to-green-500/50 rounded-2xl blur-[1px]"></div>
                )}
                <div className={`relative glass rounded-2xl p-7 h-full flex flex-col card-hover ${
                  plan.popular ? 'border-green-500/40 bg-green-600/5' : ''
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-gradient-to-l from-green-600 to-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-lg shadow-green-600/30">
                      <Star className="w-3 h-3 fill-current" />
                      الأكثر طلباً
                    </div>
                  )}
                  <div className="text-center mb-6 pt-2">
                    <div className="text-5xl mb-3">{plan.flag}</div>
                    <h3 className="text-white font-black text-xl">{plan.name}</h3>
                    <span className="text-gray-500 text-xs">{plan.period}</span>
                  </div>

                  <div className="text-center mb-7 py-5 border-y border-white/5">
                    <div className="text-gray-400 text-xs mb-1 font-medium">الربح اليومي</div>
                    <div className="text-green-400 font-black text-4xl mb-3">{plan.maxProfit}<span className="text-lg mr-1">$</span></div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                      <span className="text-gray-500 text-xs">أقل استثمار</span>
                      <span className="text-white font-bold text-sm">{plan.minInvest}$</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-7 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`block text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-l from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white shadow-lg shadow-green-600/25 hover:shadow-green-500/40'
                        : 'border border-white/10 text-white hover:bg-white/5 hover:border-green-500/30'
                    }`}
                  >
                    اشترك الآن
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="text-green-400 text-sm font-bold tracking-wider mb-3 block">المميزات</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">مميزات جميع الباقات</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">ما يميز باقاتنا عن غيرها في السوق</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'ضمان رأس المال', desc: 'رأس مالك محمي بالكامل مع ضمان استرداده في أي وقت بدون خصومات أو رسوم إضافية', color: 'text-green-400', bg: 'bg-green-600/15' },
              { icon: TrendingUp, title: 'عوائد يومية ثابتة', desc: 'أرباح يومية محددة مسبقاً ومضمونة طوال فترة الاستثمار مع تقارير أداء شفافة', color: 'text-blue-400', bg: 'bg-blue-600/15' },
              { icon: Zap, title: 'سحب فوري', desc: 'إمكانية سحب الأرباح أو رأس المال في أي وقت دون قيود أو فترات انتظار', color: 'text-amber-400', bg: 'bg-amber-600/15' },
            ].map((f, i) => (
              <div key={i} className="glass rounded-2xl p-8 text-center card-hover group">
                <div className={`w-16 h-16 ${f.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className={`w-8 h-8 ${f.color}`} />
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="w-20 h-20 bg-green-600/15 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Crown className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">مستعد للاستثمار؟</h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">تواصل معنا الآن لاختيار الباقة المثالية لك والبدء في تحقيق الأرباح</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-l from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-green-600/30 hover:shadow-green-500/40 hover:scale-[1.02]">
              <ArrowUpRight className="w-5 h-5" />
              تواصل معنا الآن
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
