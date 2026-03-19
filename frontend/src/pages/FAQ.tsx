import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight, HelpCircle, MessageCircle } from 'lucide-react';

const faqs = [
  { q: 'ما هي INVESTCORP CAPITAL؟', a: 'INVESTCORP CAPITAL هي شركة استثمارية خليجية رائدة متخصصة في إدارة المحافظ الاستثمارية في أسواق الأسهم الخليجية. تأسست عام 2017 وتقدم باقات استثمارية مضمونة بعوائد يومية.' },
  { q: 'كيف أبدأ الاستثمار معكم؟', a: 'يمكنك البدء بسهولة من خلال التواصل معنا عبر نموذج الاتصال أو عبر تليغرام، سيقوم فريقنا بمساعدتك في اختيار الباقة المناسبة وإتمام عملية التسجيل.' },
  { q: 'هل رأس المال مضمون؟', a: 'نعم، نضمن لك حماية كاملة لرأس مالك بنسبة 100%. يمكنك استرداد رأس مالك في أي وقت دون أي خصومات أو رسوم إضافية.' },
  { q: 'ما هي العوائد المتوقعة؟', a: 'تختلف العوائد حسب الباقة المختارة، وتتراوح بين 180$ إلى 7,200$ يومياً. العوائد محددة مسبقاً ومضمونة طوال فترة الاستثمار.' },
  { q: 'كيف يمكنني سحب أرباحي؟', a: 'يمكنك سحب أرباحك في أي وقت من خلال التواصل مع فريق الدعم. عملية السحب تتم خلال 24 ساعة كحد أقصى.' },
  { q: 'ما هي الأسواق التي تستثمرون فيها؟', a: 'نستثمر في جميع أسواق الأسهم الخليجية الرئيسية: تداول السعودية (TASI)، سوق دبي المالي (DFM)، بورصة أبوظبي (ADX)، بورصة الكويت (KSE)، وبورصة قطر (QSE).' },
  { q: 'هل يمكنني ترقية باقتي؟', a: 'بالتأكيد، يمكنك ترقية باقتك في أي وقت. تواصل مع فريق الدعم وسيقوم بمساعدتك في عملية الترقية بسلاسة.' },
  { q: 'كيف يمكنني متابعة استثماراتي؟', a: 'نوفر لكل عميل لوحة تحكم خاصة يمكنه من خلالها متابعة جميع تفاصيل استثماراته وأرباحه بشكل مباشر وفي الوقت الفعلي.' },
  { q: 'هل هناك رسوم على الأرباح؟', a: 'نسبة رسوم الأرباح تعتمد على الباقة المختارة وتكون محددة مسبقاً وواضحة قبل الاشتراك. لا توجد أي رسوم مخفية.' },
  { q: 'ما مدة العقد الاستثماري؟', a: 'مدة العقد الاستثماري 60 يوماً قابلة للتجديد. يمكنك إنهاء العقد واسترداد رأس مالك في أي وقت.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            <HelpCircle className="w-4 h-4" />
            <span className="font-medium">إجابات شاملة</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5">
            الأسئلة <span className="text-gradient">الشائعة</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            إجابات على أكثر الأسئلة شيوعاً حول خدماتنا الاستثمارية وكيفية البدء معنا
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'border-green-500/20' : ''
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-right group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      openIndex === i ? 'bg-green-600/20' : 'bg-white/5'
                    }`}>
                      <span className={`text-xs font-black ${openIndex === i ? 'text-green-400' : 'text-gray-500'}`}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-white font-bold text-sm md:text-base">{faq.q}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-green-400 shrink-0 transition-transform duration-300 mr-4 ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-6 pb-6 pr-[4.5rem]">
                    <div className="border-t border-white/5 pt-4">
                      <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
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
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <div className="w-20 h-20 bg-green-600/15 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <MessageCircle className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">لم تجد إجابة سؤالك؟</h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">تواصل معنا وسيقوم فريقنا بالرد على جميع استفساراتك بسرعة واحترافية</p>
          <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-l from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-green-600/30 hover:shadow-green-500/40 hover:scale-[1.02]">
            <ArrowUpRight className="w-5 h-5" />
            تواصل معنا
          </Link>
        </div>
      </section>
    </div>
  );
}
