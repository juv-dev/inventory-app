<template>
    <div class="max-w-4xl mx-auto p-6 mt-8">
        <div class="flex items-center justify-between mb-4">
            <h1 class="text-3xl font-extrabold text-blue-700">Listado de Productos</h1>
        </div>

        <!-- Filtros de categorías -->
        <div class="flex flex-wrap gap-2 mb-6 justify-center">
            <Filters
                :categorias="categorias"
                :categoriaActiva="categoriaActiva"
                @update:categoriaActiva="categoriaActiva = $event"
            />
        </div>
        <!-- Loader si no hay data -->
        <div v-if="cargando" class="text-center text-blue-600 my-8">
            Cargando productos...
        </div>
        <div v-else>
            <div v-if="productosPorCategoria[categoriaActiva]">
              
                <List 
                :stockMap="stockMap" 
                :categorias="categorias"
                :categoriaActiva="categoriaActiva"
                :incrementStock="incrementStock"
                :decrementStock="decrementStock"
                :productosPorCategoria="productosPorCategoria"
                />

               
            </div>
                <div v-else class="text-gray-500 text-center my-6">No hay productos para esta categoría.</div>
            </div>
        </div>
</template>

<script setup>
import { ref, onMounted, reactive, watch, computed } from 'vue';
import { useProductosStore } from '../stores/productos';
import List from './products/list.vue';
import Filters from './products/filters.vue';

const productosStore = useProductosStore();
const productosPorCategoria = computed(() => productosStore.productosPorCategoria);

const cargando = ref(true);

// Categorías y filtro activo
const categorias = computed(() => Object.keys(productosPorCategoria.value || {}));
const categoriaActiva = ref('');
const stockMap = reactive({});

// Cargar productos al montar
onMounted(async () => {
    cargando.value = true;
    await productosStore.cargarProductos();
    cargando.value = false;
});

watch(productosPorCategoria, (agrupados) => {
    cargando.value = Object.keys(agrupados).length === 0;
    // Si la categoría activa no existe o está vacía, selecciona la primera con productos
    if (!categoriaActiva.value || !agrupados[categoriaActiva.value] || !agrupados[categoriaActiva.value].length) {
        const catConProductos = Object.keys(agrupados).find(cat => agrupados[cat] && agrupados[cat].length);
        categoriaActiva.value = catConProductos || '';
    }
}, { immediate: true });

// Inicializar stockMap cada vez que se cargan productos
watch(
    () => productosStore.productos,
    (productos) => {
        productos.forEach(producto => {
            if (!(producto.iD_Producto in stockMap)) {
                stockMap[producto.iD_Producto] = producto.n_Stock_Minima ?? 0;
            }
        });
    },
    { immediate: true }
);



function incrementStock(producto) {
    const max = producto.n_Stock_Maximo ?? 999999;
    if (stockMap[producto.iD_Producto] < max) {
        stockMap[producto.iD_Producto] = Number(stockMap[producto.iD_Producto]) + 1;
    }
}

function decrementStock(producto) {
    const min = producto.n_Stock_Minima ?? 0;
    if (stockMap[producto.iD_Producto] > min) {
        stockMap[producto.iD_Producto] = Number(stockMap[producto.iD_Producto]) - 1;
    }
}
</script>