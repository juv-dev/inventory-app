<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  producto: Object,
  stock: Number,
  cantidad: {
    type: Number,
    default: 0
  },
  productosPorCategoria: Object,
  categoriaActiva: String
});

const emit = defineEmits(['updateCantidad']);

const cantidad = ref(props.cantidad);

watch(() => props.cantidad, (nuevo) => {
  // Solo actualiza si el valor externo cambia realmente
  if (nuevo !== cantidad.value) {
    cantidad.value = nuevo;
  }
});

const max = computed(() => props.stock);
const min = 0;

function incrementar() {
  if (cantidad.value < max.value) {
    cantidad.value++;
    emit('updateCantidad', cantidad.value);
  }
}
function decrementar() {
  if (cantidad.value > min) {
    cantidad.value--;
    emit('updateCantidad', cantidad.value);
  }
}
</script>
<template>
  <div class="flex items-center justify-center space-x-2 mb-2">
    <button @click="decrementar" :disabled="cantidad <= min"
      class="px-2 py-1 bg-gray-200 rounded text-lg font-bold hover:bg-gray-300 disabled:opacity-50">-</button>
    <input type="number" :value="cantidad" readonly
      class="w-16 text-center border rounded" />
    <button @click="incrementar" :disabled="cantidad >= max"
      class="px-2 py-1 bg-gray-200 rounded text-lg font-bold hover:bg-gray-300 disabled:opacity-50">+</button>
  </div>
  
</template>
