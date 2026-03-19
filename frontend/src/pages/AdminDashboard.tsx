import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, TrendingUp, DollarSign, Mail, LogOut, Plus, Trash2, Edit3,
  RefreshCw, Key, Copy, CheckCircle, X, BarChart3, Shield, Search, Globe, Activity, Zap, Clock, Settings, Lock
} from 'lucide-react';
import {
  getClients, getStats, createClient, updateClient, deleteClient,
  resetClientPassword, getProfits, addProfit, deleteProfit,
  getMessages, markMessageRead, deleteMessage, adminChangePassword, api
} from '../lib/api';

interface Client {
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
  notes: string;
  created_at: string;
}

interface Stats {
  total_clients: number;
  active_clients: number;
  total_investment: number;
  total_profits: number;
  unread_messages: number;
}

interface ProfitRecord {
  id: number;
  client_id: number;
  client_name?: string;
  amount: number;
  description: string;
  date: string;
}

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  is_read: number;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clients' | 'profits' | 'messages' | 'subscriptions' | 'settings'>('dashboard');
  const [stats, setStats] = useState<Stats | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [profits, setProfitRecords] = useState<ProfitRecord[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [telegramUrl, setTelegramUrl] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [supportPhone, setSupportPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal states
  const [showAddClient, setShowAddClient] = useState(false);
  const [showEditClient, setShowEditClient] = useState(false);
  const [showAddProfit, setShowAddProfit] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [credentials, setCredentials] = useState({ access_code: '', password: '' });
  const [copied, setCopied] = useState('');

  // Form states
  const [clientForm, setClientForm] = useState({
    name: '', email: '', phone: '', subscription_plan: 'basic',
    subscription_price: 0, subscription_status: 'active',
    profit_fees_percent: 10, total_investment: 0, total_profit: 0,
    daily_profit: 0, balance: 0, notes: ''
  });
  const [profitForm, setProfitForm] = useState({ client_id: 0, amount: 0, description: 'أرباح تداول - INVESTCORP' });
  const [passForm, setPassForm] = useState({ old: '', new: '', confirm: '' });
  const [passLoading, setPassLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [statsRes, clientsRes, profitsRes, messagesRes, subsRes, telRes, emailRes, phoneRes] = await Promise.all([
        getStats(), getClients(), getProfits(), getMessages(),
        api.get('/api/admin/subscriptions'), 
        api.get('/api/settings/telegram_url'),
        api.get('/api/settings/support_email'),
        api.get('/api/settings/support_phone')
      ]);
      setStats(statsRes.data);
      setClients(clientsRes.data);
      setProfitRecords(profitsRes.data);
      setMessages(messagesRes.data);
      setSubscriptions(subsRes.data);
      setTelegramUrl(telRes.data.value || '');
      setSupportEmail(emailRes.data.value || '');
      setSupportPhone(phoneRes.data.value || '');
    } catch {
      navigate('/admin-login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') { navigate('/admin-login'); return; }
    loadData();
  }, [navigate, loadData]);

  const handleUpdateSubscription = async (id: number, status: string) => {
    try {
      const res = await api.put(`/api/admin/subscriptions/${id}`, { status });
      if (status === 'approved' && res.data.access_code) {
        setCredentials({ access_code: res.data.access_code, password: res.data.password });
        setShowCredentials(true);
      }
      loadData();
    } catch { alert('خطأ في تحديث حالة الاشتراك'); }
  };

  const handleUpdateTelegram = async () => {
    try {
      await api.put('/api/admin/settings/telegram_url', { value: telegramUrl });
      alert('تم تحديث رابط تليجرام بنجاح');
    } catch { alert('خطأ في تحديث الإعدادات'); }
  };

  const handleUpdateEmail = async () => {
    try {
      await api.put('/api/admin/settings/support_email', { value: supportEmail });
      alert('تم تحديث البريد الإلكتروني بنجاح');
    } catch { alert('خطأ في التحديث'); }
  };

  const handleUpdatePhone = async () => {
    try {
      await api.put('/api/admin/settings/support_phone', { value: supportPhone });
      alert('تم تحديث رقم الهاتف بنجاح');
    } catch { alert('خطأ في التحديث'); }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin-login');
  };

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createClient(clientForm);
      setCredentials({ access_code: res.data.access_code, password: res.data.password });
      setShowAddClient(false);
      setShowCredentials(true);
      loadData();
    } catch { alert('خطأ في إنشاء العميل'); }
  };

  const handleUpdateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;
    try {
      await updateClient(selectedClient.id, clientForm);
      setShowEditClient(false);
      loadData();
    } catch { alert('خطأ في تحديث العميل'); }
  };

  const handleUpdateProfit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addProfit(profitForm);
      setShowAddProfit(false);
      loadData();
    } catch { alert('خطأ في إضافة الربح'); }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passForm.new !== passForm.confirm) return alert('كلمات المرور الجديدة غير متطابقة');
    setPassLoading(true);
    try {
      await adminChangePassword(passForm.old, passForm.new);
      alert('تم تغيير كلمة المرور بنجاح');
      setPassForm({ old: '', new: '', confirm: '' });
    } catch {
      alert('خطأ في تغيير كلمة المرور، يرجى التأكد من كلمة المرور الحالية');
    } finally {
      setPassLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const filteredClients = clients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) || 
    c.access_code.toUpperCase().includes(search.toUpperCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center">
        <RefreshCw className="w-12 h-12 text-green-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[120vh] bg-mesh selection:bg-green-500/30" dir="rtl">
      
      {/* Sidebar - Desktop */}
      <aside className="fixed right-0 top-0 bottom-0 w-80 glass border-l border-white/5 z-50 p-8 hidden xl:flex flex-col">
        <div className="flex items-center gap-4 mb-12">
           <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <Shield className="w-7 h-7 text-white" />
           </div>
           <div>
              <h1 className="text-white font-black text-xl tracking-tight leading-none">ADMIN</h1>
              <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest mt-1 block">Command Center</span>
           </div>
        </div>

        <nav className="space-y-3 flex-1">
           {[
             { id: 'dashboard', label: 'الرئيسية', icon: BarChart3 },
             { id: 'clients', label: 'إدارة العملاء', icon: Users, count: clients.length },
             { id: 'subscriptions', label: 'طلبات الاشتراك', icon: Zap, count: subscriptions.filter(s => s.status === 'pending').length },
             { id: 'profits', label: 'سجل الأرباح', icon: TrendingUp },
             { id: 'messages', label: 'الرسائل الواردة', icon: Mail, count: stats?.unread_messages },
             { id: 'settings', label: 'الإعدادات', icon: Settings },
           ].map(item => (
             <button
               key={item.id}
               onClick={() => setActiveTab(item.id as any)}
               className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
                 activeTab === item.id ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'
               }`}
             >
                <div className="flex items-center gap-3">
                   <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'group-hover:text-green-400'} transition-colors`} />
                   <span className="font-bold text-sm">{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                   <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${activeTab === item.id ? 'bg-white/20' : 'bg-green-500/10 text-green-400'}`}>
                      {item.count}
                   </span>
                )}
             </button>
           ))}
        </nav>

        <div className="pt-8 border-t border-white/5 space-y-4">
           <button onClick={() => navigate('/trading')} className="w-full flex items-center gap-3 p-4 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-bold">
              <Activity className="w-5 h-5" />
              <span className="text-sm">معاينة التداول</span>
           </button>
           <button onClick={handleLogout} className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-bold">
              <LogOut className="w-5 h-5" />
              <span className="text-sm">تسجيل الخروج</span>
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="xl:mr-80 p-8 xl:p-12">
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
           <div>
              <h2 className="text-4xl font-black text-white mb-2">
                 {activeTab === 'dashboard' ? 'لوحة التحكم' : 
                  activeTab === 'clients' ? 'العملاء' : 
                  activeTab === 'subscriptions' ? 'طلبات الاشتراك' :
                  activeTab === 'profits' ? 'الأرباح' : 
                  activeTab === 'messages' ? 'الرسائل' : 'الإعدادات'}
              </h2>
              <p className="text-gray-500 font-bold flex items-center gap-2">
                 <Clock className="w-4 h-4 text-green-400" />
                 آخر تحديث: {new Date().toLocaleTimeString('ar-SA')}
              </p>
           </div>

           <div className="flex items-center gap-4">
              <div className="relative group">
                 <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-green-400 transition-colors" />
                 <input 
                   type="text" 
                   placeholder="بحث..."
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className="bg-white/5 border border-white/10 rounded-2xl pr-12 pl-6 py-3 w-64 text-white focus:outline-none focus:border-green-500/50 transition-all font-bold text-sm"
                 />
              </div>
              <button 
                onClick={() => {
                  setClientForm({ name: '', email: '', phone: '', subscription_plan: 'basic', subscription_price: 0, subscription_status: 'active', profit_fees_percent: 10, total_investment: 0, total_profit: 0, daily_profit: 0, balance: 0, notes: '' });
                  setShowAddClient(true);
                }}
                className="bg-green-500 hover:bg-green-400 text-white font-black px-6 py-3 rounded-2xl flex items-center gap-3 transition-all shadow-lg shadow-green-500/20 active:scale-95"
              >
                 <Plus className="w-5 h-5" />
                 إضافة مستثمر
              </button>
           </div>
        </header>

        {activeTab === 'dashboard' && stats && (
          <div className="animate-fade-in">
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { label: 'إجمالي المستثمرين', value: stats.total_clients, icon: Users, color: 'text-blue-400' },
                  { label: 'المستثمرون النشطون', value: stats.active_clients, icon: Shield, color: 'text-emerald-400' },
                  { label: 'إجمالي المحافظ', value: `$${stats.total_investment.toLocaleString()}`, icon: DollarSign, color: 'text-amber-400' },
                  { label: 'الأرباح الموزعة', value: `$${stats.total_profits.toLocaleString()}`, icon: TrendingUp, color: 'text-purple-400' },
                ].map((stat, i) => (
                  <div key={i} className="glass p-6 rounded-3xl border-white/5 relative group hover:border-white/20 transition-all overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl rounded-full" />
                     <div className="relative z-10">
                        <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</div>
                        <div className="flex items-end gap-3">
                           <div className="text-white text-3xl font-black">{stat.value}</div>
                           <stat.icon className={`w-6 h-6 mb-1 ${stat.color} opacity-30 group-hover:opacity-100 transition-all`} />
                        </div>
                     </div>
                  </div>
                ))}
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-8 rounded-[3rem] border-white/5">
                   <h3 className="text-white font-black text-xl mb-6">آخر العمليات</h3>
                   <div className="space-y-4">
                      {profits.slice(0, 5).map(p => (
                        <div key={p.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center">
                                 <Plus className="w-5 h-5" />
                              </div>
                              <div>
                                 <div className="text-white font-bold text-sm">{p.client_name}</div>
                                 <div className="text-gray-500 text-xs">{p.description}</div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="text-green-400 font-black">+${p.amount.toLocaleString()}</div>
                              <div className="text-gray-600 text-[10px]">{new Date(p.date).toLocaleDateString('ar-SA')}</div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="glass p-8 rounded-[3rem] border-white/5 flex flex-col items-center justify-center text-center space-y-6">
                   <div className="w-24 h-24 rounded-full border-4 border-green-500/30 border-t-green-500 animate-spin" />
                   <div>
                      <h4 className="text-white font-black text-xl">نظام المراقبة الذكي</h4>
                      <p className="text-gray-500 text-sm mt-2">خوارزميات AI TITAN تراقب حركة الأسواق والصفقات بنجاح طوال الـ 24 ساعة الماضية.</p>
                   </div>
                   <Zap className="w-10 h-10 text-amber-400 animate-pulse" />
                </div>
             </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="glass rounded-[3rem] border-white/5 overflow-hidden animate-slide-up">
             <div className="overflow-x-auto min-h-[500px]">
                <table className="w-full text-right border-collapse">
                   <thead>
                      <tr className="bg-white/5">
                         <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest px-8">المستثمر</th>
                         <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">المحفظة / الباقة</th>
                         <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">إجمالي الرصيد</th>
                         <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">الحالة</th>
                         <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest text-left">التحكم</th>
                      </tr>
                   </thead>
                   <tbody>
                      {filteredClients.map((client) => (
                        <tr key={client.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                           <td className="p-6 px-8">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-black text-green-400 text-lg border border-white/5">
                                    {client.name.charAt(0)}
                                 </div>
                                 <div className="max-w-[200px]">
                                    <div className="text-white font-black truncate">{client.name}</div>
                                    <div className="text-gray-500 text-[10px] font-bold mt-0.5 truncate">{client.email || client.phone}</div>
                                 </div>
                              </div>
                           </td>
                           <td className="p-6">
                              <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{client.subscription_plan}</div>
                              <div className="text-white font-black">${client.total_investment.toLocaleString()}</div>
                           </td>
                           <td className="p-6">
                              <div className="text-green-400 font-black text-lg">${client.balance.toLocaleString()}</div>
                              <div className="text-[10px] text-gray-500 font-bold">كود: <span className="text-amber-500 font-mono">{client.access_code}</span></div>
                           </td>
                           <td className="p-6">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${
                                client.subscription_status === 'active' 
                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}>
                                 {client.subscription_status === 'active' ? 'نشط' : 'متوقف'}
                              </span>
                           </td>
                           <td className="p-6 text-left">
                              <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button 
                                   onClick={() => { setProfitForm({ client_id: client.id, amount: 0, description: 'أرباح تداول يومية - INVESTCORP' }); setSelectedClient(client); setShowAddProfit(true); }}
                                   className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all shadow-lg shadow-amber-500/0 hover:shadow-amber-500/20"
                                   title="إضافة أرباح"
                                 >
                                    <TrendingUp className="w-5 h-5" />
                                 </button>
                                 <button 
                                   onClick={() => {
                                     setSelectedClient(client);
                                     setClientForm({ ...client });
                                     setShowEditClient(true);
                                   }}
                                   className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                                   title="تعديل البيانات"
                                 >
                                    <Edit3 className="w-5 h-5" />
                                 </button>
                                 <div className="w-[1px] h-6 bg-white/10 mx-1" />
                                 <button 
                                   onClick={async () => {
                                     if(confirm('هل أنت متأكد من حذف هذا العميل نهائياً؟')) {
                                       await deleteClient(client.id);
                                       loadData();
                                     }
                                   }}
                                   className="w-10 h-10 rounded-xl bg-white/5 text-gray-400 flex items-center justify-center hover:text-red-400 transition-all"
                                 >
                                    <Trash2 className="w-5 h-5" />
                                 </button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'subscriptions' && (
          <div className="glass rounded-[3rem] border-white/5 overflow-hidden animate-slide-up">
             <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                   <thead>
                      <tr className="bg-white/5">
                         <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest px-8">المستثمر</th>
                         <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">الدولة / الباقة</th>
                         <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">المحفظة / الحساب</th>
                         <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">الحالة</th>
                         <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest text-left">التحكم</th>
                      </tr>
                   </thead>
                   <tbody>
                      {subscriptions.map((sub) => (
                        <tr key={sub.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                           <td className="p-6 px-8">
                              <div className="text-white font-black">{sub.name}</div>
                              <div className="text-gray-500 text-[10px] font-bold mt-0.5">{sub.phone}</div>
                           </td>
                           <td className="p-6">
                              <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{sub.country}</div>
                              <div className="text-white font-black">{sub.plan_name}</div>
                           </td>
                           <td className="p-6">
                              <div className="text-gray-400 text-sm font-mono truncate max-w-[150px]">{sub.account_wallet}</div>
                              {sub.notes && <div className="text-gray-600 text-[10px] mt-1 italic">{sub.notes}</div>}
                           </td>
                           <td className="p-6">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border ${
                                sub.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                sub.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                'bg-red-500/10 text-red-400 border-red-500/20'
                              }`}>
                                 {sub.status === 'pending' ? 'انتظار' : sub.status === 'approved' ? 'تم القبول' : 'مرفوض'}
                              </span>
                           </td>
                           <td className="p-6 text-left">
                              {sub.status === 'pending' && (
                                <div className="flex items-center gap-2 justify-end">
                                   <button 
                                     onClick={() => handleUpdateSubscription(sub.id, 'approved')}
                                     className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-all shadow-lg shadow-green-500/0 hover:shadow-green-500/20"
                                     title="قبول وتفعيل حساب"
                                   >
                                      <CheckCircle className="w-5 h-5" />
                                   </button>
                                   <button 
                                     onClick={() => handleUpdateSubscription(sub.id, 'rejected')}
                                     className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/0 hover:shadow-red-500/20"
                                     title="رفض الطلب"
                                   >
                                      <X className="w-5 h-5" />
                                   </button>
                                </div>
                              )}
                           </td>
                        </tr>
                      ))}
                      {subscriptions.length === 0 && (
                        <tr>
                           <td colSpan={5} className="p-20 text-center text-gray-500 font-bold">لا يوجد طلبات اشتراك حالياً</td>
                        </tr>
                      )}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'profits' && (
          <div className="glass rounded-[3rem] border-white/5 overflow-hidden animate-slide-up">
             <table className="w-full text-right border-collapse">
                <thead>
                   <tr className="bg-white/5">
                      <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest px-8">العميل</th>
                      <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">المبلغ</th>
                      <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">البيان</th>
                      <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest">التاريخ</th>
                      <th className="p-6 text-gray-500 text-[10px] font-black uppercase tracking-widest text-left px-8">إجراء</th>
                   </tr>
                </thead>
                <tbody>
                   {profits.map(p => (
                     <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                        <td className="p-6 px-8 text-white font-black">{p.client_name}</td>
                        <td className="p-6 text-green-400 font-black">${p.amount.toLocaleString()}</td>
                        <td className="p-6 text-gray-400 font-bold">{p.description}</td>
                        <td className="p-6 text-gray-500 text-xs font-bold">{new Date(p.date).toLocaleString('ar-SA')}</td>
                        <td className="p-6 text-left px-8">
                           <button onClick={async () => { if(confirm('حذف السجل؟')) { await deleteProfit(p.id); loadData(); } }} className="text-red-400 hover:bg-red-500/10 p-2 rounded-xl transition-all">
                              <Trash2 className="w-5 h-5" />
                           </button>
                        </td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6 animate-slide-up">
             {messages.map(m => (
               <div key={m.id} className={`glass p-8 rounded-[2.5rem] border-white/5 relative group transition-all ${!m.is_read ? 'bg-green-500/[0.03] border-green-500/20' : ''}`}>
                  <div className="flex flex-col md:flex-row gap-6">
                     <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                           <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white font-black text-xl">
                              {m.name.charAt(0)}
                           </div>
                           <div>
                              <h4 className="text-white font-black text-lg">{m.name}</h4>
                              <div className="flex flex-wrap gap-4 mt-1">
                                 <span className="text-gray-500 text-xs font-bold flex items-center gap-1"><Globe className="w-3 h-3" /> {m.email}</span>
                                 <span className="text-gray-500 text-xs font-bold flex items-center gap-1"><Activity className="w-3 h-3" /> {m.phone}</span>
                                 <span className="text-gray-600 text-[10px] font-bold">{new Date(m.created_at).toLocaleString('ar-SA')}</span>
                              </div>
                           </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed font-bold bg-white/5 p-4 rounded-2xl">{m.message}</p>
                     </div>
                     <div className="flex md:flex-col gap-3 justify-end items-end">
                        {!m.is_read && (
                          <button onClick={async () => { await markMessageRead(m.id); loadData(); }} className="bg-green-500/10 text-green-400 font-bold text-xs px-6 py-3 rounded-xl hover:bg-green-500 hover:text-white transition-all">تم القراءة</button>
                        )}
                        <button onClick={async () => { if(confirm('حذف الرسالة؟')) { await deleteMessage(m.id); loadData(); } }} className="bg-red-500/10 text-red-400 font-bold text-xs px-6 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all">حذف</button>
                     </div>
                  </div>
               </div>
             ))}
             {messages.length === 0 && <div className="p-32 text-center glass rounded-[3rem] text-gray-500 font-bold">لا توجد رسائل واردة</div>}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto animate-fade-in">
             <div className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[120px] rounded-full" />
                <h3 className="text-white font-black text-2xl mb-8 flex items-center gap-3"><Lock className="text-amber-500" /> إعدادات الحساب</h3>
                
                <form onSubmit={handleUpdatePassword} className="space-y-6 relative z-10">
                   <div>
                      <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">كلمة المرور الحالية</label>
                      <input 
                        type="password" 
                        required 
                        value={passForm.old} 
                        onChange={e => setPassForm({...passForm, old: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500/50" 
                      />
                   </div>
                   <div>
                      <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">كلمة المرور الجديدة</label>
                      <input 
                        type="password" 
                        required 
                        value={passForm.new} 
                        onChange={e => setPassForm({...passForm, new: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50" 
                      />
                   </div>
                   <div>
                      <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">تأكيد كلمة المرور الجديدة</label>
                      <input 
                        type="password" 
                        required 
                        value={passForm.confirm} 
                        onChange={e => setPassForm({...passForm, confirm: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50" 
                      />
                   </div>
                   
                   <button 
                     type="submit" 
                     disabled={passLoading}
                     className="premium-btn premium-btn-primary w-full py-4 mt-4"
                   >
                      {passLoading ? <RefreshCw className="w-6 h-6 animate-spin mx-auto" /> : 'تحديث كلمة المرور'}
                   </button>
                </form>
             </div>

              <div className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden mt-8 text-right">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[120px] rounded-full" />
                 <h3 className="text-white font-black text-2xl mb-8 flex items-center gap-3"><Zap className="text-green-500" /> إعدادات الموقع</h3>
                 
                 <div className="space-y-8 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                       <div className="space-y-2">
                          <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">البريد الإلكتروني للدعم</label>
                          <div className="flex gap-4">
                             <input 
                               type="text" 
                               value={supportEmail} 
                               onChange={e => setSupportEmail(e.target.value)}
                               className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50 text-left font-mono" 
                             />
                             <button onClick={handleUpdateEmail} className="bg-blue-500 hover:bg-blue-600 text-white font-black px-6 py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20">حفظ</button>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">رقم الهاتف / واتساب</label>
                          <div className="flex gap-4">
                             <input 
                               type="text" 
                               value={supportPhone} 
                               onChange={e => setSupportPhone(e.target.value)}
                               className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50 text-left font-mono" 
                             />
                             <button onClick={handleUpdatePhone} className="bg-amber-500 hover:bg-amber-600 text-white font-black px-6 py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/20">حفظ</button>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">رابط تليجرام الموحد</label>
                       <div className="flex gap-4">
                          <input 
                            type="text" 
                            value={telegramUrl} 
                            onChange={e => setTelegramUrl(e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50 font-mono text-left" 
                          />
                          <button 
                            onClick={handleUpdateTelegram}
                            className="bg-green-500 hover:bg-green-600 text-white font-black px-8 py-4 rounded-2xl transition-all shadow-lg shadow-green-500/20"
                          >
                             حفظ
                          </button>
                       </div>
                       <p className="text-[10px] text-gray-600 mt-2 font-bold uppercase tracking-widest px-2">سيتم استبدال كافة روابط التواصل في الموقع بهذا الرابط تلقائياً</p>
                    </div>
                 </div>
              </div>
             
             <div className="mt-8 glass p-8 rounded-[2.5rem] border-white/5 text-center">
                <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-2">النظام الحالي</div>
                <div className="text-white font-bold">Investcorp Core v2.4.0 <span className="text-green-500 ml-2">Secure</span></div>
             </div>
          </div>
        )}

      </main>

      {/* Modals */}
      {showAddClient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddClient(false)} />
           <div className="glass w-full max-w-2xl rounded-[3rem] p-10 border-white/10 relative z-10 animate-fade-in">
              <h3 className="text-white font-black text-2xl mb-8 flex items-center gap-3"><Plus className="text-green-500" /> تسجيل مستثمر جديد</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleCreateClient}>
                 <div className="md:col-span-2">
                    <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">الاسم الكامل</label>
                    <input value={clientForm.name} onChange={e => setClientForm({...clientForm, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50" required />
                 </div>
                 <div>
                    <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">البريد الإلكتروني</label>
                    <input value={clientForm.email} onChange={e => setClientForm({...clientForm, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50" />
                 </div>
                 <div>
                    <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">رقم الهاتف</label>
                    <input value={clientForm.phone} onChange={e => setClientForm({...clientForm, phone: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50" />
                 </div>
                 <div>
                    <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">الباقة</label>
                    <select value={clientForm.subscription_plan} onChange={e => setClientForm({...clientForm, subscription_plan: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50">
                       <option value="Basic">الأساسية (Basic)</option>
                       <option value="Diamond">الماسية (Diamond)</option>
                       <option value="Titan">تيتان (Titan)</option>
                       <option value="Saudi">السعودية (Saudi)</option>
                       <option value="Emirates">الإمارات (Emirates)</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">سعر الاشتراك ($)</label>
                    <input type="number" value={clientForm.subscription_price} onChange={e => setClientForm({...clientForm, subscription_price: Number(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50" required />
                 </div>
                 <div className="md:col-span-2">
                    <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">رأس المال المستثمر ($)</label>
                    <input type="number" value={clientForm.total_investment} onChange={e => setClientForm({...clientForm, total_investment: Number(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50 text-xl font-black" required />
                 </div>
                 <div className="md:col-span-2 flex gap-4 mt-6">
                    <button type="submit" className="premium-btn premium-btn-primary flex-1 py-4">تأكيد التسجيل</button>
                    <button type="button" onClick={() => setShowAddClient(false)} className="px-8 py-4 text-gray-400 font-bold hover:text-white">إلغاء</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {showEditClient && selectedClient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowEditClient(false)} />
           <div className="glass w-full max-w-2xl rounded-[3rem] p-10 border-white/10 relative z-10 animate-fade-in max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                 <h3 className="text-white font-black text-2xl flex items-center gap-3"><Edit3 className="text-blue-400" /> تعديل بيانات: {selectedClient.name}</h3>
                 <button onClick={() => setShowEditClient(false)} className="text-gray-500 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleUpdateClient}>
                 <div className="md:col-span-2">
                    <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">الاسم</label>
                    <input value={clientForm.name} onChange={e => setClientForm({...clientForm, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50" />
                 </div>
                 <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4 bg-white/5 p-4 rounded-3xl">
                    <div className="space-y-1">
                       <label className="text-[10px] text-gray-500 font-black px-1">الرصيد ($)</label>
                       <input type="number" value={clientForm.balance} onChange={e => setClientForm({...clientForm, balance: Number(e.target.value)})} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 text-white font-black" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] text-gray-500 font-black px-1">الأرباح ($)</label>
                       <input type="number" value={clientForm.total_profit} onChange={e => setClientForm({...clientForm, total_profit: Number(e.target.value)})} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 text-white font-black" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] text-gray-500 font-black px-1">الاستثمار ($)</label>
                       <input type="number" value={clientForm.total_investment} onChange={e => setClientForm({...clientForm, total_investment: Number(e.target.value)})} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 text-white font-black" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] text-gray-500 font-black px-1">نسبة الرسوم (%)</label>
                       <input type="number" value={clientForm.profit_fees_percent} onChange={e => setClientForm({...clientForm, profit_fees_percent: Number(e.target.value)})} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-3 py-2 text-white font-black" />
                    </div>
                 </div>
                 <div>
                    <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">حالة الحساب</label>
                    <select value={clientForm.subscription_status} onChange={e => setClientForm({...clientForm, subscription_status: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50">
                       <option value="active">نشط (Active)</option>
                       <option value="inactive">معطل (Inactive)</option>
                       <option value="expired">منتهي (Expired)</option>
                    </select>
                 </div>
                 <div>
                    <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">رمز الدخول</label>
                    <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-amber-500 font-mono font-bold flex justify-between items-center">
                       {selectedClient.access_code}
                       <button type="button" onClick={async () => {
                         if(confirm('تنبيه: سيتم إعادة تعيين كلمة المرور، هل تريد الاستمرار؟')) {
                           const res = await resetClientPassword(selectedClient.id);
                           setCredentials({ access_code: selectedClient.access_code, password: res.data.new_password });
                           setShowEditClient(false);
                           setShowCredentials(true);
                         }
                       }} className="text-xs text-blue-400 border border-blue-400/30 px-2 py-1 rounded-lg hover:bg-blue-400 hover:text-white">إعادة تعيين</button>
                    </div>
                 </div>
                 <div className="md:col-span-2">
                    <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">ملاحظات إدارية</label>
                    <textarea value={clientForm.notes} onChange={e => setClientForm({...clientForm, notes: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50 h-24" />
                 </div>
                 <div className="md:col-span-2 flex gap-4 mt-6">
                    <button type="submit" className="premium-btn premium-btn-primary flex-1 py-4">حفظ التغييرات</button>
                    <button type="button" onClick={() => setShowEditClient(false)} className="px-8 py-4 text-gray-400 font-bold">إلغاء</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {showAddProfit && selectedClient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowAddProfit(false)} />
           <div className="glass w-full max-w-md rounded-[3rem] p-10 border-white/10 relative z-10 animate-fade-in text-center">
              <div className="w-16 h-16 rounded-3xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-6">
                 <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-white font-black text-xl">إضافة ربح: {selectedClient.name}</h3>
              <p className="text-gray-500 text-xs mt-2 mb-8">سيتم إضافة المبلغ مباشرة إلى رصيد العميل</p>
              
              <form onSubmit={handleUpdateProfit} className="space-y-6">
                 <div>
                    <label className="text-right block text-[10px] text-gray-500 font-black mb-1 px-2">المبلغ ($)</label>
                    <input type="number" value={profitForm.amount} onChange={e => setProfitForm({...profitForm, amount: Number(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-3xl font-black text-center focus:outline-none focus:border-green-500/50" placeholder="0.00" required />
                 </div>
                 <div>
                    <label className="text-right block text-[10px] text-gray-500 font-black mb-1 px-2">البيان</label>
                    <input value={profitForm.description} onChange={e => setProfitForm({...profitForm, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-green-500/50" />
                 </div>
                 <div className="flex gap-4 pt-4">
                    <button type="submit" className="premium-btn premium-btn-primary flex-1 py-4">إيداع الربح الآن</button>
                    <button type="button" onClick={() => setShowAddProfit(false)} className="px-6 py-4 text-gray-400 font-bold">إلغاء</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {showCredentials && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCredentials(false)} />
           <div className="glass w-full max-w-md rounded-[3rem] p-10 border-white/10 relative z-10 animate-fade-in text-center">
              <div className="w-16 h-16 rounded-3xl bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-6">
                 <Key className="w-8 h-8" />
              </div>
              <h3 className="text-white font-black text-xl mb-2">بيانات الدخول للعميل</h3>
              <p className="text-gray-500 text-xs mb-8">يرجى نسخ وتزويد العميل بهذه البيانات للدخول</p>

              <div className="space-y-4 mb-8">
                 <div className="bg-white/5 p-6 rounded-3xl border border-white/5 text-right space-y-4">
                    <div>
                       <div className="text-[10px] text-gray-500 font-black uppercase px-1">رابط الحساب</div>
                       <div className="text-white text-sm font-bold mt-1 break-all">{window.location.origin}/client-login</div>
                    </div>
                    <div>
                       <div className="text-[10px] text-gray-500 font-black uppercase px-1">رمز الدخول</div>
                       <div className="text-amber-500 text-xl font-mono font-black mt-1">{credentials.access_code}</div>
                    </div>
                    <div>
                       <div className="text-[10px] text-gray-500 font-black uppercase px-1">كلمة المرور</div>
                       <div className="text-white text-xl font-mono font-black mt-1">{credentials.password}</div>
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-3">
                 <button 
                   onClick={() => {
                     const text = `🔹 تفاصيل حسابك في INVESTCORP 🔹\n\n📌 رابط الدخول: ${window.location.origin}/client-login\n🔑 رمز الدخول: ${credentials.access_code}\n🔐 كلمة المرور: ${credentials.password}\n\nللأمان، يرجى عدم مشاركة هذه البيانات مع أي شخص.`;
                     copyToClipboard(text, 'all');
                   }}
                   className="premium-btn premium-btn-primary py-4 flex items-center justify-center gap-3"
                 >
                    {copied === 'all' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    {copied === 'all' ? 'تم نسخ النص المنسق' : 'نسخ الرسالة كاملة'}
                 </button>
                 <button onClick={() => setShowCredentials(false)} className="text-gray-500 font-bold py-2">إغلاق</button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}
