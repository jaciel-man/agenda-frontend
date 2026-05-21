<template>
  <div>
    <h2>Nuevo contacto</h2>
    <form @submit.prevent="crear">
      <input v-model="form.nombre" placeholder="Nombre" required />
      <input v-model="form.apellido" placeholder="Apellido" />
      <input v-model="form.telefono" placeholder="Teléfono" required />
      <input v-model="form.email" placeholder="Email" />
      <input v-model="form.direccion" placeholder="Dirección" />
      <textarea v-model="form.notas" placeholder="Notas"></textarea>
      <input type="file" @change="onFileChange" accept="image/*" />
      <button type="submit">Guardar</button>
    </form>
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import axios from 'axios';
import { getApiUrl } from '../config/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = reactive({
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  direccion: '',
  notas: ''
});
const fotoFile = ref(null);
const msg = ref('');

const onFileChange = (e) => {
  fotoFile.value = e.target.files[0];
};

const crear = async () => {
  const data = new FormData();
  data.append('nombre', form.nombre);
  data.append('apellido', form.apellido);
  data.append('telefono', form.telefono);
  data.append('email', form.email);
  data.append('direccion', form.direccion);
  data.append('notas', form.notas);
  if (fotoFile.value) {
    data.append('foto', fotoFile.value);
  }

  try {
    const API_URL = await getApiUrl();
    const res = await axios.post(`${API_URL}/contactos/crear.php`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (res.data.success) {
      router.push('/agenda');
    } else {
      msg.value = res.data.message;
    }
  } catch (e) {
    msg.value = 'Error al crear contacto';
  }
};
</script>