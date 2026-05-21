<template>
  <div>
    <h2>Perfil</h2>
    <div v-if="authStore.user">
      <p>{{ authStore.user.nombre_de_usuario }}</p>
      <img v-if="authStore.user.foto" :src="authStore.user.foto" alt="Foto" width="100" />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore();
</script>