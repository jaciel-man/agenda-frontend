<template>
  <div>
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Usuario" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">🔐 Entrar</button>
    </form>
    <p v-if="error" style="color:red">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const username = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  try {
    const res = await authStore.login({
      nombre_de_usuario: username.value,
      password: password.value
    });
    if (res.success) {
      router.push('/agenda');
    } else {
      error.value = res.message || 'Error al iniciar sesión';
    }
  } catch (e) {
    error.value = 'Error de conexión';
  }
};
</script>