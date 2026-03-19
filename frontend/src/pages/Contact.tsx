import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Shield, Zap } from 'lucide-react';
import { submitContact, api } from '../lib/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [supportEmail, setSupportEmail] = useState('support@investcorp-capital.com');
  const [supportPhone, setSupportPhone] = useState('+966 50 000 0000');

  useEffect(() => {
    Promise.all([
      api.get('/api/settings/support_email'),
      api.get('/api/settings/support_phone')
    ]).then(([emailRes, phoneRes]) => {
      setSupportEmail(emailRes.data.value);
      setSupportPhone(phoneRes.data.value);
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await submitContact(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setError('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mesh pt-32 pb-20 selection:bg-green-500/30" dir="rtl">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl glass border-green-500/20 text-green-400 text-sm font-bold mb-8 animate-fade-in uppercase tracking-wider">
           <MessageSquare className="w-4 h-4" />
           نحن هنا للاستماع إليك
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-8 animate-slide-up">
           لنصنع <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-emerald-600">مستقبلك المالي</span> معاً
        </h1>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
           سواء كنت مستثمراً متمرساً أو تبدأ خطوتك الأولى، فريقنا المتخصص متواجد للإجابة على جميع استفساراتك وتوجيهك نحو الخيارات الأمثل.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-4 space-y-8 animate-slide-right">
            <div className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
               <h2 className="text-2xl font-black text-white mb-10 relative z-10">قنوات التواصل</h2>
               
               <div className="space-y-8 relative z-10 text-right">
                 {[
                   { icon: Phone, label: 'الخط الساخن', value: supportPhone, color: 'text-green-400' },
                   { icon: Mail, label: 'الدعم الفني', value: supportEmail, color: 'text-blue-400' },
                   { icon: MapPin, label: 'المقر الرئيسي', value: 'مركز دبي المالي العالمي، الإمارات', color: 'text-amber-400' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-start gap-6 group/item">
                     <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110 ${item.color}`}>
                       <item.icon className="w-7 h-7" />
                     </div>
                     <div>
                       <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{item.label}</div>
                       <div className="text-white font-bold group-hover:text-green-400 transition-colors">{item.value}</div>
                     </div>
                   </div>
                 ))}
               </div>
            </div>

            <div className="glass p-10 rounded-[3rem] border-white/5 bg-gradient-to-br from-green-500/[0.04] to-transparent">
               <Shield className="w-12 h-12 text-green-400 mb-6" />
               <h3 className="text-white font-black text-xl mb-4">بيئة آمنة تماماً</h3>
               <p className="text-gray-400 leading-relaxed">تشفير كامل لكافة المراسلات والبيانات لضمان سرية وخصوصية استثماراتك.</p>
            </div>
          </div>

          {/* Form Area */}
          <div className="lg:col-span-8 animate-slide-left">
            <div className="glass-card glass rounded-[3.5rem] p-12 md:p-16 border-white/10 relative overflow-hidden backdrop-blur-2xl">
              <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/2" />
              
              <h2 className="text-3xl font-black text-white mb-10 relative z-10">أرسل استفسارك</h2>
              
              {success ? (
                <div className="text-center py-20 animate-fade-in relative z-10">
                  <div className="w-24 h-24 bg-green-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-green-500/30">
                    <CheckCircle2 className="w-12 h-12 text-green-400" />
                  </div>
                  <h3 className="text-white font-black text-3xl mb-6">تم الإرسال بنجاح!</h3>
                  <p className="text-gray-400 text-xl max-w-md mx-auto leading-relaxed mb-12">شكراً لتواصلك معنا. سيقوم أحد مستشارينا الماليين بالتواصل معك خلال بضع دقائق.</p>
                  <button 
                    onClick={() => setSuccess(false)} 
                    className="premium-btn glass border-white/10 text-white px-10 py-4 rounded-2xl hover:bg-white/5 transition-all font-bold"
                  >
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-gray-400 text-xs font-black uppercase tracking-widest px-2">الاسم بالكامل</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-8 py-5 text-white font-bold focus:outline-none focus:border-green-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                        placeholder="الاسم الثلاثي..."
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-gray-400 text-xs font-black uppercase tracking-widest px-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-8 py-5 text-white font-bold focus:outline-none focus:border-green-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-gray-400 text-xs font-black uppercase tracking-widest px-2">رقم الهاتف (اختياري)</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-[1.5rem] px-8 py-5 text-white font-bold focus:outline-none focus:border-green-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 font-mono"
                      placeholder="+966 5x xxx xxxx"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-gray-400 text-xs font-black uppercase tracking-widest px-2">تفاصيل الاستفسار</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] px-8 py-6 text-white font-bold focus:outline-none focus:border-green-500/50 focus:bg-white/[0.05] transition-all placeholder:text-gray-600 resize-none leading-relaxed"
                      placeholder="كيف يمكننا مساعدتك اليوم؟..."
                    />
                  </div>
                  
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl flex items-center gap-4 animate-shake">
                       <Zap className="w-5 h-5 shrink-0 rotate-12" />
                       <span className="font-bold">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="premium-btn premium-btn-primary w-full py-6 text-xl flex items-center justify-center gap-4 group"
                  >
                    {loading ? (
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        بدء الاستثمار الآن
                        <Send className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
