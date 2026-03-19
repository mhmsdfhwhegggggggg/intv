import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TrendingUp, Lock, Key } from 'lucide-react';
import { clientLogin } from '../lib/api';

export default function ClientLogin() {
  const [accessCode, setAccessCode] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await clientLogin(accessCode, password);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'client');
      localStorage.setItem('username', res.data.name);
      navigate('/client');
    } catch {
      setError('رمز الدخول أو كلمة المرور غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4 relative overflow-hidden" dir="rtl">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo link */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <TrendingUp className="w-7 h-7 text-green-400 group-hover:scale-110 transition-transform" />
          <span className="text-white font-black text-xl">INVESTCORP</span>
        </Link>

        <div className="glass rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-[72px] h-[72px] bg-green-600/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <TrendingUp className="w-9 h-9 text-green-400" />
            </div>
            <h1 className="text-2xl font-black text-white">بوابة المستثمر</h1>
            <p className="text-gray-400 text-sm mt-2">قم بتسجيل الدخول لمتابعة استثماراتك وأرباحك</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-400 text-sm mb-2 block font-medium">رمز الدخول</label>
              <div className="relative">
                <Key className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  required
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pr-11 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all tracking-widest placeholder:text-gray-600 placeholder:tracking-normal"
                  placeholder="أدخل رمز الدخول"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block font-medium">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pr-11 text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 transition-all placeholder:text-gray-600"
                  placeholder="أدخل كلمة المرور"
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-600/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-l from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-green-500/40 text-lg"
            >
              <TrendingUp className="w-5 h-5" />
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>
          <p className="text-gray-500 text-xs text-center mt-6">تم إرسال بيانات الدخول إليك من قبل الإدارة</p>
        </div>
        <p className="text-gray-600 text-xs text-center mt-6">محمي بتشفير SSL 256-bit</p>
      </div>
    </div>
  );
}
