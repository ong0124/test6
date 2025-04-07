<template>
  <header class="py-6 border-b bg-orange-400 flex items-center justify-center relative">
    <button 
      v-if="showBack" 
      @click="router.back()" 
      class="absolute left-4 text-white hover:text-gray-200"
    >
      <Icon name="mdi:arrow-left" class="w-6 h-6" />
    </button>

    <h1 class="text-2xl font-bold text-white">
      {{ title }}
    </h1>
  </header>
</template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'

  const router = useRouter()
  defineProps({
    title: {
      type: String,
      default: '金門通管理', 
    },
    showBack: {
    type: Boolean,
    default: false,
  }
  });
  </script>
  