<script setup>
import { usePreviewOrderStore } from '../stores/preview-order';
const carrito = usePreviewOrderStore();
</script>
<template>
  <div>
    <h2>Carrito</h2>
    <div v-for="item in carrito.items" :key="item.producto.id">
      {{ item.producto.t_Nombre }} - {{ item.cantidad }} x S/ {{ item.producto.n_Precio?.toFixed(2) ?? '0.00' }}
    </div>
    <div>Total: S/ {{ carrito.total().toFixed(2) }}</div>
  </div>
</template>