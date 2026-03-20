import { Link } from 'react-router-dom';
import { TrendingUp, Shield, BarChart3, Users, Zap, CheckCircle2, PieChart, Smartphone, Headphones, Gem, Rocket } from 'lucide-react';

const services = [
  {
    icon: BarChart3,
    title: 'إدارة المحافظ الاستثمارية',
    desc: 'صمم نظامنا المتطور لإدارة محفظتك عبر خوارزميات ذكية توازن بين النمو الآمن والربح اليومي.',
    features: ['تحليل فني ومالي معمق', 'تنويع عبر 5 أسواق خليجية', 'تحديثات لحظية للأداء', 'أدوات إدارة جني الأرباح']
  },
  {
    icon: TrendingUp,
    title: 'التداول الاستراتيجي',
    desc: 'نمنحك الأفضلية في أسواق (تداول، دبي، أبوظبي) من خلال تنفيذ صفقات تعتمد على بيانات ضخمة.',
    features: ['دخول مباشر للبورصات', 'سيولة عالية للسحب', 'مؤشرات حية للأدوات المالية', 'نظام تنبيهات ذكي']
  },
  {
    icon: Shield,
    title: 'حماية الأصول الاستثمارية',
    desc: 'نظام حماية رائد يضمن بقاء رأس مالك في مأمن من تقلبات السوق العنيفة من خلال صناديق تحوط.',
    features: ['تأمين على رصيد المحفظة', 'عزل حسابات العملاء', 'تشفير بيانات عسكري', 'تدقيق مالي ربع سنوي']
  },
  {
    icon: PieChart,
    title: 'الاستشارات المالية المخصصة',
    desc: 'فريق من النخبة يقدم لك خارطة طريق مالية تناسب أهدافك، سواء كانت متوسطة أو بعيدة المدى.',
    features: ['جلسات خاصة مع المستشارين', 'تخطيط للتقاعد المالي', 'تحليل مخاطر شخصي', 'تقارير سوقية حصرية']
  },
  {
    icon: Rocket,
    title: 'باقات النمو المتسارع',
    desc: 'باقاتنا توفر مرونة فائقة تبدأ من مبالغ بسيطة لتصل إلى استثمارات مؤسسية كبرى بضمانات أكيدة.',
    features: ['نقطة دخول منخفضة', 'تدرج في مستويات الأرباح', 'إمكانية ترقية الخطة فوراً', 'مكافآت ولاء دورية']
  },
  {
    icon: Headphones,
    title: 'دعم النخبة (VIP)',
    desc: 'خدمة عملاء تفوق التوقعات، متوفرة على مدار الساعة لتقديم الدعم التقني والمالي الاحترافي.',
    features: ['مدير حساب مخصص', 'دعم عبر التليغرام والواتساب', 'أولوية في معالجة السحوبات', 'استجابة في أقل من 5 دقائق']
  },
];

const processSteps = [
  { step: '01', title: 'عضوية فورية', desc: 'افتح حسابك بنقرة واحدة وابدأ تجربة استثمارية فريدة.', icon: Users },
  { step: '02', title: 'تمويل آمن', desc: 'استخدم قنواتنا المشفرة لإيداع رأسمالك بكل طمأنينة.', icon: Shield },
  { step: '03', title: 'إدارة ذكية', desc: 'نعمل بجد لتنمية أموالك بينما تتابع النتائج في لوحتك.', icon: Zap },
  { step: '04', title: 'حصاد الأرباح', desc: 'استمتع بثمار استثمارك مع خيارات سحب مرنة وسريعة.', icon: TrendingUp },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-mesh pt-32 pb-20 selection:bg-green-500/30" dir="rtl">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass border-green-500/20 text-green-400 text-sm font-bold mb-8 animate-fade-in uppercase tracking-wider">
           <Gem className="w-4 h-4" />
           حلول مالية لجيل الغد
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 animate-slide-up">
           خدماتنا <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-600">المتكاملة</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
           نحن لا نقدم مجرد خدمات، بل نبني لك بيئة استثمارية خصبة تضمن لك الأمان والربح والنمو في آن واحد.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <div key={i} className="glass-card glass rounded-[3rem] p-10 hover:border-green-500/20 transition-all group">
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-500/10 group-hover:text-green-500 transition-all duration-500 text-gray-400">
                <service.icon className="w-8 h-8" />
              </div>
              <h3 className="text-white font-black text-2xl mb-6 group-hover:text-green-400 transition-colors uppercase tracking-tight">{service.title}</h3>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed mb-10">{service.desc}</p>
              <ul className="space-y-4 pt-6 border-t border-white/5">
                {service.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3 text-sm text-gray-300 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="glass rounded-[4rem] p-16 relative overflow-hidden text-center group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
           
           <h2 className="text-4xl font-black text-white mb-16">بساطة في التنفيذ، <br /><span className="text-green-500">دقة في النتائج</span></h2>
           
           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((s, i) => (
                <div key={i} className="relative z-10">
                   <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-white/5 group-hover:bg-green-500/10 transition-colors">
                      <s.icon className="w-10 h-10 text-green-400" />
                   </div>
                   <div className="text-green-500 font-black text-base mb-4 tracking-widest">{s.step}</div>
                   <h3 className="text-white font-black text-xl mb-4 uppercase">{s.title}</h3>
                   <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Layer */}
      <section className="max-w-7xl mx-auto px-6">
         <div className="flex flex-col lg:flex-row items-center justify-between gap-12 glass p-16 rounded-[4rem] border-amber-500/10 bg-gradient-to-br from-amber-500/[0.03] to-transparent">
            <div className="text-right">
               <h2 className="text-4xl font-black text-white mb-4">هل تبحث عن حلول مخصصة؟</h2>
               <p className="text-gray-400 text-xl">نحن هنا لتصميم خطة استثمارية تناسب طموحاتك الفريدة.</p>
            </div>
            <div className="flex gap-6">
                <Link to="/contact" className="premium-btn premium-btn-primary px-12 py-5 text-xl flex items-center gap-3">
                   <Smartphone className="w-6 h-6" />
                   اطلب استشارة
                </Link>
                <Link to="/plans" className="premium-btn premium-btn-secondary px-10 py-5 text-xl">
                   عرض الخطط
                </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
