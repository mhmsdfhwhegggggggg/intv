import { Link } from 'react-router-dom';
import { Shield, Target, Users, Award, Globe, TrendingUp, CheckCircle, ArrowUpRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen" dir="rtl">
      <section className="gradient-bg pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">عن شركة INVESTCORP CAPITAL</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">شركة رائدة في مجال الاستثمار في أسواق الأسهم الخليجية منذ أكثر من 8 سنوات</p>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mt-6"></div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-white mb-6">من نحن</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                INVESTCORP CAPITAL هي شركة استثمارية خليجية متخصصة في إدارة المحافظ الاستثمارية في أسواق الأسهم الخليجية. تأسست الشركة عام 2017 في دبي، الإمارات العربية المتحدة، بهدف تقديم حلول استثمارية مبتكرة ومضمونة للمستثمرين في منطقة الخليج العربي.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                نحن نؤمن بأن كل مستثمر يستحق الحصول على عوائد مضمونة ومحمية، ولذلك نقدم باقات استثمارية متنوعة تناسب جميع المستويات مع ضمان كامل لرأس المال وعوائد يومية ثابتة.
              </p>
              <p className="text-gray-400 leading-relaxed">
                فريقنا يضم أكثر من 50 محللاً ومتداولاً محترفاً بخبرة تتجاوز 15 عاماً في أسواق المال الخليجية والعالمية.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, value: '+15,800', label: 'مستثمر نشط' },
                { icon: Globe, value: '+12', label: 'بورصة مدعومة' },
                { icon: Award, value: '+8', label: 'سنوات خبرة' },
                { icon: TrendingUp, value: '99.8%', label: 'نسبة نجاح' },
              ].map((s, i) => (
                <div key={i} className="glass rounded-xl p-6 text-center">
                  <s.icon className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-gray-400 text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">رؤيتنا وقيمنا</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: 'رؤيتنا', desc: 'أن نكون الشركة الرائدة في مجال الاستثمار في أسواق الخليج، مع تقديم أعلى معايير الشفافية والمصداقية لعملائنا.' },
              { icon: Shield, title: 'مهمتنا', desc: 'توفير فرص استثمارية آمنة ومربحة لجميع المستثمرين في منطقة الخليج العربي، مع ضمان حماية رأس المال وتحقيق عوائد مستدامة.' },
              { icon: Award, title: 'قيمنا', desc: 'الشفافية، المصداقية، الاحترافية، والالتزام تجاه عملائنا. نضع مصلحة المستثمر في المقام الأول دائماً.' },
            ].map((v, i) => (
              <div key={i} className="glass rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-4">لماذا نحن مختلفون</h2>
            <div className="w-20 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'فريق خبراء بخبرة +15 سنة في أسواق الخليج',
              'ضمان كامل لرأس المال مع عوائد يومية ثابتة',
              'شفافية تامة مع تقارير أداء يومية مفصلة',
              'دعم فني متخصص على مدار الساعة 24/7',
              'تنويع استثماري عبر أكبر الأسواق الخليجية',
              'سحب فوري للأرباح دون أي قيود أو رسوم',
              'تأمين شامل على جميع الاستثمارات',
              'رقابة مالية صارمة وحوكمة مؤسسية',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 glass rounded-xl p-4">
                <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">انضم إلى عائلة INVESTCORP</h2>
          <p className="text-gray-400 mb-8">ابدأ رحلتك الاستثمارية معنا اليوم واستمتع بعوائد مضمونة</p>
          <Link to="/plans" className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-600/30">
            <ArrowUpRight className="w-5 h-5" />
            عرض الباقات
          </Link>
        </div>
      </section>
    </div>
  );
}
