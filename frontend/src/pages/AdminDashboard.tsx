import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, TrendingUp, DollarSign, Mail, LogOut, Plus, Trash2, Edit3, Eye,
  RefreshCw, Key, Copy, CheckCircle, X, BarChart3, Shield, Search
} from 'lucide-react';
import {
  getClients, getStats, createClient, updateClient, deleteClient,
  resetClientPassword, getProfits, addProfit, deleteProfit,
  getMessages, markMessageRead, deleteMessage
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
  is_active: number;
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
  const [tab, setTab] = useState<'dashboard' | 'clients' | 'profits' | 'messages'>('dashboard');
  const [stats, setStats] = useState<Stats | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [profits, setProfits] = useState<ProfitRecord[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [search, setSearch] = useState('');

  // Modal states
  const [showAddClient, setShowAddClient] = useState(false);
  const [showEditClient, setShowEditClient] = useState(false);
  const [showViewClient, setShowViewClient] = useState(false);
  const [showAddProfit, setShowAddProfit] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [credentials, setCredentials] = useState({ access_code: '', password: '' });
  const [copied, setCopied] = useState('');

  // Form states
  const [clientForm, setClientForm] = useState({
    name: '', email: '', phone: '', subscription_plan: 'basic',
    subscription_price: 0, subscription_status: 'active',
    profit_fees_percent: 0, total_investment: 0, total_profit: 0,
    daily_profit: 0, balance: 0, notes: ''
  });
  const [profitForm, setProfitForm] = useState({ client_id: 0, amount: 0, description: '' });

  const loadData = useCallback(async () => {
    try {
      const [statsRes, clientsRes, profitsRes, messagesRes] = await Promise.all([
        getStats(), getClients(), getProfits(), getMessages()
      ]);
      setStats(statsRes.data);
      setClients(clientsRes.data);
      setProfits(profitsRes.data);
      setMessages(messagesRes.data);
    } catch {
      navigate('/admin-login');
    }
  }, [navigate]);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') { navigate('/admin-login'); return; }
    loadData();
  }, [navigate, loadData]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/admin-login');
  };

  const handleCreateClient = async () => {
    try {
      const res = await createClient(clientForm);
      setCredentials({ access_code: res.data.access_code, password: res.data.password });
      setShowAddClient(false);
      setShowCredentials(true);
      setClientForm({ name: '', email: '', phone: '', subscription_plan: 'basic', subscription_price: 0, subscription_status: 'active', profit_fees_percent: 0, total_investment: 0, total_profit: 0, daily_profit: 0, balance: 0, notes: '' });
      loadData();
    } catch { alert('خطأ في إنشاء العميل'); }
  };

  const handleUpdateClient = async () => {
    if (!selectedClient) return;
    try {
      await updateClient(selectedClient.id, clientForm);
      setShowEditClient(false);
      loadData();
    } catch { alert('خطأ في تحديث العميل'); }
  };

  const handleDeleteClient = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا العميل؟')) return;
    try { await deleteClient(id); loadData(); } catch { alert('خطأ في حذف العميل'); }
  };

  const handleResetPassword = async (id: number) => {
    try {
      const res = await resetClientPassword(id);
      setCredentials({ access_code: res.data.access_code, password: res.data.new_password });
      setShowCredentials(true);
    } catch { alert('خطأ في إعادة تعيين كلمة المرور'); }
  };

  const handleAddProfit = async () => {
    try {
      await addProfit(profitForm);
      setShowAddProfit(false);
      setProfitForm({ client_id: 0, amount: 0, description: '' });
      loadData();
    } catch { alert('خطأ في إضافة الربح'); }
  };

  const handleDeleteProfit = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا السجل؟')) return;
    try { await deleteProfit(id); loadData(); } catch { alert('خطأ'); }
  };

  const handleMarkRead = async (id: number) => {
    try { await markMessageRead(id); loadData(); } catch { /* ignore */ }
  };

  const handleDeleteMessage = async (id: number) => {
    try { await deleteMessage(id); loadData(); } catch { /* ignore */ }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const openEditClient = (client: Client) => {
    setSelectedClient(client);
    setClientForm({
      name: client.name, email: client.email, phone: client.phone,
      subscription_plan: client.subscription_plan, subscription_price: client.subscription_price,
      subscription_status: client.subscription_status, profit_fees_percent: client.profit_fees_percent,
      total_investment: client.total_investment, total_profit: client.total_profit,
      daily_profit: client.daily_profit, balance: client.balance, notes: client.notes
    });
    setShowEditClient(true);
  };

  const filteredClients = clients.filter(c =>
    c.name.includes(search) || c.email.includes(search) || c.access_code.includes(search.toUpperCase())
  );

  const tabs = [
    { id: 'dashboard' as const, label: 'لوحة التحكم', icon: BarChart3 },
    { id: 'clients' as const, label: 'العملاء', icon: Users },
    { id: 'profits' as const, label: 'الأرباح', icon: TrendingUp },
    { id: 'messages' as const, label: 'الرسائل', icon: Mail, badge: stats?.unread_messages },
  ];

  return (
    <div className="min-h-screen bg-slate-900" dir="rtl">
      {/* Top Bar */}
      <div className="glass border-b border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-amber-400" />
            <span className="text-white font-bold">لوحة تحكم الإدارة</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={loadData} className="p-2 text-gray-400 hover:text-white transition-colors">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="text-sm">خروج</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                tab === t.id ? 'border-amber-400 text-amber-400' : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
              {t.badge ? <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">{t.badge}</span> : null}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Dashboard Tab */}
        {tab === 'dashboard' && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'إجمالي العملاء', value: stats.total_clients, icon: Users, color: 'text-blue-400', bg: 'bg-blue-600/20' },
                { label: 'العملاء النشطون', value: stats.active_clients, icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-600/20' },
                { label: 'إجمالي الاستثمارات', value: `$${stats.total_investment.toLocaleString()}`, icon: DollarSign, color: 'text-amber-400', bg: 'bg-amber-600/20' },
                { label: 'إجمالي الأرباح', value: `$${stats.total_profits.toLocaleString()}`, icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-600/20' },
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
            <div className="glass rounded-xl p-6">
              <h3 className="text-white font-bold mb-4">آخر العملاء المسجلين</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-right text-gray-400 pb-3 font-medium">الاسم</th>
                      <th className="text-right text-gray-400 pb-3 font-medium">الباقة</th>
                      <th className="text-right text-gray-400 pb-3 font-medium">الاستثمار</th>
                      <th className="text-right text-gray-400 pb-3 font-medium">الحالة</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.slice(0, 5).map(c => (
                      <tr key={c.id} className="border-b border-white/5">
                        <td className="py-3 text-white">{c.name}</td>
                        <td className="py-3 text-gray-400">{c.subscription_plan}</td>
                        <td className="py-3 text-green-400">${c.total_investment.toLocaleString()}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${c.subscription_status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                            {c.subscription_status === 'active' ? 'نشط' : 'غير نشط'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {tab === 'clients' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="بحث عن عميل..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-white text-sm focus:outline-none focus:border-green-500"
                />
              </div>
              <button onClick={() => setShowAddClient(true)} className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all">
                <Plus className="w-4 h-4" />
                إضافة عميل جديد
              </button>
            </div>

            <div className="glass rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-right text-gray-400 p-3 font-medium">الاسم</th>
                      <th className="text-right text-gray-400 p-3 font-medium">رمز الدخول</th>
                      <th className="text-right text-gray-400 p-3 font-medium">الباقة</th>
                      <th className="text-right text-gray-400 p-3 font-medium">سعر الاشتراك</th>
                      <th className="text-right text-gray-400 p-3 font-medium">الاستثمار</th>
                      <th className="text-right text-gray-400 p-3 font-medium">الأرباح</th>
                      <th className="text-right text-gray-400 p-3 font-medium">الرصيد</th>
                      <th className="text-right text-gray-400 p-3 font-medium">رسوم الأرباح</th>
                      <th className="text-right text-gray-400 p-3 font-medium">الحالة</th>
                      <th className="text-right text-gray-400 p-3 font-medium">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map(c => (
                      <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-3 text-white font-medium">{c.name}</td>
                        <td className="p-3 text-amber-400 font-mono text-xs">{c.access_code}</td>
                        <td className="p-3 text-gray-400">{c.subscription_plan}</td>
                        <td className="p-3 text-gray-400">${c.subscription_price}</td>
                        <td className="p-3 text-blue-400">${c.total_investment.toLocaleString()}</td>
                        <td className="p-3 text-green-400">${c.total_profit.toLocaleString()}</td>
                        <td className="p-3 text-purple-400">${c.balance.toLocaleString()}</td>
                        <td className="p-3 text-gray-400">{c.profit_fees_percent}%</td>
                        <td className="p-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${c.subscription_status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                            {c.subscription_status === 'active' ? 'نشط' : 'غير نشط'}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => { setSelectedClient(c); setShowViewClient(true); }} className="p-1.5 text-blue-400 hover:bg-blue-600/20 rounded-lg" title="عرض">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => openEditClient(c)} className="p-1.5 text-amber-400 hover:bg-amber-600/20 rounded-lg" title="تعديل">
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleResetPassword(c.id)} className="p-1.5 text-purple-400 hover:bg-purple-600/20 rounded-lg" title="إعادة كلمة المرور">
                              <Key className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDeleteClient(c.id)} className="p-1.5 text-red-400 hover:bg-red-600/20 rounded-lg" title="حذف">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredClients.length === 0 && (
                  <div className="text-center py-12 text-gray-500">لا يوجد عملاء</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Profits Tab */}
        {tab === 'profits' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-white font-bold text-xl">سجل الأرباح</h2>
              <button onClick={() => setShowAddProfit(true)} className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold flex items-center gap-2">
                <Plus className="w-4 h-4" />
                إضافة ربح
              </button>
            </div>
            <div className="glass rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-right text-gray-400 p-3 font-medium">العميل</th>
                      <th className="text-right text-gray-400 p-3 font-medium">المبلغ</th>
                      <th className="text-right text-gray-400 p-3 font-medium">الوصف</th>
                      <th className="text-right text-gray-400 p-3 font-medium">التاريخ</th>
                      <th className="text-right text-gray-400 p-3 font-medium">إجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profits.map(p => (
                      <tr key={p.id} className="border-b border-white/5">
                        <td className="p-3 text-white">{p.client_name}</td>
                        <td className="p-3 text-green-400 font-bold">${p.amount.toLocaleString()}</td>
                        <td className="p-3 text-gray-400">{p.description}</td>
                        <td className="p-3 text-gray-500 text-xs">{new Date(p.date).toLocaleDateString('ar-SA')}</td>
                        <td className="p-3">
                          <button onClick={() => handleDeleteProfit(p.id)} className="p-1.5 text-red-400 hover:bg-red-600/20 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {profits.length === 0 && <div className="text-center py-12 text-gray-500">لا يوجد سجلات أرباح</div>}
              </div>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {tab === 'messages' && (
          <div className="space-y-4">
            <h2 className="text-white font-bold text-xl">رسائل التواصل</h2>
            <div className="space-y-3">
              {messages.map(m => (
                <div key={m.id} className={`glass rounded-xl p-5 ${!m.is_read ? 'border-green-500/30' : ''}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-white font-bold">{m.name}</span>
                      <span className="text-gray-500 text-xs mr-3">{m.email}</span>
                      {m.phone && <span className="text-gray-500 text-xs mr-3">{m.phone}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-xs">{new Date(m.created_at).toLocaleDateString('ar-SA')}</span>
                      {!m.is_read && (
                        <button onClick={() => handleMarkRead(m.id)} className="text-green-400 hover:text-green-300 text-xs">تم القراءة</button>
                      )}
                      <button onClick={() => handleDeleteMessage(m.id)} className="p-1 text-red-400 hover:bg-red-600/20 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">{m.message}</p>
                </div>
              ))}
              {messages.length === 0 && <div className="text-center py-12 text-gray-500 glass rounded-xl">لا يوجد رسائل</div>}
            </div>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      {showAddClient && (
        <Modal title="إضافة عميل جديد" onClose={() => setShowAddClient(false)}>
          <ClientFormFields form={clientForm} setForm={setClientForm} />
          <button onClick={handleCreateClient} className="w-full mt-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all">إنشاء العميل</button>
        </Modal>
      )}

      {/* Edit Client Modal */}
      {showEditClient && selectedClient && (
        <Modal title={`تعديل العميل: ${selectedClient.name}`} onClose={() => setShowEditClient(false)}>
          <ClientFormFields form={clientForm} setForm={setClientForm} />
          <button onClick={handleUpdateClient} className="w-full mt-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all">حفظ التعديلات</button>
        </Modal>
      )}

      {/* View Client Modal */}
      {showViewClient && selectedClient && (
        <Modal title={`بيانات العميل: ${selectedClient.name}`} onClose={() => setShowViewClient(false)}>
          <div className="space-y-3 text-sm">
            {[
              ['الاسم', selectedClient.name],
              ['البريد', selectedClient.email],
              ['الهاتف', selectedClient.phone],
              ['رمز الدخول', selectedClient.access_code],
              ['الباقة', selectedClient.subscription_plan],
              ['سعر الاشتراك', `$${selectedClient.subscription_price}`],
              ['حالة الاشتراك', selectedClient.subscription_status === 'active' ? 'نشط' : 'غير نشط'],
              ['رسوم الأرباح', `${selectedClient.profit_fees_percent}%`],
              ['إجمالي الاستثمار', `$${selectedClient.total_investment.toLocaleString()}`],
              ['إجمالي الأرباح', `$${selectedClient.total_profit.toLocaleString()}`],
              ['الربح اليومي', `$${selectedClient.daily_profit.toLocaleString()}`],
              ['الرصيد', `$${selectedClient.balance.toLocaleString()}`],
              ['ملاحظات', selectedClient.notes || '-'],
            ].map(([label, value], i) => (
              <div key={i} className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">{label}</span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Add Profit Modal */}
      {showAddProfit && (
        <Modal title="إضافة ربح" onClose={() => setShowAddProfit(false)}>
          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">العميل</label>
              <select
                value={profitForm.client_id}
                onChange={e => setProfitForm({ ...profitForm, client_id: Number(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
              >
                <option value={0}>اختر العميل</option>
                {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">المبلغ ($)</label>
              <input type="number" value={profitForm.amount} onChange={e => setProfitForm({ ...profitForm, amount: Number(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">الوصف</label>
              <input type="text" value={profitForm.description} onChange={e => setProfitForm({ ...profitForm, description: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500" placeholder="وصف الربح" />
            </div>
          </div>
          <button onClick={handleAddProfit} className="w-full mt-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all">إضافة الربح</button>
        </Modal>
      )}

      {/* Credentials Modal */}
      {showCredentials && (
        <Modal title="بيانات دخول العميل" onClose={() => setShowCredentials(false)}>
          <div className="space-y-4">
            <div className="bg-green-600/10 border border-green-500/20 rounded-xl p-4">
              <p className="text-green-400 text-sm mb-3">احفظ هذه البيانات وأرسلها للعميل:</p>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div>
                    <span className="text-gray-400 text-xs block">رمز الدخول</span>
                    <span className="text-white font-mono font-bold text-lg">{credentials.access_code}</span>
                  </div>
                  <button onClick={() => copyToClipboard(credentials.access_code, 'code')} className="p-2 text-green-400 hover:bg-green-600/20 rounded-lg">
                    {copied === 'code' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <div>
                    <span className="text-gray-400 text-xs block">كلمة المرور</span>
                    <span className="text-white font-mono font-bold text-lg">{credentials.password}</span>
                  </div>
                  <button onClick={() => copyToClipboard(credentials.password, 'pass')} className="p-2 text-green-400 hover:bg-green-600/20 rounded-lg">
                    {copied === 'pass' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                const text = `بيانات الدخول:\nرمز الدخول: ${credentials.access_code}\nكلمة المرور: ${credentials.password}\n\nرابط الدخول: ${window.location.origin}/client-login`;
                copyToClipboard(text, 'all');
              }}
              className="w-full py-3 border border-green-500/30 text-green-400 hover:bg-green-600/10 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              {copied === 'all' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied === 'all' ? 'تم النسخ!' : 'نسخ جميع البيانات'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" dir="rtl">
      <div className="glass rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto bg-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

interface ClientFormData {
  name: string; email: string; phone: string; subscription_plan: string;
  subscription_price: number; subscription_status: string; profit_fees_percent: number;
  total_investment: number; total_profit: number; daily_profit: number; balance: number; notes: string;
}

function ClientFormFields({ form, setForm }: { form: ClientFormData; setForm: (f: ClientFormData) => void }) {
  const fields = [
    { key: 'name', label: 'الاسم', type: 'text', required: true },
    { key: 'email', label: 'البريد الإلكتروني', type: 'email' },
    { key: 'phone', label: 'رقم الهاتف', type: 'text' },
    { key: 'subscription_plan', label: 'الباقة', type: 'select', options: ['basic', 'silver', 'gold', 'platinum', 'السعودية', 'الإمارات', 'الكويت', 'قطر'] },
    { key: 'subscription_price', label: 'سعر الاشتراك ($)', type: 'number' },
    { key: 'subscription_status', label: 'حالة الاشتراك', type: 'select', options: ['active', 'inactive', 'expired'] },
    { key: 'profit_fees_percent', label: 'رسوم الأرباح (%)', type: 'number' },
    { key: 'total_investment', label: 'إجمالي الاستثمار ($)', type: 'number' },
    { key: 'total_profit', label: 'إجمالي الأرباح ($)', type: 'number' },
    { key: 'daily_profit', label: 'الربح اليومي ($)', type: 'number' },
    { key: 'balance', label: 'الرصيد ($)', type: 'number' },
    { key: 'notes', label: 'ملاحظات', type: 'text' },
  ];

  return (
    <div className="space-y-3">
      {fields.map(f => (
        <div key={f.key}>
          <label className="text-gray-400 text-sm mb-1 block">{f.label}</label>
          {f.type === 'select' ? (
            <select
              value={String((form as unknown as Record<string, string | number>)[f.key])}
              onChange={e => setForm({ ...form, [f.key]: e.target.value } as ClientFormData)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
            >
              {f.options?.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          ) : (
            <input
              type={f.type}
              required={f.required}
              value={String((form as unknown as Record<string, string | number>)[f.key])}
              onChange={e => setForm({ ...form, [f.key]: f.type === 'number' ? Number(e.target.value) : e.target.value } as ClientFormData)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-green-500"
            />
          )}
        </div>
      ))}
    </div>
  );
}
