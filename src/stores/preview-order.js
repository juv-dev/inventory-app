import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePreviewOrderStore = defineStore('previewOrder', () => {
  const items = ref([]); // { producto, cantidad }

  function agregarPreviewOrder(producto, cantidad) {
    if (cantidad <= 0) return;
    const existente = items.value.find(i => i.producto.id === producto.id);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      items.value.push({ producto, cantidad });
    }
  }

  function limpiarPreviewOrder() {
    items.value = [];
  }

  const total = () => items.value.reduce((sum, i) => sum + i.cantidad * (i.producto.n_Precio ?? 0), 0);

  return { items, agregarPreviewOrder, limpiarPreviewOrder, total };
});