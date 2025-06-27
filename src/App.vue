<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isAuth = ref(localStorage.getItem('auth') === 'true');

function logout() {
  localStorage.removeItem('auth');
  isAuth.value = false;
  router.push('/login');
}

watchEffect(() => {
  isAuth.value = localStorage.getItem('auth') === 'true';
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <header class="bg-white shadow p-4 flex items-center justify-between">
      <div class="font-bold text-xl text-blue-700">Inventario App</div>
      <nav class="space-x-4">
        <!-- <router-link to="/productos" class="text-gray-700 hover:text-blue-600 font-medium">Home</router-link>
        <router-link to="/productos/crud" class="text-gray-700 hover:text-blue-600 font-medium">CRUD</router-link>
        <button v-if="isAuth" @click="logout" class="text-red-600 hover:underline">Salir</button> -->
      </nav>
    </header>
    <main class="flex-1">
      <router-view />
    </main>
    <footer class="bg-white text-center p-2 text-xs text-gray-400 border-t">Hecho con ♥ por Cascade</footer>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
