import { Link } from 'react-router-dom';
import { TrendingUp, Shield, BarChart3, Clock, Users, Zap, Target, ArrowUpRight, CheckCircle, Layers, PieChart, Briefcase } from 'lucide-react';

const services = [
  {
    icon: BarChart3,
    title: 'إدارة المحافظ الاستثمارية',
    desc: 'نقوم بإدارة محفظتك الاستثمارية بشكل احترافي من خلال فريق من الخبراء المتخصصين في أسواق الأسهم الخليجية.',
    features: ['تحليل فني ومالي شامل', 'تنويع المحفظة عبر عدة أسواق', 'تقارير أداء يومية', 'إدارة المخاطر المتقدمة'],
    color: 'text-green-400', bg: 'bg-green-600/15', gradient: 'from-green-600/20 to-emerald-600/5'
  },
  {
    icon: TrendingUp,
    title: 'التداول في أسواق الخليج',
    desc: 'نوفر لك إمكانية الاستثمار في أكبر أسواق الأسهم الخليجية مع ضمان عوائد يومية محددة.',
    features: ['تداول السعودية (TASI)', 'سوق دبي المالي (DFM)', 'بورصة أبوظبي (ADX)', 'بورصة الكويت والقطرية'],
    color: 'text-blue-400', bg: 'bg-blue-600/15', gradient: 'from-blue-600/20 to-cyan-600/5'
  },
  {
    icon: Shield,
    title: 'حماية رأس المال',
    desc: 'نضمن لك حماية كاملة لرأس مالك مع تحقيق عوائد ثابتة ومضمونة بدون أي مخاطر.',
    features: ['ضمان رأس المال 100%', 'تأمين شامل على الاستثمارات', 'نظام حماية متعدد الطبقات', 'رقابة مالية صارمة'],
    color: 'text-amber-400', bg: 'bg-amber-600/15', gradient: 'from-amber-600/20 to-yellow-600/5'
  },
  {
    icon: PieChart,
    title: 'الاستشارات المالية',
    desc: 'نقدم استشارات مالية متخصصة لمساعدتك في اتخاذ القرارات الاستثمارية الصحيحة.',
    features: ['استشارات مجانية للمستثمرين', 'تحليلات سوقية أسبوعية', 'توصيات استثمارية', 'تقييم المخاطر'],
    color: 'text-purple-400', bg: 'bg-purple-600/15', gradient: 'from-purple-600/20 to-violet-600/5'
  },
  {
    icon: Layers,
    title: 'باقات استثمارية متنوعة',
    desc: 'نوفر باقات استثمارية تناسب جميع المستويات من المبتدئين إلى المحترفين.',
    features: ['باقات تبدأ من 180$', 'عوائد يومية تصل إلى 7,200$', 'مرونة في اختيار الباقة', 'ترقية الباقة في أي وقت'],
    color: 'text-rose-400', bg: 'bg-rose-600/15', gradient: 'from-rose-600/20 to-pink-600/5'
  },
  {
    icon: Clock,
    title: 'دعم فني على مدار الساعة',
    desc: 'فريق دعم فني متخصص متاح على مدار الساعة لمساعدتك في أي وقت.',
    features: ['دعم عبر الواتساب', 'دعم عبر تليغرام', 'دعم عبر البريد الإلكتروني', 'استجابة خلال دقائق'],
    color: 'text-teal-400', bg: 'bg-teal-600/15', gradient: 'from-teal-600/20 to-cyan-600/5'
  },
];

const processSteps = [
  { step: '01', title: 'التسجيل', desc: 'قم بالتسجيل مجاناً واختر الباقة المناسبة لك', icon: Users, color: 'text-green-400', bg: 'bg-green-600/15' },
  { step: '02', title: 'الاشتراك', desc: 'اشترك في الباقة وقم بتحويل مبلغ الاستثمار', icon: Target, color: 'text-blue-400', bg: 'bg-blue-600/15' },
  { step: '03', title: 'البدء', desc: 'يبدأ فريقنا بإدارة استثمارك فوراً وباحترافية', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-600/15' },
  { step: '04', title: 'الأرباح', desc: 'استلم أرباحك اليومية بشكل منتظم ومضمون', icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-600/15' },
];

export default function Services() {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero */}
      <section className="gradient-bg pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-green-600/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-6">
            <Briefcase className="w-4 h-4" />
            <span className="font-medium">خدمات استثمارية متكاملة</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5">
            خدماتنا <span className="text-gradient">الاستثمارية</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            نقدم مجموعة شاملة من الخدمات الاستثمارية المصممة خصيصاً لتحقيق أهدافك المالية وتنمية ثروتك بأمان
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((service, i) => (
              <div key={i} className="glass rounded-2xl p-8 card-hover group relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative">
                  <div className={`w-14 h-14 ${service.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                    <service.icon className={`w-7 h-7 ${service.color}`} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{service.desc}</p>
                  <ul className="space-y-2.5">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800/50 to-slate-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-wider mb-3 block">خطوات البدء</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-5">كيف يعمل الاستثمار معنا؟</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">أربع خطوات بسيطة تفصلك عن البدء في تحقيق الأرباح اليومية</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((s, i) => (
              <div key={i} className="text-center relative group">
                <div className={`w-20 h-20 ${s.bg} rounded-3xl flex items-center justify-center mx-auto mb-5 border border-white/5 group-hover:scale-110 transition-all duration-300 relative`}>
                  <s.icon className={`w-9 h-9 ${s.color}`} />
                  <span className={`absolute -top-2 -right-2 w-7 h-7 bg-slate-900 border border-white/10 rounded-lg flex items-center justify-center text-xs font-black ${s.color}`}>
                    {s.step}
                  </span>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-0 w-full h-px bg-gradient-to-l from-white/10 via-white/5 to-transparent -translate-x-1/2"></div>
                )}
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
            <Briefcase className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">جاهز للبدء؟</h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">اختر الباقة المناسبة وابدأ رحلتك الاستثمارية اليوم مع أفضل العوائد المضمونة</p>
          <Link to="/plans" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-l from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-green-600/30 hover:shadow-green-500/40 hover:scale-[1.02]">
            <ArrowUpRight className="w-5 h-5" />
            عرض الباقات والأسعار
          </Link>
        </div>
      </section>
    </div>
  );
}
