<script setup>
const props = defineProps({
  categorias: {
    type: Array,
    required: true
  },
  categoriaActiva: {
    type: String,
    required: true
  }
})
</script>
<template>
    <div class="tabs">
        <div class="flex">
            <ul class="flex border-b border-gray-200 space-x-3 transition-all duration-300 -mb-px">
                <li v-for="cat in categorias" :key="cat" @click="$emit('update:categoriaActiva', cat)">
                    <a
                      href="javascript:void(0)"
                      :class="[
                        'inline-block py-4 px-6 font-medium border-b-2 whitespace-nowrap transition-all',
                        categoriaActiva === cat
                          ? 'tab-active text-indigo-600 border-b-indigo-600'
                          : 'text-gray-500 hover:text-gray-800 border-transparent'
                      ]"
                      role="tab"
                    >
                      {{ cat }}
                    </a>
                </li>
            </ul>
        </div> 
 
    </div>
  </template>