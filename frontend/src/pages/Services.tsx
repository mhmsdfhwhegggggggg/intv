import { Link } from 'react-router-dom';
import { TrendingUp, Shield, BarChart3, Clock, Users, Zap, Target, ArrowUpRight, CheckCircle, Layers, PieChart } from 'lucide-react';

const services = [
  {
    icon: BarChart3,
    title: 'إدارة المحافظ الاستثمارية',
    desc: 'نقوم بإدارة محفظتك الاستثمارية بشكل احترافي من خلال فريق من الخبراء المتخصصين في أسواق الأسهم الخليجية.',
    features: ['تحليل فني ومالي شامل', 'تنويع المحفظة عبر عدة أسواق', 'تقارير أداء يومية', 'إدارة المخاطر المتقدمة']
  },
  {
    icon: TrendingUp,
    title: 'التداول في أسواق الخليج',
    desc: 'نوفر لك إمكانية الاستثمار في أكبر أسواق الأسهم الخليجية مع ضمان عوائد يومية محددة.',
    features: ['تداول السعودية (TASI)', 'سوق دبي المالي (DFM)', 'بورصة أبوظبي (ADX)', 'بورصة الكويت والقطرية']
  },
  {
    icon: Shield,
    title: 'حماية رأس المال',
    desc: 'نضمن لك حماية كاملة لرأس مالك مع تحقيق عوائد ثابتة ومضمونة بدون أي مخاطر.',
    features: ['ضمان رأس المال 100%', 'تأمين شامل على الاستثمارات', 'نظام حماية متعدد الطبقات', 'رقابة مالية صارمة']
  },
  {
    icon: PieChart,
    title: 'الاستشارات المالية',
    desc: 'نقدم استشارات مالية متخصصة لمساعدتك في اتخاذ القرارات الاستثمارية الصحيحة.',
    features: ['استشارات مجانية للمستثمرين', 'تحليلات سوقية أسبوعية', 'توصيات استثمارية', 'تقييم المخاطر']
  },
  {
    icon: Layers,
    title: 'باقات استثمارية متنوعة',
    desc: 'نوفر باقات استثمارية تناسب جميع المستويات من المبتدئين إلى المحترفين.',
    features: ['باقات تبدأ من 180$', 'عوائد يومية تصل إلى 7,200$', 'مرونة في اختيار الباقة', 'ترقية الباقة في أي وقت']
  },
  {
    icon: Clock,
    title: 'دعم فني على مدار الساعة',
    desc: 'فريق دعم فني متخصص متاح على مدار الساعة لمساعدتك في أي وقت.',
    features: ['دعم عبر الواتساب', 'دعم عبر تليغرام', 'دعم عبر البريد الإلكتروني', 'استجابة خلال دقائق']
  },
];

const processSteps = [
  { step: '01', title: 'التسجيل', desc: 'قم بالتسجيل مجاناً واختر الباقة المناسبة لك', icon: Users },
  { step: '02', title: 'الاشتراك', desc: 'اشترك في الباقة وقم بتحويل مبلغ الاستثمار', icon: Target },
  { step: '03', title: 'البدء', desc: 'يبدأ فريقنا بإدارة استثمارك فوراً', icon: Zap },
  { step: '04', title: 'الأرباح', desc: 'استلم أرباحك اليومية بشكل منتظم ومضمون', icon: TrendingUp },
];

export default function Services() {
  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero */}
      <section className="gradient-bg pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">خدماتنا الاستثمارية</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">نقدم مجموعة شاملة من الخدمات الاستثمارية المصممة خصيصاً لتحقيق أهدافك المالية</p>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mt-6"></div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="glass rounded-2xl p-8 hover:border-green-500/30 transition-all group">
                <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600/30 transition-colors">
                  <service.icon className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">كيف يعمل الاستثمار معنا؟</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="w-20 h-20 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                  <s.icon className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-green-400 font-black text-sm mb-2">{s.step}</div>
                <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-green-500/20 -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">جاهز للبدء؟</h2>
          <p className="text-gray-400 mb-8">اختر الباقة المناسبة وابدأ رحلتك الاستثمارية اليوم</p>
          <Link to="/plans" className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-600/30">
            <ArrowUpRight className="w-5 h-5" />
            عرض الباقات
          </Link>
        </div>
      </section>
    </div>
  );
}
