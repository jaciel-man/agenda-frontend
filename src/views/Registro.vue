<template>
  <div>
    <h2>Registro</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="username" placeholder="Usuario" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Registrarse</button>
    </form>
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const msg = ref('');

const handleRegister = async () => {
  try {
    const res = await authStore.register({
      nombre_de_usuario: username.value,
      password: password.value
    });
    msg.value = res.data.message;
  } catch (e) {
    msg.value = 'Error de conexión';
  }
};
</script>