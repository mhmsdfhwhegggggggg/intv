import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Clock, Globe, Users, Zap, Star, ChevronLeft, BarChart3, Award, Target, ArrowUpRight } from 'lucide-react';

const stats = [
  { icon: Users, value: '+15,800', label: 'عميل نشط', color: 'text-green-400' },
  { icon: BarChart3, value: '+98', label: 'إجمالي العوائد المحققة', color: 'text-amber-400' },
  { icon: Globe, value: '+12', label: 'بورصة مدعومة', color: 'text-blue-400' },
  { icon: Award, value: '+8', label: 'سنوات خبرة', color: 'text-purple-400' },
];

const features = [
  { icon: Shield, title: 'استثمار آمن ومضمون', desc: 'نضمن لك حماية رأس المال بالكامل مع عوائد يومية ثابتة ومحددة مسبقاً' },
  { icon: TrendingUp, title: 'عوائد يومية فورية', desc: 'احصل على أرباحك بشكل يومي مع إمكانية السحب الفوري في أي وقت' },
  { icon: BarChart3, title: 'تنويع المحافظ', desc: 'نستثمر في أكبر الشركات المدرجة في أسواق الخليج لتحقيق أفضل العوائد' },
  { icon: Zap, title: 'تنفيذ فوري', desc: 'تنفيذ عمليات الاستثمار والسحب بسرعة فائقة على مدار الساعة' },
  { icon: Users, title: 'فريق خبراء', desc: 'فريق من المحللين والخبراء الماليين بخبرة تتجاوز 15 عاماً في الأسواق' },
  { icon: Globe, title: 'تغطية خليجية', desc: 'نغطي جميع أسواق الأسهم الخليجية: السعودية، دبي، أبوظبي، الكويت، قطر' },
];

const testimonials = [
  { name: 'محمد العمري', country: 'السعودية', text: 'تجربة استثمارية ممتازة، العوائد اليومية منتظمة والخدمة احترافية', rating: 5 },
  { name: 'فاطمة الهاشمي', country: 'الإمارات', text: 'أفضل منصة استثمارية في الخليج، الشفافية والمصداقية عالية جداً', rating: 5 },
  { name: 'خالد المطيري', country: 'الكويت', text: 'عوائد مضمونة وسحب فوري، أنصح الجميع بالاستثمار معهم', rating: 5 },
  { name: 'نورة القحطاني', country: 'قطر', text: 'فريق دعم متميز ومحترف، يجيبون على جميع استفساراتي بسرعة', rating: 5 },
];

export default function Home() {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="gradient-bg pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-right">
              <div className="inline-block px-4 py-1 bg-green-600/20 border border-green-500/30 rounded-full text-green-400 text-sm mb-6">
                منصة استثمار خليجية رائدة
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                إستثمر في<br />
                <span className="text-gradient">أسواق الخليج</span><br />
                بعوائد يومية مضمونة
              </h1>
              <p className="text-gray-400 text-lg mb-8 max-w-xl">
                شركة INVESTCORP CAPITAL تتيح لك الاستثمار الذكي في أسواق الأسهم الخليجية (تداول - دبي - أبوظبي) مع ضمان عوائد يومية محددة مسبقاً.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/plans"
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-600/30 hover:shadow-green-600/50"
                >
                  <TrendingUp className="w-5 h-5" />
                  ابدأ الاستثمار الآن
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3 border border-white/20 hover:border-white/40 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
                >
                  تواصل معنا
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start text-sm text-gray-400">
                <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-green-400" /> رأس مال محمي 100%</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-green-400" /> أرباح يومية مضمونة</span>
                <span className="flex items-center gap-1"><Zap className="w-4 h-4 text-green-400" /> دعم 24/7</span>
              </div>
            </div>
            <div className="flex-1 hidden lg:block">
              <div className="glass rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 text-sm font-bold">مؤشر تداول السعودية - TASI</span>
                  <span className="text-white font-bold text-xl">11,963.28 <span className="text-green-400 text-sm">+1.07%</span></span>
                </div>
                <div className="h-32 bg-gradient-to-r from-green-600/20 to-green-400/5 rounded-xl flex items-end p-4">
                  {[40, 55, 45, 60, 50, 70, 65, 80, 75, 85, 78, 90, 85, 95, 88].map((h, i) => (
                    <div key={i} className="flex-1 mx-0.5 bg-green-500/60 rounded-t" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-xl p-3">
                    <span className="text-gray-400 text-xs">سوق دبي - DFM</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-white font-bold">4,357.67</span>
                      <span className="text-red-400 text-xs">-0.51%</span>
                    </div>
                  </div>
                  <div className="glass rounded-xl p-3">
                    <span className="text-gray-400 text-xs">بورصة أبوظبي - ADX</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-white font-bold">9,839.87</span>
                      <span className="text-green-400 text-xs">+1.23%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">لماذا INVESTCORP CAPITAL؟</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="glass rounded-xl p-6 hover:border-green-500/30 transition-all group">
                <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-600/30 transition-colors">
                  <feature.icon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">آراء مستثمرينا</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="glass rounded-xl p-6 hover:border-green-500/30 transition-all">
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">"{t.text}"</p>
                <div className="border-t border-white/10 pt-3">
                  <span className="text-white font-bold text-sm">{t.name}</span>
                  <span className="text-gray-500 text-xs block">{t.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Target className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">ابدأ رحلتك الاستثمارية اليوم</h2>
          <p className="text-gray-400 text-lg mb-8">انضم لأكثر من 15,000 مستثمر ناجح في منطقة الخليج العربي</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/plans"
              className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-600/30"
            >
              <ArrowUpRight className="w-5 h-5" />
              اشترك الآن مجاناً
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-white/20 hover:border-white/40 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              تواصل عبر تليغرام
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
