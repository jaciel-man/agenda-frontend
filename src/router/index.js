import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

// Importación lazy de las vistas
const Home = () => import('../views/Home.vue');
const Login = () => import('../views/Login.vue');
const Registro = () => import('../views/Registro.vue');
const Agenda = () => import('../views/Agenda.vue');
const CrearContacto = () => import('../views/CrearContacto.vue');
const EditarContacto = () => import('../views/EditarContacto.vue');
const Perfil = () => import('../views/Perfil.vue');

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/registro', component: Registro },
  { path: '/agenda', component: Agenda, meta: { requiresAuth: true } },
  { path: '/agenda/crear', component: CrearContacto, meta: { requiresAuth: true } },
  { path: '/agenda/:id', component: EditarContacto, meta: { requiresAuth: true } },
  { path: '/perfil', component: Perfil, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHashHistory(),   // Necesario para GitHub Pages
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;