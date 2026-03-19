import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Shield, Clock, Globe, Users, Zap, Star, 
  ChevronLeft, BarChart3, Award, Target, ArrowUpRight, 
  CheckCircle2, PlayCircle, BarChart, PieChart, Activity,
  ShieldCheck, BadgeCheck
} from 'lucide-react';

const stats = [
  { icon: Users, value: '+15,800', label: 'عميل نشط', color: 'text-green-400' },
  { icon: BarChart3, value: '+98%', label: 'إجمالي العوائد', color: 'text-amber-400' },
  { icon: Globe, value: '+12', label: 'بورصة مدعومة', color: 'text-blue-400' },
  { icon: Award, value: '+8', label: 'سنوات خبرة', color: 'text-purple-400' },
];

const features = [
  { icon: Shield, title: 'استثمار آمن ومضمون', desc: 'نضمن لك حماية رأس المال بالكامل مع عوائد يومية ثابتة ومحددة مسبقاً' },
  { icon: TrendingUp, title: 'عوائد يومية فورية', desc: 'احصل على أرباحك بشكل يومي مع إمكانية السحب الفوري في أي وقت' },
  { icon: BarChart, title: 'تنويع المحافظ', desc: 'نستثمر في أكبر الشركات المدرجة في أسواق الخليج لتحقيق أفضل العוائد' },
  { icon: Zap, title: 'تنفيذ فوري', desc: 'تنفيذ عمليات الاستثمار والسحب بسرعة فائقة على مدار الساعة' },
  { icon: Users, title: 'فريق خبراء', desc: 'فريق من المحللين والخبراء الماليين بخبرة تتجاوز 15 عاماً في الأسواق' },
  { icon: Target, title: 'تغطية خليجية', desc: 'نغطي جميع أسواق الأسهم الخليجية: السعودية، دبي، أبوظبي، الكويت، قطر' },
];

export default function Home() {
  const [markets, setMarkets] = useState([
    { name: 'TADAWUL', symbol: 'SAU', price: 12450.2, change: 1.07, up: true },
    { name: 'DFM', symbol: 'DXB', price: 4102.5, change: 0.85, up: true },
    { name: 'ADX', symbol: 'AUH', price: 9234.8, change: -0.32, up: false },
    { name: 'KSE', symbol: 'KWT', price: 7450.4, change: 1.23, up: true },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets(current => current.map(m => {
        const volatility = 0.0005;
        const movement = (Math.random() - 0.5) * 2 * volatility;
        const newPrice = m.price * (1 + movement);
        const newChange = m.change + (movement * 100);
        return {
          ...m,
          price: newPrice,
          change: newChange,
          up: newChange >= 0
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen selection:bg-green-500/30" dir="rtl">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-mesh">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-right animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass border-green-500/20 text-green-400 text-sm font-bold mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                مستقبلك الاستثماري يبدأ من هنا
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white mb-8 leading-[1.15]">
                تحكم في <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-600">ثروتك</span><br />
                بضمانات خليجية معتمدة
              </h1>
              
              <p className="text-gray-400 text-xl mb-10 leading-relaxed max-w-2xl">
                نحن لسنا مجرد منصة، نحن شريكك الاستراتيجي في قلب الاقتصاد الخليجي. استثمر بكل ثقة مع أول شركة مرخصة تقدم ضمانات كاملة على رأس المال وعوائد يومية حقيقية.
              </p>

              <div className="flex flex-wrap gap-5">
                <Link to="/plans" className="premium-btn premium-btn-primary px-10 py-4 text-lg flex items-center gap-3">
                  <span>اشترك في باقة استثمارية</span>
                  <ChevronLeft className="w-6 h-6" />
                </Link>
                <Link to="/why-invest" className="premium-btn premium-btn-secondary px-8 py-4 text-lg flex items-center gap-3">
                  <PlayCircle className="w-6 h-6 text-green-500" />
                  <span>عن الشركة والضمانات</span>
                </Link>
              </div>

              <div className="mt-12 flex items-center gap-8 border-t border-white/5 pt-8">
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-green-500" />
                    <span className="text-white font-bold text-sm">اعتمادات خليجية رسمية</span>
                 </div>
                 <div className="w-px h-6 bg-white/10" />
                 <div className="flex items-center gap-3">
                    <BadgeCheck className="w-6 h-6 text-amber-500" />
                    <span className="text-white font-bold text-sm">ضمان رأس المال 100%</span>
                 </div>
              </div>
            </div>

            <div className="flex-1 w-full lg:max-w-xl animate-fade-in delay-300">
               {/* Market Live Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {markets.map((market, i) => (
                    <div key={i} className="glass p-5 rounded-3xl border-white/5 relative overflow-hidden group">
                       <div className="flex justify-between items-start mb-4">
                          <span className="text-white font-black text-sm">{market.name}</span>
                          <span className={`text-[10px] font-bold ${market.up ? 'text-green-500' : 'text-red-500'}`}>
                            {market.change > 0 ? '+' : ''}{market.change.toFixed(2)}%
                          </span>
                       </div>
                       <div className="text-white text-xl font-black mb-1 tabular-nums">
                        {market.price.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                       </div>
                       <div className="text-gray-500 text-[10px] uppercase font-bold">{market.symbol} Market</div>
                       <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-30 ${market.up ? 'from-green-500 to-transparent' : 'from-red-500 to-transparent'}`} />
                    </div>
                  ))}
               </div>
               
               {/* Main Visual Card */}
               <div className="mt-6 glass rounded-[3rem] p-8 relative overflow-hidden group border-green-500/10">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                           <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                           <h3 className="text-white font-bold">النمو التراكمي للمحافظ</h3>
                           <p className="text-gray-500 text-xs">آخر 24 ساعة في البورصات الخليجية</p>
                        </div>
                     </div>
                     <div className="text-green-400 font-black text-2xl">+2.45%</div>
                  </div>
                  <div className="h-32 flex items-end gap-1.5 mb-2">
                    {[35, 50, 40, 65, 55, 80, 70, 90, 85, 95, 80, 100, 90].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-green-600/40 to-green-400 rounded-t-lg transition-all duration-1000 origin-bottom"
                        style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 relative z-20 -mt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass rounded-[2rem] p-1 shadow-2xl overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-x-reverse divide-white/5">
              {stats.map((stat, i) => (
                <div key={i} className="p-8 text-center group">
                  <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-4 group-hover:scale-125 transition-transform duration-500`} />
                  <div className={`text-4xl font-black ${stat.color} mb-1 tabular-nums`}>{stat.value}</div>
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-20 text-right">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">نهج استثماري<br /> <span className="text-green-500">يضعك في المقدمة</span></h2>
            <div className="w-20 h-2 bg-green-500 rounded-full mb-6"></div>
            <p className="text-gray-400 text-lg leading-relaxed">
              نحن لا نكتفي بتقديم التوصيات، بل نبني لك استراتيجية متكاملة تضمن لك الأمان والنمو في آن واحد.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="glass-card glass rounded-[2rem] p-8 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/10 group-hover:text-green-500 transition-all duration-500 text-gray-400">
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-white font-black text-xl mb-4 group-hover:text-green-400 transition-colors">{f.title}</h3>
                <p className="text-gray-400 text-base leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-32 bg-secondary/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="glass p-6 rounded-[2rem] mt-12 bg-green-500/5">
                    <Star className="w-6 h-6 text-amber-500 fill-amber-500 mb-4" />
                    <p className="text-white text-sm italic mb-4">"أفضل تجربة استثمارية خضتها على الإطلاق. الشفافية هنا لا تضاهى."</p>
                    <span className="text-gray-500 text-xs font-bold">— فيصل بن خالد</span>
                  </div>
                  <div className="glass p-6 rounded-[2rem]">
                    <Shield className="w-6 h-6 text-blue-500 mb-4" />
                    <p className="text-white text-sm italic">"الأمان هو ما دفعني للاشتراك، والنتائج هي ما جعلتني أستمر."</p>
                    <span className="text-gray-500 text-xs font-bold">— هدى منصور</span>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="glass p-6 rounded-[2rem] bg-amber-500/5">
                    <TrendingUp className="w-6 h-6 text-green-500 mb-4" />
                    <p className="text-white text-sm italic mb-4">"العوائد اليومية منتظمة جداً والسحب سهل وبسيط."</p>
                    <span className="text-gray-500 text-xs font-bold">— أحمد الحمادي</span>
                  </div>
                  <div className="glass p-6 rounded-[2rem] mt-[-20px]">
                    <Globe className="w-6 h-6 text-purple-500 mb-4" />
                    <p className="text-white text-sm italic">"منصة احترافية تليق بالمستثمر الخليجي العصري."</p>
                    <span className="text-gray-500 text-xs font-bold">— سارة الهاجري</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 text-right">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">سمعتنا<br /> <span className="text-amber-500">رأسمالنا الحقيقي</span></h2>
              <p className="text-gray-400 text-xl leading-relaxed mb-10">
                نفخر بكوننا الخيار الأول لأكثر من 15,000 مستثمر في المنطقة العربية. رضا عملائنا هو المحرك الأساسي لابتكاراتنا المستمرة.
              </p>
              <ul className="space-y-4">
                {['تراخيص قانونية معتمدة', 'خدمة عملاء VIP على مدار الساعة', 'أدوات تحليلية متقدمة مجانية'].map((item, i) => (
                  <li key={i} className="flex items-center justify-start gap-4 text-white font-bold">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="mb-12 inline-block">
             <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl shadow-green-500/40 animate-bounce">
                <Target className="w-10 h-10 text-white" />
             </div>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-8">هل أنت مستعد<br /> لتعظيم ثروتك؟</h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            لا تترك أموالك للصدفة. ابدأ الآن مع الخبراء وحقق عوائد تليق بطموحاتك في أقوى أسواق المنطقة.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/plans" className="premium-btn premium-btn-primary px-12 py-5 text-xl flex items-center gap-3">
              <span>انضم إلينا اليوم</span>
              <ArrowUpRight className="w-6 h-6" />
            </Link>
            <Link to="/contact" className="premium-btn premium-btn-secondary px-10 py-5 text-xl">
              تحدث مع مستشار
            </Link>
          </div>
          
          <p className="mt-12 text-gray-500 text-sm font-medium flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            تأكد من قراءة شروط الاستثمار قبل البدء
          </p>
        </div>
        
        {/* Background blobs for CTA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 blur-[150px] rounded-full pointer-events-none" />
      </section>
    </div>
  );
}
