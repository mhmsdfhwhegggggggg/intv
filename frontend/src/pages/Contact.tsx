import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, MessageCircle, Clock, Headphones } from 'lucide-react';
import { submitContact } from '../lib/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
    <div className="min-h-screen" dir="rtl">
      {/* Hero */}
      <section className="gradient-bg pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-green-600/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-6">
            <Headphones className="w-4 h-4" />
            <span className="font-medium">نسعد بخدمتك</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-5">
            تواصل <span className="text-gradient">معنا</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            نسعد بتواصلك معنا. فريقنا المتخصص جاهز للإجابة على جميع استفساراتك ومساعدتك في رحلتك الاستثمارية
          </p>
        </div>
      </section>

      {/* Contact channels strip */}
      <section className="py-6 bg-slate-800/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: MessageCircle, text: 'واتساب وتليغرام متاحان', color: 'text-green-400' },
              { icon: Clock, text: 'دعم فني 24/7 على مدار الساعة', color: 'text-blue-400' },
              { icon: Mail, text: 'رد على البريد خلال ساعات', color: 'text-amber-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-3 py-3">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                <span className="text-gray-300 text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <span className="text-green-400 text-sm font-bold tracking-wider mb-3 block">معلومات التواصل</span>
                <h2 className="text-2xl font-black text-white mb-2">تواصل معنا مباشرة</h2>
                <p className="text-gray-400 text-sm">نحن هنا لمساعدتك في أي وقت</p>
              </div>
              {[
                { icon: Phone, label: 'الهاتف', value: '+971 50 123 4567', color: 'text-green-400', bg: 'bg-green-600/15' },
                { icon: Mail, label: 'البريد الإلكتروني', value: 'info@investcorp-capital.com', color: 'text-blue-400', bg: 'bg-blue-600/15' },
                { icon: MapPin, label: 'المقر الرئيسي', value: 'دبي، الإمارات العربية المتحدة', color: 'text-amber-400', bg: 'bg-amber-600/15' },
              ].map((item, i) => (
                <div key={i} className="glass rounded-2xl p-5 flex items-center gap-4 card-hover group">
                  <div className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs font-medium">{item.label}</div>
                    <div className="text-white font-bold text-sm">{item.value}</div>
                  </div>
                </div>
              ))}
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-5 h-5 text-green-400" />
                  <h3 className="text-white font-bold">ساعات العمل</h3>
                </div>
                <div className="space-y-2 pr-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">الأحد - الخميس</span>
                    <span className="text-white font-medium">9:00 ص - 6:00 م</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">الدعم الفني</span>
                    <span className="text-green-400 font-bold">24/7</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass rounded-2xl p-5">
                <h3 className="text-white font-bold mb-4">تابعنا على</h3>
                <div className="flex items-center gap-3">
                  <a href="#" className="w-11 h-11 rounded-xl bg-white/5 hover:bg-green-600/20 border border-white/10 hover:border-green-500/30 flex items-center justify-center transition-all duration-300 group">
                    <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-green-400" />
                  </a>
                  <a href="#" className="w-11 h-11 rounded-xl bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-500/30 flex items-center justify-center transition-all duration-300 group">
                    <Send className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                  </a>
                  <a href="#" className="w-11 h-11 rounded-xl bg-white/5 hover:bg-amber-600/20 border border-white/10 hover:border-amber-500/30 flex items-center justify-center transition-all duration-300 group">
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-amber-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl p-8 md:p-10">
                <div className="mb-8">
                  <span className="text-green-400 text-sm font-bold tracking-wider mb-2 block">نموذج التواصل</span>
                  <h2 className="text-2xl font-black text-white">أرسل لنا رسالة</h2>
                </div>
                {success ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-green-600/15 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-white font-black text-2xl mb-3">تم إرسال رسالتك بنجاح!</h3>
                    <p className="text-gray-400 text-lg mb-6">سيقوم فريقنا بالرد عليك في أقرب وقت ممكن</p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-3 bg-white/5 border border-white/10 hover:border-green-500/30 text-white rounded-xl font-bold transition-all duration-300"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block font-medium">الاسم الكامل <span className="text-red-400">*</span></label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all placeholder:text-gray-600"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm mb-2 block font-medium">البريد الإلكتروني <span className="text-red-400">*</span></label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all placeholder:text-gray-600"
                          placeholder="أدخل بريدك الإلكتروني"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block font-medium">رقم الهاتف</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all placeholder:text-gray-600"
                        placeholder="أدخل رقم هاتفك (اختياري)"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-2 block font-medium">الرسالة <span className="text-red-400">*</span></label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all resize-none placeholder:text-gray-600"
                        placeholder="اكتب رسالتك أو استفسارك هنا..."
                      />
                    </div>
                    {error && (
                      <div className="bg-red-600/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-l from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:opacity-50 disabled:hover:from-green-600 disabled:hover:to-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-green-500/40 text-lg"
                    >
                      <Send className="w-5 h-5" />
                      {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
