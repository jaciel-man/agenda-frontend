<template>
  <div>
    <h2>Mis contactos</h2>
    <router-link to="/agenda/crear">Nuevo contacto</router-link>
    <ul>
      <li v-for="c in contactos" :key="c.id">
        <router-link :to="`/agenda/${c.id}`">
          {{ c.nombre }} {{ c.apellido }} - {{ c.telefono }}
        </router-link>
        <img v-if="c.foto" :src="c.foto" alt="Foto" width="50" />
      </li>
    </ul>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getApiUrl } from '../config/api';

const contactos = ref([]);
const error = ref('');

onMounted(async () => {
  try {
    const API_URL = await getApiUrl();
    const res = await axios.get(`${API_URL}/contactos/index.php`);
    if (res.data.success) {
      contactos.value = res.data.contactos;
    } else {
      error.value = res.data.message;
    }
  } catch (e) {
    error.value = 'Error al cargar contactos';
  }
});
</script>