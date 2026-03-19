import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, DollarSign, LogOut, User, Briefcase, BarChart3,
  Calendar, Shield, CreditCard, Percent
} from 'lucide-react';
import { getClientProfile, getMyProfits } from '../lib/api';

interface ClientProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  access_code: string;
  subscription_plan: string;
  subscription_price: number;
  subscription_status: string;
  profit_fees_percent: number;
  total_investment: number;
  total_profit: number;
  daily_profit: number;
  balance: number;
  created_at: string;
}

interface ProfitRecord {
  id: number;
  amount: number;
  description: string;
  date: string;
}

export default function ClientPortal() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [profits, setProfits] = useState<ProfitRecord[]>([]);
  const [tab, setTab] = useState<'overview' | 'profits'>('overview');

  const loadData = useCallback(async () => {
    try {
      const [profileRes, profitsRes] = await Promise.all([
        getClientProfile(), getMyProfits()
      ]);
      setProfile(profileRes.data);
      setProfits(profitsRes.data);
    } catch {
      navigate('/client-login');
    }
  }, [navigate]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'client') { navigate('/client-login'); return; }
    loadData();
  }, [navigate, loadData]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/client-login');
  };

  if (!profile) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-green-400 animate-pulse text-lg">جاري التحميل...</div>
      </div>
    );
  }

  const statusLabel = profile.subscription_status === 'active' ? 'نشط' : profile.subscription_status === 'expired' ? 'منتهي' : 'غير نشط';
  const statusColor = profile.subscription_status === 'active' ? 'text-green-400 bg-green-600/20' : 'text-red-400 bg-red-600/20';

  return (
    <div className="min-h-screen bg-slate-900" dir="rtl">
      {/* Top Bar */}
      <div className="glass border-b border-white/10 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-green-400" />
            <div>
              <span className="text-white font-bold block text-sm">بوابة المستثمر</span>
              <span className="text-gray-500 text-xs">مرحباً، {profile.name}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">خروج</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 flex gap-1">
          {[
            { id: 'overview' as const, label: 'نظرة عامة', icon: BarChart3 },
            { id: 'profits' as const, label: 'سجل الأرباح', icon: TrendingUp },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id ? 'border-green-400 text-green-400' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {tab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'إجمالي الاستثمار', value: `$${profile.total_investment.toLocaleString()}`, icon: DollarSign, color: 'text-blue-400', bg: 'bg-blue-600/20' },
                { label: 'إجمالي الأرباح', value: `$${profile.total_profit.toLocaleString()}`, icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-600/20' },
                { label: 'الربح اليومي', value: `$${profile.daily_profit.toLocaleString()}`, icon: BarChart3, color: 'text-amber-400', bg: 'bg-amber-600/20' },
                { label: 'الرصيد الحالي', value: `$${profile.balance.toLocaleString()}`, icon: CreditCard, color: 'text-purple-400', bg: 'bg-purple-600/20' },
              ].map((s, i) => (
                <div key={i} className="glass rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400 text-sm">{s.label}</span>
                    <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                      <s.icon className={`w-5 h-5 ${s.color}`} />
                    </div>
                  </div>
                  <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Profile Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-green-400" />
                  معلومات الحساب
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <div className="flex items-center gap-2 text-gray-400">
                      <User className="w-4 h-4" />
                      <span>الاسم</span>
                    </div>
                    <span className="text-white">{profile.name}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400">البريد الإلكتروني</span>
                    <span className="text-white">{profile.email || '-'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400">رقم الهاتف</span>
                    <span className="text-white">{profile.phone || '-'}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>تاريخ التسجيل</span>
                    </div>
                    <span className="text-white">{new Date(profile.created_at).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-400" />
                  تفاصيل الاشتراك
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Shield className="w-4 h-4" />
                      <span>الباقة</span>
                    </div>
                    <span className="text-amber-400 font-bold">{profile.subscription_plan}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <div className="flex items-center gap-2 text-gray-400">
                      <CreditCard className="w-4 h-4" />
                      <span>سعر الاشتراك</span>
                    </div>
                    <span className="text-white">${profile.subscription_price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-gray-400">حالة الاشتراك</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor}`}>{statusLabel}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Percent className="w-4 h-4" />
                      <span>رسوم الأرباح</span>
                    </div>
                    <span className="text-white">{profile.profit_fees_percent}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'profits' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-bold text-xl">سجل الأرباح</h2>
              <div className="text-green-400 text-sm font-bold">
                الإجمالي: ${profile.total_profit.toLocaleString()}
              </div>
            </div>
            <div className="glass rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-right text-gray-400 p-3 font-medium">#</th>
                      <th className="text-right text-gray-400 p-3 font-medium">المبلغ</th>
                      <th className="text-right text-gray-400 p-3 font-medium">الوصف</th>
                      <th className="text-right text-gray-400 p-3 font-medium">التاريخ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profits.map((p, i) => (
                      <tr key={p.id} className="border-b border-white/5">
                        <td className="p-3 text-gray-500">{i + 1}</td>
                        <td className="p-3 text-green-400 font-bold">${p.amount.toLocaleString()}</td>
                        <td className="p-3 text-gray-300">{p.description}</td>
                        <td className="p-3 text-gray-500 text-xs">{new Date(p.date).toLocaleDateString('ar-SA')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {profits.length === 0 && (
                  <div className="text-center py-12 text-gray-500">لا يوجد سجلات أرباح بعد</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Notice */}
      <div className="text-center py-6 text-gray-600 text-xs">
        <p>هذه البوابة للعرض فقط. لا يمكنك تعديل أي بيانات.</p>
        <p className="mt-1">للاستفسارات تواصل مع الإدارة</p>
      </div>
    </div>
  );
}
