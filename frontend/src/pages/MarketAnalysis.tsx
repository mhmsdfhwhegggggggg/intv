import { Link } from 'react-router-dom';
import { TrendingUp, BarChart, PieChart, Activity, Globe, ArrowUpRight, ArrowDownRight, Zap, Target, Search, Calendar, ChevronLeft } from 'lucide-react';

const markets = [
  { name: 'TASI (السعودية)', value: '11,963.28', change: '+1.07%', status: 'up' },
  { name: 'DFM (دبي)', value: '4,357.67', change: '-0.51%', status: 'down' },
  { name: 'ADX (أبوظبي)', value: '9,839.87', change: '+1.23%', status: 'up' },
  { name: 'QE (قطر)', value: '10,124.52', change: '+0.45%', status: 'up' }
];

const insights = [
  {
    title: 'توقعات أداء قطاع البنوك في الربع القادم',
    category: 'تحليل قطاعي',
    date: '19 مارس 2026',
    desc: 'تشير البيانات إلى نمو متسارع في أرباح البنوك الخليجية بفضل مستويات الفائدة الحالية وزيادة وتيرة المشاريع الكبرى.'
  },
  {
    title: 'تأثير أسعار النفط العالمية على الأسهم الخليجية',
    category: 'تقرير دوري',
    date: '18 مارس 2026',
    desc: 'رؤية تحليلية حول ارتباط مؤشرات الأسواق بأسعار الخام وتوقعات استقرار العوائد الاستثمارية في ظل التحول الاقتصادي.'
  },
  {
    title: 'فرص الاستثمار في شركات الطاقة المتجددة المكتتبة حديثاً',
    category: 'فرصة استثمارية',
    date: '17 مارس 2026',
    desc: 'دراسة جدوى لـ 5 شركات واعدة في قطاع الطاقة النظيفة من المتوقع أن تقود الطفرة السعرية القادمة في المنطقة.'
  }
];

export default function MarketAnalysis() {
  return (
    <div className="min-h-screen bg-mesh pt-32 pb-20 selection:bg-green-500/30" dir="rtl">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass border-green-400/20 text-green-400 text-sm font-bold mb-8 animate-fade-in uppercase tracking-wider">
               <Activity className="w-4 h-4" />
               بيانات حية وشفافة
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-8 animate-slide-up">
              تحليل السوق <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-600">والفرص الواعدة</span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed animate-slide-up delay-100">
              نضع بين يديك تحليلات دقيقة وشاملة لأسواق المال الخليجية، لمساعدتك في اتخاذ قرارات استثمارية مبنية على حقائق وأرقام مؤكدة.
            </p>
          </div>
          
          <div className="lg:w-1/3 glass p-8 rounded-[2.5rem] animate-fade-in delay-300">
             <div className="flex items-center justify-between mb-6">
                <span className="text-white font-black text-lg">وضع السوق الحالي</span>
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
             </div>
             <div className="space-y-4">
               {markets.map((m, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] rounded-2xl hover:bg-white/[0.06] transition-colors cursor-default border border-transparent hover:border-white/5">
                   <span className="text-gray-400 font-bold text-sm">{m.name}</span>
                   <div className="text-right">
                     <div className="text-white font-black text-sm">{m.value}</div>
                     <span className={`text-[10px] font-bold ${m.status === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {m.change}
                     </span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Sections */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
        <div className="lg:col-span-2 space-y-8">
           <h2 className="text-3xl font-black text-white flex items-center gap-3">
              <Search className="w-8 h-8 text-green-500" />
              أحدث الرؤى والتقارير
           </h2>
           
           <div className="grid gap-6">
              {insights.map((insight, i) => (
                <div key={i} className="glass p-8 rounded-[2.5rem] group hover:bg-green-500/[0.02] transition-all cursor-pointer">
                   <div className="flex items-center justify-between mb-6">
                      <span className="px-4 py-1.5 bg-green-500/10 text-green-400 text-xs font-bold rounded-full">
                         {insight.category}
                      </span>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                         <Calendar className="w-4 h-4" />
                         {insight.date}
                      </div>
                   </div>
                   <h3 className="text-white text-2xl font-black mb-4 group-hover:text-green-400 transition-colors uppercase">
                      {insight.title}
                   </h3>
                   <p className="text-gray-400 text-base leading-relaxed mb-6">
                      {insight.desc}
                   </p>
                   <div className="flex items-center gap-2 text-green-500 font-bold text-sm">
                      اقرأ التقرير كاملاً
                      <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-8">
           <h2 className="text-3xl font-black text-white">توزيع الاستثمارات</h2>
           <div className="glass p-10 rounded-[3rem] text-center">
              <div className="w-40 h-40 mx-auto relative mb-10">
                 <div className="absolute inset-0 rounded-full border-8 border-green-500/10" />
                 <div className="absolute inset-0 rounded-full border-8 border-green-500 border-t-transparent border-l-transparent rotate-45" />
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-white font-black text-3xl">75%</span>
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">تغطية القطاعات</span>
                 </div>
              </div>
              
              <div className="space-y-4 text-right">
                 {[
                   { name: 'الطاقة والبتروكيماويات', val: '35%', color: 'bg-green-500' },
                   { name: 'القطاع البنكي والعقاري', val: '25%', color: 'bg-blue-500' },
                   { name: 'التكنولوجيا والاتصالات', val: '20%', color: 'bg-amber-500' },
                   { name: 'قطاعات أخرى', val: '20%', color: 'bg-gray-600' }
                 ].map((item, i) => (
                   <div key={i}>
                      <div className="flex justify-between items-center text-xs mb-2">
                         <span className="text-white font-bold">{item.name}</span>
                         <span className="text-gray-400">{item.val}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                         <div className={`h-full ${item.color}`} style={{ width: item.val }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass p-8 rounded-[2.5rem] bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
              <h4 className="text-amber-500 font-black text-lg mb-4 flex items-center gap-2">
                 <Zap className="w-5 h-5" />
                 تنبيه هام للمستثمرين
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                 تم رصد تحركات إيجابية قوية في أسهم قطاع التقنية المالية بالبورصة السعودية. نوصي بمراجعة محفظتك وتعديل الأوزان بما يتناسب مع هذه المتغيرات.
              </p>
           </div>
        </div>
      </div>

      {/* Market Watch Call to Action */}
      <div className="max-w-7xl mx-auto px-6">
         <div className="relative glass p-16 rounded-[4rem] overflow-hidden text-center group">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <h2 className="text-4xl font-black text-white mb-8">كن دائماً في قلب الحدث</h2>
            <p className="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
               احصل على تنبيهات حية ومجانية بأحدث تحركات السوق والفرص الاستثمارية التي لا تفوت مباشرة على هاتفك.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
                <Link to="/plans" className="premium-btn premium-btn-primary px-12 py-5 text-xl">
                   انطلق الآن
                </Link>
                <Link to="/contact" className="premium-btn premium-btn-secondary px-10 py-5 text-xl flex items-center gap-3">
                   <Target className="w-6 h-6 text-green-500" />
                   اشترك في النشرة
                </Link>
            </div>
         </div>
      </div>
    </div>
  );
}
