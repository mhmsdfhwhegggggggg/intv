import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Lock, Key, RefreshCw, ArrowRight, Wallet } from 'lucide-react';
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
      const res = await clientLogin(accessCode.trim(), password.trim());
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
    <div className="min-h-screen bg-mesh flex items-center justify-center px-4 selection:bg-green-500/30" dir="rtl">
      <div className="w-full max-w-lg animate-fade-in">
        
        <div className="text-center mb-12">
           <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/20 -rotate-3 hover:rotate-0 transition-transform duration-500">
              <Wallet className="w-10 h-10 text-white" />
           </div>
           <h1 className="text-4xl font-black text-white tracking-tighter mb-2">INVESTOR PORTAL</h1>
           <p className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Secure Financial Terminal</p>
        </div>

        <div className="glass rounded-[3rem] p-10 border-white/10 relative overflow-hidden group">
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full -ml-32 -mb-32 group-hover:bg-green-500/20 transition-all duration-700" />
           
           <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                 <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">Access Key</label>
                 <div className="relative group/input">
                    <Key className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-green-500 transition-colors" />
                    <input
                      type="text"
                      required
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-14 text-white focus:outline-none focus:border-green-500/50 transition-all font-mono font-bold tracking-[0.2em] placeholder:text-gray-700 placeholder:tracking-normal"
                      placeholder="INV-XXXX"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">Secure Pin</label>
                 <div className="relative group/input">
                    <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within/input:text-green-500 transition-colors" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-14 text-white focus:outline-none focus:border-green-500/50 transition-all font-bold placeholder:text-gray-700"
                      placeholder="••••••••"
                    />
                 </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-400 text-sm font-bold text-center animate-shake">
                   {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-green-500/20 active:scale-[0.98]"
              >
                {loading ? (
                   <RefreshCw className="w-6 h-6 animate-spin" />
                ) : (
                   <>
                     <TrendingUp className="w-6 h-6" />
                     <span>ENTER PORTAL</span>
                   </>
                )}
              </button>
           </form>
           
           <p className="text-gray-500 text-[10px] text-center mt-8 font-bold uppercase tracking-wider relative z-10">
              Your credentials were provided by Investcorp Admin. <br/>
              Lost access? Contact support.
           </p>
        </div>

        <button 
          onClick={() => navigate('/')}
          className="mt-8 flex items-center justify-center gap-2 text-gray-500 hover:text-white transition-colors mx-auto font-bold text-sm group"
        >
           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           العودة للموقع الرئيسي
        </button>
      </div>
    </div>
  );
}
