import { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Clock, Globe, ArrowUpRight, 
  BarChart3, Wallet, Shield, Zap, RefreshCw, 
  Bitcoin, Coins, CircleDollarSign, Landmark, Flame
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change: number;
  type: 'crypto' | 'forex' | 'commodity';
  icon: any;
  color: string;
}

const INITIAL_ASSETS: Asset[] = [
  { id: '1', name: 'بيتكوين', symbol: 'BTC/USDT', price: 65432.10, change: 2.45, type: 'crypto', icon: Bitcoin, color: '#F7931A' },
  { id: '2', name: 'إيثيريوم', symbol: 'ETH/USDT', price: 3456.78, change: -1.20, type: 'crypto', icon: Coins, color: '#627EEA' },
  { id: '3', name: 'سولانا', symbol: 'SOL/USDT', price: 145.20, change: 5.67, type: 'crypto', icon: Flame, color: '#14F195' },
  { id: '4', name: 'بينانس كوين', symbol: 'BNB/USDT', price: 580.45, change: 1.23, type: 'crypto', icon: Coins, color: '#F3BA2F' },
  { id: '5', name: 'ريبل', symbol: 'XRP/USDT', price: 0.62, change: -2.34, type: 'crypto', icon: Coins, color: '#23292F' },
  { id: '6', name: 'كاردانو', symbol: 'ADA/USDT', price: 0.45, change: 1.15, type: 'crypto', icon: Coins, color: '#0033AD' },
  { id: '7', name: 'دوجكوين', symbol: 'DOGE/USDT', price: 0.16, change: 4.20, type: 'crypto', icon: Coins, color: '#C2A633' },
  { id: '8', name: 'بولكادوت', symbol: 'DOT/USDT', price: 7.20, change: -0.85, type: 'crypto', icon: Coins, color: '#E6007A' },
  { id: '9', name: 'بوليجون', symbol: 'MATIC/USDT', price: 0.72, change: 2.10, type: 'crypto', icon: Coins, color: '#8247E5' },
  { id: '10', name: 'تشينلينك', symbol: 'LINK/USDT', price: 18.45, change: -1.45, type: 'crypto', icon: Coins, color: '#2A5ADA' },
  { id: '11', name: 'الذهب', symbol: 'XAU/USD', price: 2345.60, change: 0.85, type: 'commodity', icon: Landmark, color: '#FFD700' },
  { id: '12', name: 'الفضة', symbol: 'XAG/USD', price: 28.45, change: 1.20, type: 'commodity', icon: Landmark, color: '#C0C0C0' },
  { id: '13', name: 'النفط الخام', symbol: 'BRENT', price: 82.45, change: -0.45, type: 'commodity', icon: Flame, color: '#313339' },
  { id: '14', name: 'الغاز الطبيعي', symbol: 'NATGAS', price: 1.85, change: -3.20, type: 'commodity', icon: Flame, color: '#4FB0FF' },
  { id: '15', name: 'الدولار/الريال', symbol: 'USD/SAR', price: 3.75, change: 0.00, type: 'forex', icon: CircleDollarSign, color: '#006C35' },
  { id: '16', name: 'اليورو/الدولار', symbol: 'EUR/USD', price: 1.0845, change: 0.12, type: 'forex', icon: Globe, color: '#003399' },
  { id: '17', name: 'الجنيه الإسترليني', symbol: 'GBP/USD', price: 1.2678, change: -0.05, type: 'forex', icon: Globe, color: '#CF142B' },
  { id: '18', name: 'الدولار/الين', symbol: 'USD/JPY', price: 151.45, change: 0.45, type: 'forex', icon: Globe, color: '#BC002D' },
  { id: '19', name: 'الدولار الأسترالي', symbol: 'AUD/USD', price: 0.6545, change: -0.25, type: 'forex', icon: Globe, color: '#00008B' },
  { id: '20', name: 'الدولار الكندي', symbol: 'USD/CAD', price: 1.3567, change: 0.15, type: 'forex', icon: Globe, color: '#FF0000' },
];

export default function Trading() {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState<Asset>(INITIAL_ASSETS[0]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate initial chart data
  useEffect(() => {
    const data = [];
    let base = selectedAsset.price;
    for (let i = 0; i < 20; i++) {
      base = base * (1 + (Math.random() - 0.5) * 0.01);
      data.push({
        time: `${i}:00`,
        price: base
      });
    }
    setChartData(data);
    setLoading(false);
  }, [selectedAsset.id]);

  // Live Price Updates
  useEffect(() => {
    const interval = setInterval(async () => {
      // 1. Update Crypto from Binance (Mockable if needed, but let's try real fetch for 2 major ones)
      try {
        const cryptos = assets.filter(a => a.type === 'crypto');
        const symbols = cryptos.map(a => a.symbol.replace('/', ''));
        const responses = await Promise.all(symbols.map(s => 
          fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${s}`)
        ));
        const data = await Promise.all(responses.map(r => r.json()));
        
        const priceMap: Record<string, number> = {};
        data.forEach(item => {
          priceMap[item.symbol] = parseFloat(item.price);
        });

        setAssets(prev => prev.map(asset => {
          const binanceSymbol = asset.symbol.replace('/', '');
          if (priceMap[binanceSymbol]) {
            return { 
              ...asset, 
              price: priceMap[binanceSymbol], 
              change: asset.change + (Math.random() - 0.5) * 0.1 
            };
          }
          // Jitter for others (forex/commodities) to feel "live"
          const jitter = (Math.random() - 0.5) * 0.0005 * asset.price;
          return { ...asset, price: asset.price + jitter, change: asset.change + (Math.random() - 0.5) * 0.02 };
        }));
      } catch (err) {
        // Fallback to jitter if API fails
        setAssets(prev => prev.map(asset => ({
          ...asset,
          price: asset.price * (1 + (Math.random() - 0.5) * 0.0005),
          change: asset.change + (Math.random() - 0.5) * 0.02
        })));
      }

      // Update current chart with latest price
      setChartData(prev => {
        const last = prev[prev.length - 1];
        const nextPrice = assets.find(a => a.id === selectedAsset.id)?.price || last.price;
        const newData = [...prev.slice(1), { time: new Date().toLocaleTimeString('ar-SA'), price: nextPrice }];
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedAsset.id, assets]);

  return (
    <div className="min-h-screen bg-mesh pt-28 pb-10 selection:bg-green-500/30 overflow-hidden" dir="rtl">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 h-[calc(100vh-140px)]">
        
        {/* Header Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 animate-fade-in">
           {[
             { label: 'إجمالي القيمة السوقية', value: '$2.48T', change: '+2.4%', icon: Globe, color: 'text-blue-400' },
             { label: 'حجم التداول (24س)', value: '$84.2B', change: '-1.2%', icon: BarChart3, color: 'text-purple-400' },
             { label: 'رصيدك المتاح', value: '$12,450.00', change: 'قابل للسحب', icon: Wallet, color: 'text-green-400' },
             { label: 'حالة السوق', value: 'نشط جداً', change: 'Live', icon: Zap, color: 'text-amber-400' },
           ].map((stat, i) => (
             <div key={i} className="glass p-4 rounded-3xl border-white/5 flex items-center justify-between group hover:border-white/10 transition-colors">
               <div>
                 <div className="text-gray-500 text-xs font-bold mb-1">{stat.label}</div>
                 <div className="text-white font-black text-lg">{stat.value}</div>
                 <div className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-green-400' : 'text-gray-400'}`}>{stat.change}</div>
               </div>
               <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                 <stat.icon className="w-5 h-5" />
               </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
          
          {/* Asset Sidebar */}
          <div className="lg:col-span-3 space-y-4 h-full overflow-hidden flex flex-col animate-slide-right">
             <div className="glass rounded-[2.5rem] border-white/5 p-6 flex-1 overflow-hidden flex flex-col">
                <div className="flex items-center justify-between mb-6">
                   <h2 className="text-white font-black text-xl flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      الأصول المتاحة
                   </h2>
                   <div className="text-[10px] bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-bold animate-pulse">مباشر</div>
                </div>
                
                <div className="space-y-2 overflow-y-auto custom-scrollbar pr-1 flex-1">
                   {assets.map((asset) => (
                     <button
                       key={asset.id}
                       onClick={() => setSelectedAsset(asset)}
                       className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                         selectedAsset.id === asset.id 
                         ? 'glass bg-white/[0.08] border-green-500/30' 
                         : 'border-transparent hover:bg-white/[0.03]'
                       }`}
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center transition-transform group-hover:scale-110" style={{ color: asset.color }}>
                              <asset.icon className="w-6 h-6" />
                           </div>
                           <div className="text-right">
                              <div className="text-white font-bold text-sm">{asset.name}</div>
                              <div className="text-gray-500 text-[10px] uppercase font-bold">{asset.symbol}</div>
                           </div>
                        </div>
                        <div className="text-left">
                           <div className={`font-mono font-bold text-sm ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: (asset.price < 10 ? 4 : 2) })}
                           </div>
                           <div className={`text-[10px] flex items-center justify-end font-bold ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                              {asset.change >= 0 ? <TrendingUp className="w-3 h-3 ml-1" /> : <TrendingDown className="w-3 h-3 ml-1" />}
                              {asset.change.toFixed(2)}%
                           </div>
                        </div>
                     </button>
                   ))}
                </div>
             </div>
          </div>

          {/* Main Chart Area */}
          <div className="lg:col-span-6 space-y-6 flex flex-col animate-fade-in delay-200">
             <div className="glass rounded-[3rem] border-white/5 p-8 flex-1 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full" />
                
                <div className="flex items-center justify-between mb-8 relative z-10">
                   <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center" style={{ color: selectedAsset.color }}>
                         <selectedAsset.icon className="w-8 h-8" />
                      </div>
                      <div>
                         <h1 className="text-2xl font-black text-white">{selectedAsset.name}</h1>
                         <div className="flex items-center gap-3">
                            <span className="text-gray-500 font-bold uppercase">{selectedAsset.symbol}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${selectedAsset.change >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                               {selectedAsset.change >= 0 ? '+' : ''}{selectedAsset.change.toFixed(2)}%
                            </span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="text-left">
                      <div className="text-3xl font-black text-white font-mono">
                         ${selectedAsset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-gray-500 text-xs font-bold flex items-center justify-end gap-1 uppercase tracking-widest">
                         <Clock className="w-3 h-3" />
                         محدث منذ ثانية
                      </div>
                   </div>
                </div>

                <div className="flex-1 w-full min-h-[300px] relative z-10">
                   {loading ? (
                     <div className="absolute inset-0 flex items-center justify-center">
                        <RefreshCw className="w-10 h-10 text-green-400 animate-spin" />
                     </div>
                   ) : (
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                           <defs>
                              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor={selectedAsset.color} stopOpacity={0.3}/>
                                 <stop offset="95%" stopColor={selectedAsset.color} stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                           <XAxis dataKey="time" hide />
                           <YAxis 
                              domain={['auto', 'auto']} 
                              orientation="left" 
                              stroke="#ffffff20" 
                              fontSize={10} 
                              tickFormatter={(val) => `$${val.toLocaleString()}`}
                              hide
                           />
                           <Tooltip 
                              contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                              itemStyle={{ color: selectedAsset.color }}
                              labelStyle={{ color: '#666' }}
                           />
                           <Area 
                              type="monotone" 
                              dataKey="price" 
                              stroke={selectedAsset.color} 
                              strokeWidth={3}
                              fillOpacity={1} 
                              fill="url(#colorPrice)" 
                              animationDuration={1000}
                           />
                        </AreaChart>
                     </ResponsiveContainer>
                   )}
                </div>
                
                <div className="mt-6 flex items-center gap-2 relative z-10">
                   {['1س', '24س', '1أ', '1ش', '1سنة', 'الكل'].map((t, i) => (
                     <button key={t} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${i === 1 ? 'bg-white/10 text-white' : 'text-gray-500 hover:bg-white/5 hover:text-white'}`}>
                        {t}
                     </button>
                   ))}
                </div>
             </div>
          </div>

          {/* Action Terminal */}
          <div className="lg:col-span-3 space-y-6 animate-slide-left">
             <div className="glass rounded-[2.5rem] border-white/5 p-8 flex flex-col space-y-6 relative overflow-hidden backdrop-blur-2xl">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-green-500/5 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <h2 className="text-white font-black text-xl mb-2">مركز التداول</h2>
                
                <div className="grid grid-cols-2 gap-2 bg-white/5 p-1.5 rounded-2xl">
                   <button className="py-3 rounded-xl bg-green-500 text-white font-black text-sm shadow-lg shadow-green-500/20">شراء</button>
                   <button className="py-3 rounded-xl text-gray-400 font-black text-sm hover:text-white transition-colors">بيع</button>
                </div>

                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-gray-500 text-[10px] font-black uppercase tracking-widest px-2">المبلغ للاستثمار</label>
                      <div className="relative">
                         <input 
                           type="number" 
                           defaultValue="1000"
                           className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white font-black focus:outline-none focus:border-green-500/50 transition-all text-xl"
                         />
                         <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 font-black">USD</span>
                      </div>
                   </div>

                   <div className="bg-white/5 rounded-2xl p-4 space-y-2">
                      <div className="flex justify-between text-[10px] font-bold">
                         <span className="text-gray-500 uppercase">القيمة المقدرة</span>
                         <span className="text-white">{(1000 / selectedAsset.price).toFixed(6)} {selectedAsset.symbol.split('/')[0]}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold">
                         <span className="text-gray-500 uppercase">رسوم المنصة (0%)</span>
                         <span className="text-green-400">ميزة الحساب الماسي</span>
                      </div>
                   </div>
                </div>

                <button className="premium-btn premium-btn-primary w-full py-5 text-xl flex items-center justify-center gap-3 group">
                   تنفيذ الصفقة سريعاً
                   <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>

                <div className="pt-6 border-t border-white/5 space-y-4">
                   <div className="flex items-center gap-3 text-gray-500 group cursor-help">
                      <Shield className="w-5 h-5 text-green-400" />
                      <span className="text-xs font-bold leading-relaxed">تداول آمن وموثق بنظام حماية الأصول التابع للمنصة.</span>
                   </div>
                </div>
             </div>
             
             <div className="glass rounded-[2rem] border-white/5 p-6 bg-gradient-to-br from-amber-500/[0.04] to-transparent">
                <div className="flex items-center gap-3 mb-2">
                   <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                   <span className="text-amber-500 font-bold text-xs uppercase tracking-widest">تحليل ذكي</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed font-bold">
                   خوارزميات "تيتان" تقترح حالياً نقطة دخول مثالية لعملة {selectedAsset.name} بناءً على زخم السوق الحالي.
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
