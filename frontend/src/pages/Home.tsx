import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Shield, Clock, Globe, Users, Zap, Star, ChevronLeft, BarChart3, Award, Target, ArrowUpRight, CheckCircle, Sparkles } from 'lucide-react';

function useCountUp(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, end, duration]);

  return { count, ref };
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const stats = [
  { icon: Users, value: 15800, suffix: '+', label: 'عميل نشط', color: 'text-green-400', bg: 'bg-green-600/15' },
  { icon: BarChart3, value: 98, suffix: '%', label: 'نسبة رضا العملاء', color: 'text-amber-400', bg: 'bg-amber-600/15' },
  { icon: Globe, value: 12, suffix: '+', label: 'بورصة مدعومة', color: 'text-blue-400', bg: 'bg-blue-600/15' },
  { icon: Award, value: 8, suffix: '+', label: 'سنوات خبرة', color: 'text-purple-400', bg: 'bg-purple-600/15' },
];

function StatCard({ stat }: { stat: typeof stats[number] }) {
  const counter = useCountUp(stat.value, 2000);
  return (
    <div ref={counter.ref} className="glass rounded-2xl p-6 text-center card-hover group">
      <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
        <stat.icon className={`w-7 h-7 ${stat.color}`} />
      </div>
      <div className={`text-3xl md:text-4xl font-black ${stat.color}`}>
        {counter.count.toLocaleString()}{stat.suffix}
      </div>
      <div className="text-gray-400 text-sm mt-2 font-medium">{stat.label}</div>
    </div>
  );
}

const features = [
  { icon: Shield, title: 'استثمار آمن ومضمون', desc: 'نضمن لك حماية رأس المال بالكامل مع عوائد يومية ثابتة ومحددة مسبقاً', gradient: 'from-green-600/20 to-emerald-600/5' },
  { icon: TrendingUp, title: 'عوائد يومية فورية', desc: 'احصل على أرباحك بشكل يومي مع إمكانية السحب الفوري في أي وقت', gradient: 'from-blue-600/20 to-cyan-600/5' },
  { icon: BarChart3, title: 'تنويع المحافظ', desc: 'نستثمر في أكبر الشركات المدرجة في أسواق الخليج لتحقيق أفضل العوائد', gradient: 'from-amber-600/20 to-yellow-600/5' },
  { icon: Zap, title: 'تنفيذ فوري', desc: 'تنفيذ عمليات الاستثمار والسحب بسرعة فائقة على مدار الساعة', gradient: 'from-purple-600/20 to-violet-600/5' },
  { icon: Users, title: 'فريق خبراء', desc: 'فريق من المحللين والخبراء الماليين بخبرة تتجاوز 15 عاماً في الأسواق', gradient: 'from-rose-600/20 to-pink-600/5' },
  { icon: Globe, title: 'تغطية خليجية شاملة', desc: 'نغطي جميع أسواق الأسهم الخليجية: السعودية، دبي، أبوظبي، الكويت، قطر', gradient: 'from-teal-600/20 to-cyan-600/5' },
];

const testimonials = [
  { name: 'محمد العمري', country: 'السعودية', flag: '🇸🇦', text: 'تجربة استثمارية ممتازة، العوائد اليومية منتظمة والخدمة احترافية جداً. أنصح بها بشدة.', rating: 5 },
  { name: 'فاطمة الهاشمي', country: 'الإمارات', flag: '🇦🇪', text: 'أفضل منصة استثمارية في الخليج، الشفافية والمصداقية عالية جداً مع فريق دعم متميز.', rating: 5 },
  { name: 'خالد المطيري', country: 'الكويت', flag: '🇰🇼', text: 'عوائد مضمونة وسحب فوري بدون أي تأخير. أنصح الجميع بالاستثمار معهم.', rating: 5 },
  { name: 'نورة القحطاني', country: 'قطر', flag: '🇶🇦', text: 'فريق دعم متميز ومحترف، يجيبون على جميع استفساراتي بسرعة وكفاءة عالية.', rating: 5 },
];

const markets = [
  { name: 'تداول السعودية', code: 'TASI', value: '11,963.28', change: '+1.07%', up: true, flag: '🇸🇦' },
  { name: 'سوق دبي', code: 'DFM', value: '4,357.67', change: '-0.51%', up: false, flag: '🇦🇪' },
  { name: 'بورصة أبوظبي', code: 'ADX', value: '9,839.87', change: '+1.23%', up: true, flag: '🇦🇪' },
  { name: 'بورصة الكويت', code: 'KSE', value: '7,562.14', change: '+0.84%', up: true, flag: '🇰🇼' },
];

export default function Home() {
  const heroReveal = useReveal();
  const featuresReveal = useReveal();
  const testimonialsReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-green-500/8 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 left-10 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full pt-24 pb-16" ref={heroReveal.ref}>
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className={`flex-1 text-center lg:text-right ${heroReveal.visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-green-600/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-8 backdrop-blur-sm">
                <Sparkles className="w-4 h-4" />
                <span className="font-medium">منصة استثمار خليجية رائدة ومرخصة</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 leading-[1.15]">
                استثمر بذكاء في
                <br />
                <span className="text-gradient">أسواق الخليج</span>
                <br />
                <span className="text-gradient-gold">بعوائد يومية مضمونة</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
                شركة INVESTCORP CAPITAL تتيح لك الاستثمار الذكي في أسواق الأسهم الخليجية مع ضمان عوائد يومية محددة مسبقاً وحماية كاملة لرأس المال.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/plans"
                  className="group px-8 py-4 bg-gradient-to-l from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-green-600/25 hover:shadow-green-500/40 hover:scale-[1.02]"
                >
                  <TrendingUp className="w-5 h-5 group-hover:animate-pulse" />
                  ابدأ الاستثمار الآن
                  <ArrowUpRight className="w-4 h-4 opacity-60" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm"
                >
                  تواصل معنا
                  <ChevronLeft className="w-5 h-5" />
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start">
                {[
                  { icon: Shield, text: 'رأس مال محمي 100%' },
                  { icon: Clock, text: 'أرباح يومية مضمونة' },
                  { icon: Zap, text: 'دعم فني 24/7' },
                ].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <item.icon className="w-4 h-4 text-green-400" />
                    {item.text}
                  </span>
                ))}
              </div>
            </div>

            {/* Market ticker card */}
            <div className={`flex-1 hidden lg:block ${heroReveal.visible ? 'animate-fade-in-left delay-300' : 'opacity-0'}`}>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-br from-green-500/20 via-transparent to-amber-500/20 rounded-3xl blur-xl"></div>
                <div className="relative glass-strong rounded-3xl p-7 space-y-5">
                  {/* Main chart */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🇸🇦</span>
                      <span className="text-green-400 text-sm font-bold">مؤشر تداول السعودية</span>
                    </div>
                    <div className="text-left">
                      <span className="text-white font-black text-xl block">11,963.28</span>
                      <span className="text-green-400 text-xs font-bold">+127.84 (+1.07%)</span>
                    </div>
                  </div>
                  <div className="h-36 bg-gradient-to-t from-green-600/10 to-transparent rounded-2xl flex items-end p-4 gap-1">
                    {[35, 42, 38, 55, 48, 62, 58, 72, 65, 78, 72, 85, 80, 92, 88, 95, 90, 88, 92, 96].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-green-500/80 to-green-400/40 rounded-t-sm transition-all duration-700"
                        style={{ height: `${h}%` }}
                      ></div>
                    ))}
                  </div>

                  {/* Market tickers */}
                  <div className="grid grid-cols-2 gap-3">
                    {markets.slice(1).map((m, i) => (
                      <div key={i} className="bg-white/5 rounded-xl p-3.5 border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-sm">{m.flag}</span>
                          <span className="text-gray-400 text-xs font-medium">{m.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold text-sm">{m.value}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            m.up ? 'text-green-400 bg-green-600/15' : 'text-red-400 bg-red-600/15'
                          }`}>{m.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Live indicator */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-gray-500 text-xs">بيانات الأسواق محدثة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-500 text-xs">اسحب للأسفل</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Market ticker strip */}
      <div className="bg-slate-900 border-y border-white/5 py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6 overflow-x-auto hide-scrollbar">
            {markets.map((m, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                <span className="text-lg">{m.flag}</span>
                <div>
                  <span className="text-gray-400 text-xs block">{m.name} ({m.code})</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm">{m.value}</span>
                    <span className={`text-xs font-bold ${m.up ? 'text-green-400' : 'text-red-400'}`}>{m.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-900 relative" ref={featuresReveal.ref}>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${featuresReveal.visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-green-400 text-sm font-bold tracking-wider mb-3 block">المميزات</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
              لماذا <span className="text-gradient">INVESTCORP CAPITAL</span>؟
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">نقدم لك تجربة استثمارية متكاملة بأعلى معايير الأمان والشفافية</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`glass rounded-2xl p-7 card-hover group relative overflow-hidden ${
                  featuresReveal.visible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-green-600/15 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-green-600/25 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-green-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-wider mb-3 block">كيف يعمل</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">ابدأ في 4 خطوات بسيطة</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">عملية بسيطة وسريعة للبدء في تحقيق الأرباح اليومية</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', icon: Users, title: 'التسجيل', desc: 'قم بالتسجيل مجاناً واختر الباقة المناسبة لك', color: 'text-green-400', bg: 'bg-green-600/15' },
              { step: '02', icon: Target, title: 'الاشتراك', desc: 'اشترك في الباقة وقم بتحويل مبلغ الاستثمار', color: 'text-blue-400', bg: 'bg-blue-600/15' },
              { step: '03', icon: Zap, title: 'البدء', desc: 'يبدأ فريقنا بإدارة استثمارك فوراً وباحترافية', color: 'text-amber-400', bg: 'bg-amber-600/15' },
              { step: '04', icon: TrendingUp, title: 'الأرباح', desc: 'استلم أرباحك اليومية بشكل منتظم ومضمون', color: 'text-purple-400', bg: 'bg-purple-600/15' },
            ].map((s, i) => (
              <div key={i} className="text-center relative group">
                <div className={`w-20 h-20 ${s.bg} rounded-3xl flex items-center justify-center mx-auto mb-5 border border-white/5 group-hover:scale-110 transition-all duration-300 relative`}>
                  <s.icon className={`w-9 h-9 ${s.color}`} />
                  <span className={`absolute -top-2 -right-2 w-7 h-7 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center text-xs font-black ${s.color}`}>
                    {s.step}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-10 left-0 w-full h-px bg-gradient-to-l from-white/10 via-white/5 to-transparent -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 relative" ref={testimonialsReveal.ref}>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${testimonialsReveal.visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="text-amber-400 text-sm font-bold tracking-wider mb-3 block">آراء العملاء</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">ماذا يقول مستثمرونا؟</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">أكثر من 15,000 مستثمر يثقون في INVESTCORP CAPITAL</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`glass rounded-2xl p-7 card-hover relative overflow-hidden ${
                  testimonialsReveal.visible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-500/5 to-transparent rounded-bl-3xl"></div>
                <div className="relative">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed min-h-[80px]">"{t.text}"</p>
                  <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600/30 to-blue-600/30 flex items-center justify-center text-lg">
                      {t.flag}
                    </div>
                    <div>
                      <span className="text-white font-bold text-sm block">{t.name}</span>
                      <span className="text-gray-500 text-xs">{t.country}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="py-16 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { icon: Shield, title: 'حماية رأس المال', desc: 'ضمان كامل لاسترداد رأس المال في أي وقت بدون خصومات', color: 'text-green-400' },
                { icon: CheckCircle, title: 'شفافية تامة', desc: 'تقارير أداء يومية مفصلة ولوحة تحكم متكاملة لكل مستثمر', color: 'text-blue-400' },
                { icon: Award, title: 'شركة مرخصة', desc: 'شركة مسجلة ومرخصة وتعمل وفق أعلى معايير الحوكمة المالية', color: 'text-amber-400' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/5">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden" ref={ctaReveal.ref}>
        <div className="absolute inset-0 gradient-bg"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative ${ctaReveal.visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="w-20 h-20 bg-green-600/15 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse-glow">
            <Target className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">ابدأ رحلتك الاستثمارية اليوم</h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            انضم لأكثر من 15,000 مستثمر ناجح في منطقة الخليج العربي وابدأ في تحقيق أرباح يومية مضمونة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/plans"
              className="px-10 py-4 bg-gradient-to-l from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-xl shadow-green-600/30 hover:shadow-green-500/40 hover:scale-[1.02]"
            >
              <ArrowUpRight className="w-5 h-5" />
              اشترك الآن واستثمر
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 bg-white/5 border border-white/15 hover:border-white/30 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
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
