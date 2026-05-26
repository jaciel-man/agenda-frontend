<template>
  <div>
    <h2>Registro</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="username" placeholder="Usuario *" required />
      <input v-model="password" type="password" placeholder="Contraseña *" required />
      <input v-model="email" type="email" placeholder="Correo electrónico" />
      <input v-model="telefono" type="tel" placeholder="Teléfono" />
      <input v-model="edad" type="number" placeholder="Edad" />
      <button type="submit">Registrarse</button>
    </form>
    <p v-if="msg" :style="{ color: msg.includes('éxito') ? 'green' : 'red' }">{{ msg }}</p>
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
const email = ref('');
const telefono = ref('');
const edad = ref('');
const msg = ref('');

const handleRegister = async () => {
  try {
    const data = {
      nombre_de_usuario: username.value,
      password: password.value,
      email: email.value || null,
      telefono: telefono.value || null,
      edad: edad.value || null
    };
    const res = await authStore.register(data);
    if (res.success) {
      msg.value = res.message || 'Registrado correctamente';
      // Redirigir a la agenda automáticamente
      router.push('/agenda');
    } else {
      msg.value = res.message || 'Error al registrarse';
    }
  } catch (e) {
    msg.value = 'Error de conexión';
  }
};
</script>