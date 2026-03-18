import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

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
      <section className="gradient-bg pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">الأسئلة الشائعة</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">إجابات على أكثر الأسئلة شيوعاً حول خدماتنا الاستثمارية</p>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mt-6"></div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-right"
                >
                  <span className="text-white font-bold text-sm md:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-green-400 shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === i && (
                  <div className="px-5 pb-5 border-t border-white/10 pt-3">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">لم تجد إجابة سؤالك؟</h2>
          <p className="text-gray-400 mb-8">تواصل معنا وسيقوم فريقنا بالرد على جميع استفساراتك</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-600/30">
            <ArrowUpRight className="w-5 h-5" />
            تواصل معنا
          </Link>
        </div>
      </section>
    </div>
  );
}
