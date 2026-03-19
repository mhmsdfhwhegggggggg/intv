import { Link } from 'react-router-dom';
import { Shield, Target, Users, Award, Globe, TrendingUp, CheckCircle, ArrowUpRight, Building2, Landmark, BarChart3, Clock } from 'lucide-react';

export default function About() {
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
            <Building2 className="w-4 h-4" />
            <span className="font-medium">تأسست عام 2017</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5">
            عن شركة <span className="text-gradient">INVESTCORP CAPITAL</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            شركة رائدة في مجال الاستثمار في أسواق الأسهم الخليجية منذ أكثر من 8 سنوات، نفخر بثقة أكثر من 15,000 مستثمر في جميع أنحاء الخليج العربي
          </p>
        </div>
      </section>

      {/* About content */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-green-400 text-sm font-bold tracking-wider mb-3 block">من نحن</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-8">
                شركة استثمارية خليجية <span className="text-gradient-gold">بمعايير عالمية</span>
              </h2>
              <div className="space-y-5">
                <p className="text-gray-400 leading-relaxed text-base">
                  INVESTCORP CAPITAL هي شركة استثمارية خليجية متخصصة في إدارة المحافظ الاستثمارية في أسواق الأسهم الخليجية. تأسست الشركة عام 2017 في دبي، الإمارات العربية المتحدة، بهدف تقديم حلول استثمارية مبتكرة ومضمونة للمستثمرين في منطقة الخليج العربي.
                </p>
                <p className="text-gray-400 leading-relaxed text-base">
                  نحن نؤمن بأن كل مستثمر يستحق الحصول على عوائد مضمونة ومحمية، ولذلك نقدم باقات استثمارية متنوعة تناسب جميع المستويات مع ضمان كامل لرأس المال وعوائد يومية ثابتة.
                </p>
                <p className="text-gray-400 leading-relaxed text-base">
                  فريقنا يضم أكثر من 50 محللاً ومتداولاً محترفاً بخبرة تتجاوز 15 عاماً في أسواق المال الخليجية والعالمية، مما يضمن تحقيق أفضل النتائج لمستثمرينا.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <Link to="/plans" className="px-6 py-3 bg-gradient-to-l from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-green-500/40 flex items-center gap-2">
                  <ArrowUpRight className="w-4 h-4" />
                  استكشف الباقات
                </Link>
                <Link to="/contact" className="px-6 py-3 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-xl font-bold transition-all duration-300">
                  تواصل معنا
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Users, value: '+15,800', label: 'مستثمر نشط', color: 'text-green-400', bg: 'bg-green-600/15' },
                { icon: Globe, value: '+12', label: 'بورصة مدعومة', color: 'text-blue-400', bg: 'bg-blue-600/15' },
                { icon: Award, value: '+8', label: 'سنوات خبرة', color: 'text-amber-400', bg: 'bg-amber-600/15' },
                { icon: TrendingUp, value: '99.8%', label: 'نسبة نجاح', color: 'text-purple-400', bg: 'bg-purple-600/15' },
              ].map((s, i) => (
                <div key={i} className="glass rounded-2xl p-6 text-center card-hover group">
                  <div className={`w-14 h-14 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <s.icon className={`w-7 h-7 ${s.color}`} />
                  </div>
                  <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-gray-400 text-sm mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-wider mb-3 block">مسيرتنا</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">محطات بارزة في رحلتنا</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { year: '2017', title: 'التأسيس', desc: 'تأسيس الشركة في دبي وإطلاق أول باقة استثمارية في سوق الإمارات', icon: Building2 },
              { year: '2019', title: 'التوسع', desc: 'التوسع لتغطية أسواق السعودية والكويت وقطر مع تجاوز 5,000 مستثمر', icon: Globe },
              { year: '2022', title: 'الريادة', desc: 'تجاوز 10,000 مستثمر نشط وإطلاق منصة التداول الرقمية المتطورة', icon: BarChart3 },
              { year: '2025', title: 'الحاضر', desc: 'أكثر من 15,800 مستثمر وتغطية 12 بورصة مع أعلى معدلات رضا العملاء', icon: Landmark },
            ].map((t, i) => (
              <div key={i} className="glass rounded-2xl p-7 card-hover relative group">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-green-500/50 to-transparent rounded-t-2xl"></div>
                <span className="text-green-400 font-black text-3xl block mb-3">{t.year}</span>
                <div className="w-12 h-12 bg-green-600/15 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <t.icon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{t.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Values */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-green-400 text-sm font-bold tracking-wider mb-3 block">رؤيتنا</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">رؤيتنا وقيمنا</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">المبادئ التي تقود عملنا وتشكل هويتنا</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'رؤيتنا', desc: 'أن نكون الشركة الرائدة في مجال الاستثمار في أسواق الخليج، مع تقديم أعلى معايير الشفافية والمصداقية لعملائنا.', color: 'text-green-400', bg: 'bg-green-600/15', border: 'border-green-500/20' },
              { icon: Shield, title: 'مهمتنا', desc: 'توفير فرص استثمارية آمنة ومربحة لجميع المستثمرين في منطقة الخليج العربي، مع ضمان حماية رأس المال وتحقيق عوائد مستدامة.', color: 'text-blue-400', bg: 'bg-blue-600/15', border: 'border-blue-500/20' },
              { icon: Award, title: 'قيمنا', desc: 'الشفافية، المصداقية، الاحترافية، والالتزام تجاه عملائنا. نضع مصلحة المستثمر في المقام الأول دائماً.', color: 'text-amber-400', bg: 'bg-amber-600/15', border: 'border-amber-500/20' },
            ].map((v, i) => (
              <div key={i} className={`glass rounded-2xl p-8 text-center card-hover border ${v.border}`}>
                <div className={`w-16 h-16 ${v.bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                  <v.icon className={`w-8 h-8 ${v.color}`} />
                </div>
                <h3 className="text-white font-bold text-xl mb-4">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why different */}
      <section className="py-24 bg-slate-800/50 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="text-green-400 text-sm font-bold tracking-wider mb-3 block">تميزنا</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">لماذا نحن مختلفون</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">مزايا تجعلنا الخيار الأول للمستثمرين في الخليج</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { text: 'فريق خبراء بخبرة +15 سنة في أسواق الخليج', icon: Users },
              { text: 'ضمان كامل لرأس المال مع عوائد يومية ثابتة', icon: Shield },
              { text: 'شفافية تامة مع تقارير أداء يومية مفصلة', icon: BarChart3 },
              { text: 'دعم فني متخصص على مدار الساعة 24/7', icon: Clock },
              { text: 'تنويع استثماري عبر أكبر الأسواق الخليجية', icon: Globe },
              { text: 'سحب فوري للأرباح دون أي قيود أو رسوم', icon: TrendingUp },
              { text: 'تأمين شامل على جميع الاستثمارات', icon: CheckCircle },
              { text: 'رقابة مالية صارمة وحوكمة مؤسسية', icon: Landmark },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 glass rounded-2xl p-5 card-hover group">
                <div className="w-12 h-12 bg-green-600/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-green-600/20 transition-colors">
                  <item.icon className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-gray-300 font-medium">{item.text}</span>
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
            <Building2 className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">انضم إلى عائلة INVESTCORP</h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">ابدأ رحلتك الاستثمارية معنا اليوم واستمتع بعوائد يومية مضمونة وحماية كاملة لرأس مالك</p>
          <Link to="/plans" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-l from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-green-600/30 hover:shadow-green-500/40 hover:scale-[1.02]">
            <ArrowUpRight className="w-5 h-5" />
            عرض الباقات والأسعار
          </Link>
        </div>
      </section>
    </div>
  );
}
