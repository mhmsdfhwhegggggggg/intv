import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('username');
    }
    return Promise.reject(error);
  }
);

// Admin Auth
export const adminLogin = (username: string, password: string) =>
  api.post('/api/admin/login', { username, password });

export const adminChangePassword = (old_password: string, new_password: string) =>
  api.post('/api/admin/change-password', { old_password, new_password });

// Client Auth
export const clientLogin = (access_code: string, password: string) =>
  api.post('/api/client/login', { access_code, password });

// Admin: Clients
export const getClients = () => api.get('/api/admin/clients');
export const getClient = (id: number) => api.get(`/api/admin/clients/${id}`);
export const createClient = (data: Record<string, unknown>) => api.post('/api/admin/clients', data);
export const updateClient = (id: number, data: Record<string, unknown>) => api.put(`/api/admin/clients/${id}`, data);
export const deleteClient = (id: number) => api.delete(`/api/admin/clients/${id}`);
export const resetClientPassword = (id: number) => api.post(`/api/admin/clients/${id}/reset-password`);

// Admin: Profits
export const getProfits = () => api.get('/api/admin/profits');
export const getClientProfits = (clientId: number) => api.get(`/api/admin/clients/${clientId}/profits`);
export const addProfit = (data: { client_id: number; amount: number; description: string }) =>
  api.post('/api/admin/profits', data);
export const deleteProfit = (id: number) => api.delete(`/api/admin/profits/${id}`);

// Admin: Messages
export const getMessages = () => api.get('/api/admin/messages');
export const markMessageRead = (id: number) => api.put(`/api/admin/messages/${id}/read`);
export const deleteMessage = (id: number) => api.delete(`/api/admin/messages/${id}`);

// Admin: Stats
export const getStats = () => api.get('/api/admin/stats');

// Admin: Subscriptions
export const getSubscriptions = () => api.get('/api/admin/subscriptions');
export const updateSubscriptionStatus = (id: number, status: string) => 
  api.put(`/api/admin/subscriptions/${id}`, { status });

// Admin: Settings
export const updateSetting = (key: string, value: string) => 
  api.put(`/api/admin/settings/${key}`, { value });

// Client Portal
export const getClientProfile = () => api.get('/api/client/profile');
export const getMyProfits = () => api.get('/api/client/profits');

// Public
export const submitContact = (data: { name: string; email: string; phone: string; message: string }) =>
  api.post('/api/contact', data);

export const submitRegistration = (data: { 
  name: string; 
  country: string; 
  phone: string; 
  account_wallet: string; 
  plan_name: string; 
  notes?: string; 
}) => api.post('/api/register', data);

export const getSetting = (key: string) => api.get(`/api/settings/${key}`);

export default api;
