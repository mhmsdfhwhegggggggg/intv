import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, User, TrendingUp } from 'lucide-react';
import { adminLogin } from '../lib/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await adminLogin(username, password);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', 'admin');
      localStorage.setItem('username', res.data.username);
      navigate('/admin');
    } catch {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4 relative overflow-hidden" dir="rtl">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo link */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
          <TrendingUp className="w-7 h-7 text-green-400 group-hover:scale-110 transition-transform" />
          <span className="text-white font-black text-xl">INVESTCORP</span>
        </Link>

        <div className="glass rounded-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-[72px] h-[72px] bg-amber-600/15 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Shield className="w-9 h-9 text-amber-400" />
            </div>
            <h1 className="text-2xl font-black text-white">لوحة تحكم الإدارة</h1>
            <p className="text-gray-400 text-sm mt-2">قم بتسجيل الدخول للوصول إلى لوحة التحكم</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-gray-400 text-sm mb-2 block font-medium">اسم المستخدم</label>
              <div className="relative">
                <User className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pr-11 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-gray-600"
                  placeholder="أدخل اسم المستخدم"
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
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 pr-11 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-gray-600"
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
              className="w-full py-3.5 bg-gradient-to-l from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-amber-600/25 hover:shadow-amber-500/40 text-lg"
            >
              <Shield className="w-5 h-5" />
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
        <p className="text-gray-600 text-xs text-center mt-6">محمي بتشفير SSL 256-bit</p>
      </div>
    </div>
  );
}
