import { defineStore } from 'pinia';
import axios from 'axios';
import { getApiUrl } from '../config/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      const API_URL = await getApiUrl();
      const res = await axios.post(`${API_URL}/auth/login.php`, credentials);
      if (res.data.success) {
        this.token = res.data.token;
        this.user = res.data.usuario;
        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
      }
      return res.data;
    },
    async register(data) {
  const API_URL = await getApiUrl();
  const res = await axios.post(`${API_URL}/auth/registrar.php`, data);
  if (res.data.success && res.data.token) {
    // Auto-login: guardamos el token y usuario que nos devuelve el backend
    this.token = res.data.token;
    this.user = res.data.usuario;
    localStorage.setItem('token', this.token);
    localStorage.setItem('user', JSON.stringify(this.user));
  }
  return res.data;
}
,
    async logout() {
      const API_URL = await getApiUrl();
      try {
        await axios.post(`${API_URL}/auth/logout.php`, {}, {
          headers: { Authorization: `Bearer ${this.token}` }
        });
      } catch (e) {}
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    async fetchProfile() {
      const API_URL = await getApiUrl();
      const res = await axios.get(`${API_URL}/auth/perfil.php`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      if (res.data.success) {
        this.user = res.data.usuario;
        localStorage.setItem('user', JSON.stringify(this.user));
      }
      return res.data;
    }
  }
});