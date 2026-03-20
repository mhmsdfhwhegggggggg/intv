import { Shield, Award, TrendingUp, ArrowRight, Building2, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const reasons = [
  {
    icon: Shield,
    title: 'أمان مطلق لرأس المال',
    desc: 'نتبع استراتيجيات تحوط متقدمة تضمن حماية أصولك بنسبة 100%، مع الالتزام الكامل بالمعايير الرقابية الدولية والمحلية.',
    color: 'text-green-400',
    bg: 'bg-green-500/10'
  },
  {
    icon: TrendingUp,
    title: 'عائد يومي مُستدام',
    desc: 'نظامنا مصمم لتوليد أرباح يومية ثابتة تتراوح بين 1% إلى 3%، مما يمنحك تدفقاً نقدياً مستمراً وموثوقاً.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10'
  },
  {
    icon: Award,
    title: 'خبرة عريقة في السوق',
    desc: 'فريقنا يضم نخبة من المحللين الماليين وخبراء إدارة الأصول الذين شهدوا تقلبات السوق لأكثر من عقد من الزمان.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10'
  },
  {
    icon: Globe,
    title: 'وصول مباشر للأسواق',
    desc: 'نحن بوابتك المباشرة لأكبر الأسهم المدرجة في تداول (السعودية)، وسوق دبي المالي، وبورصة أبوظبي.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10'
  }
];

const steps = [
  { number: '01', title: 'فتح الحساب', desc: 'عملية تسجيل سريعة لا تتجاوز الدقيقتين' },
  { number: '02', title: 'اختيار الخطة', desc: 'باقات متنوعة تناسب كافة مستويات رأس المال' },
  { number: '03', title: 'إيداع المحفظة', desc: 'طرق دفع آمنة وسريعة لبدء الاستثمار فوراً' },
  { number: '04', title: 'جني الأرباح', desc: 'متابعة يومية للأرباح مع حرية السحب في أي وقت' }
];

export default function WhyInvest() {
  return (
    <div className="min-h-screen bg-mesh pt-32 pb-20 selection:bg-green-500/30" dir="rtl">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass border-green-500/20 text-green-400 text-sm font-bold mb-8 animate-fade-in">
          لماذا نحن؟
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 animate-slide-up">
          شريكك الموثوق في <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-600">عالم المال والأعمال</span>
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
          في إينفستكورب كابيتال، نؤمن بأن الاستثمار الناجح هو مزيج من الرؤية الثاقبة، التكنولوجيا المتقدمة، والأمان المطلق. اكتشف ما الذي يجعلنا الخيار الأول لآلاف المستثمرين.
        </p>
      </div>

      {/* Main Features Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
        {reasons.map((reason, i) => (
          <div key={i} className="glass p-10 rounded-[3rem] group hover:border-green-500/20 transition-all duration-500">
            <div className={`w-16 h-16 ${reason.bg} ${reason.color} rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
              <reason.icon className="w-8 h-8" />
            </div>
            <h3 className="text-white text-2xl font-black mb-6 group-hover:text-green-400 transition-colors">{reason.title}</h3>
            <p className="text-gray-400 text-lg leading-relaxed">{reason.desc}</p>
          </div>
        ))}
      </div>

      {/* Trust Quote Section */}
      <div className="max-w-5xl mx-auto px-6 mb-32">
        <div className="glass rounded-[3rem] p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-white/5">
             <Building2 className="w-32 h-32" />
          </div>
          <p className="text-2xl md:text-3xl text-white font-medium leading-[1.6] mb-8 relative z-10">
            "هدفنا ليس مجرد تحقيق عوائد مالية، بل تمكين المستثمر الخليجي من أدوات عالمية المستوى تضمن له استقراراً مالياً ونمواً مستداماً."
          </p>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mb-6"></div>
          <div className="text-green-400 font-bold tracking-widest uppercase text-sm">مجلس الإدارة — إينفستكورب كابيتال</div>
        </div>
      </div>

      {/* Step by Step */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-16">كيف تبدأ رحلة <span className="text-green-500">النجاح؟</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="relative group p-8 glass rounded-[2.5rem] border-white/5 hover:border-green-500/20 transition-all">
               <div className="text-5xl font-black text-white/5 mb-6 group-hover:text-green-500/10 transition-colors">{step.number}</div>
               <h4 className="text-white font-black text-xl mb-4">{step.title}</h4>
               <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final Call to Action */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/20 rounded-[4rem] p-16 text-center">
          <h2 className="text-4xl font-black text-white mb-8">هل ما زلت متردداً؟</h2>
          <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
            انضم الآن إلى جلسة استشارية مجانية مع أحد خبرائنا واعرف كيف يمكننا مساعدتك في تحقيق أهدافك المالية.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
             <Link to="/plans" className="premium-btn premium-btn-primary px-12 py-5 text-xl flex items-center gap-3">
                ابدأ الآن
                <ArrowRight className="w-6 h-6 rotate-180" />
             </Link>
             <Link to="/contact" className="premium-btn premium-btn-secondary px-10 py-5 text-xl">
                تواصل معنا
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
