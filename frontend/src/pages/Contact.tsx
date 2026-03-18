import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
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
      <section className="gradient-bg pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">تواصل معنا</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">نسعد بتواصلك معنا. فريقنا جاهز للإجابة على جميع استفساراتك</p>
          <div className="w-20 h-1 bg-green-500 mx-auto rounded-full mt-6"></div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">معلومات التواصل</h2>
              {[
                { icon: Phone, label: 'الهاتف', value: '+971 50 123 4567' },
                { icon: Mail, label: 'البريد الإلكتروني', value: 'info@investcorp-capital.com' },
                { icon: MapPin, label: 'العنوان', value: 'دبي، الإمارات العربية المتحدة' },
              ].map((item, i) => (
                <div key={i} className="glass rounded-xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">{item.label}</div>
                    <div className="text-white font-bold">{item.value}</div>
                  </div>
                </div>
              ))}
              <div className="glass rounded-xl p-5">
                <h3 className="text-white font-bold mb-2">ساعات العمل</h3>
                <p className="text-gray-400 text-sm">الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً</p>
                <p className="text-gray-400 text-sm">الدعم الفني: 24/7</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">أرسل لنا رسالة</h2>
                {success ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold text-xl mb-2">تم إرسال رسالتك بنجاح!</h3>
                    <p className="text-gray-400">سيقوم فريقنا بالرد عليك في أقرب وقت ممكن</p>
                    <button onClick={() => setSuccess(false)} className="mt-4 text-green-400 hover:text-green-300">إرسال رسالة أخرى</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-400 text-sm mb-1 block">الاسم الكامل *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm mb-1 block">البريد الإلكتروني *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                          placeholder="أدخل بريدك الإلكتروني"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">رقم الهاتف</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors"
                        placeholder="أدخل رقم هاتفك"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-1 block">الرسالة *</label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500 transition-colors resize-none"
                        placeholder="اكتب رسالتك هنا..."
                      />
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
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
