<template>
  <div class="flex items-center justify-center min-h-[70vh] bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 class="text-3xl font-extrabold mb-6 text-blue-700 text-center">Agregar Producto</h1>
      <form @submit.prevent="agregarProducto" class="space-y-5">
        <div>
          <label class="block mb-1 font-semibold text-gray-700">Código</label>
          <input v-model="codigo" required class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label class="block mb-1 font-semibold text-gray-700">Nombre</label>
          <input v-model="nombre" required class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
  
        <div>
          <label class="block mb-1 font-semibold text-gray-700">Categoría</label>
          <select v-model="categoria" required class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option disabled value="">Selecciona una categoría</option>
            <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div>
          <label class="block mb-1 font-semibold text-gray-700">Stock</label>
          <input v-model.number="stock" required type="number" min="0" class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label class="block mb-1 font-semibold text-gray-700">Precio</label>
          <input v-model.number="precio" required type="number" min="0" step="0.01" class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div>
          <label class="block mb-1 font-semibold text-gray-700">Imagen</label>
          <input type="file" accept="image/*" @change="onFileChange" class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
          <div v-if="imagenPreview" class="mt-2 flex justify-center">
            <img :src="imagenPreview" alt="Preview" class="h-24 rounded" />
          </div>
        </div>
        <div class="flex justify-between items-center">
          <button type="submit" class="px-6 py-2 bg-gradient-to-r from-green-500 to-green-700 text-white rounded shadow hover:scale-105 transition-transform font-semibold">
            {{ editIndex === null ? 'Guardar' : 'Actualizar' }}
          </button>
          <router-link to="/productos" class="px-6 py-2 bg-gray-200 rounded shadow hover:bg-gray-300 font-semibold">Volver</router-link>
        </div>
      </form>

      <!-- Lista de productos agregados -->
      <div v-if="productos.length" class="mt-8">
        <h2 class="text-xl font-bold mb-4 text-blue-700">Productos agregados</h2>
        <ul>
          <li v-for="(prod, idx) in productos" :key="prod.Codigo" class="flex items-center justify-between border-b py-2">
            <div>
              <span class="font-semibold">{{ prod.Nombre }}</span>
              <span class="text-xs text-gray-500 ml-2">[{{ prod.Categoria }}]</span>
              <span class="text-xs text-gray-500 ml-2">S/ {{ prod.Precio }}</span>
            </div>
            <div class="flex gap-2">
              <button @click="editarProducto(idx)" class="text-blue-600 hover:underline text-sm">Editar</button>
              <button @click="eliminarProducto(idx)" class="text-red-600 hover:underline text-sm">Eliminar</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';

const categorias = [
  'Comida', 'Tecnologia', 'Ropa', 'Decoraciones', 'Mascotas', 'Herramientas', 'Otros'
];

const codigo = ref('');
const nombre = ref('');
const unidad = ref('');
const categoria = ref('');
const stock = ref(0);
const precio = ref(0);
const imagen = ref('');
const imagenPreview = ref('');
const router = useRouter();
const productos = ref([]);
const editIndex = ref(null);

function cargarProductos() {
  let prods = localStorage.getItem('productos_local');
  productos.value = prods ? JSON.parse(prods) : [];
}
cargarProductos();

function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    imagen.value = event.target.result.split(',')[1];
    imagenPreview.value = event.target.result;
  };
  reader.readAsDataURL(file);
}

function limpiarFormulario() {
  codigo.value = '';
  nombre.value = '';
  unidad.value = '';
  categoria.value = '';
  stock.value = 0;
  precio.value = 0;
  imagen.value = '';
  imagenPreview.value = '';
  editIndex.value = null;
}

function agregarProducto() {
  const nuevo = {
    Codigo: codigo.value,
    Nombre: nombre.value,
    Unidad: unidad.value,
    Categoria: categoria.value,
    Stock: stock.value,
    Precio: precio.value,
    Foto: imagen.value
  };
  let prods = localStorage.getItem('productos_local');
  prods = prods ? JSON.parse(prods) : [];
  if (editIndex.value !== null) {
    prods[editIndex.value] = nuevo;
  } else {
    prods.unshift(nuevo);
  }
  localStorage.setItem('productos_local', JSON.stringify(prods));
  cargarProductos();
  limpiarFormulario();
}

function eliminarProducto(idx) {
  let prods = localStorage.getItem('productos_local');
  prods = prods ? JSON.parse(prods) : [];
  prods.splice(idx, 1);
  localStorage.setItem('productos_local', JSON.stringify(prods));
  cargarProductos();
}

function editarProducto(idx) {
  const prod = productos.value[idx];
  codigo.value = prod.Codigo;
  nombre.value = prod.Nombre;
  unidad.value = prod.Unidad;
  categoria.value = prod.Categoria;
  stock.value = prod.Stock;
  precio.value = prod.Precio;
  imagen.value = prod.Foto;
  imagenPreview.value = prod.Foto ? `data:image/jpeg;base64,${prod.Foto}` : '';
  editIndex.value = idx;
}
</script>
