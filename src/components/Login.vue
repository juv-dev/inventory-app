<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-sm">
      <h2 class="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block mb-1 font-semibold">Usuario</label>
          <input v-model="usuario" required class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label class="block mb-1 font-semibold">Contraseña</label>
          <input v-model="contrasena" type="password" required class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">Entrar</button>
        <p v-if="error" class="text-red-500 text-center mt-2">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const usuario = ref('');
const contrasena = ref('');
const error = ref('');
const router = useRouter();

function login() {
  if (usuario.value === 'admin' && contrasena.value === 'admin') {
    localStorage.setItem('auth', 'true');
    router.replace('/productos/crud');
  } else {
    error.value = 'Credenciales incorrectas';
  }
}
</script>
