<script setup>
import { reactive } from 'vue';

import { usePreviewOrderStore } from '../../stores/preview-order';
import { useRouter } from 'vue-router';
import StockControl from './StockControl.vue';
const carritoStore = usePreviewOrderStore();
const router = useRouter();

const props = defineProps({
    stockMap: {
        type: Object,
        required: true
    },
    categorias: {
        type: Array,
        required: true
    },
    categoriaActiva: {
        type: String,
        required: true
    },
    incrementStock: {
        type: Function,
        required: true
    },
    decrementStock: {
        type: Function,
        required: true
    },
    productosPorCategoria: {
        type: Object,
        required: true
    },
});

const cantidades = reactive({}); // { [id]: cantidad }

function actualizarCantidad(id, cantidad) {
  cantidades[id] = cantidad;
}

function addPreviewORder(producto) {
  const cantidad = cantidades[producto.id] ?? 0;
  carritoStore.agregarPreviewOrder(producto, cantidad);
  router.push('/preview-order');
}
</script>
<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div class="relative max-w-xs border border-solid border-gray-200 rounded-2xl transition-all duration-500"
            v-for="producto in props.productosPorCategoria[props.categoriaActiva]">
            <div class="block overflow-hidden" v-if="producto.t_Foto">
                <img :src="`data:image/jpeg;base64,${producto.t_Foto}`" alt="Card image" class="p-[1rem]" />
            </div>
            <div class="p-4">
                <h4 class="text-[20px] font-semibold text-gray-900 mb-2 capitalize transition-all duration-500 ">
                    {{ producto.t_Nombre }}</h4>
                <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-5 mb-[2px]"> S/
                    {{ producto.n_Precio?.toFixed(2) ?? '0.00' }}</p>
                
                <p class="text-sm font-normal text-gray-500 transition-all duration-500 leading-5 mb-5"> Cantidad en stock:
                    {{parseInt(producto.n_Cantidad)}}</p>    
                <StockControl
                  :producto="producto"
                  :stock="parseInt(producto.n_Cantidad)"
                  :cantidad="cantidades[producto.id] ?? 0"
                  @updateCantidad="actualizarCantidad(producto.id, $event)"
                />

            </div>
            <div class="p-4">
                <button @click="addPreviewORder(producto)"
                    class="py-2.5 px-6 text-sm rounded-lg border border-solid border-gray-200 text-gray-600 cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gray-900 hover:text-white">
                    Agregar al carrito
                </button>
            </div>

        </div>
    </div>
</template>