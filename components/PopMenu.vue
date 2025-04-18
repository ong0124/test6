<template>
  <div class="relative inline-block text-left" ref="menuRef">
    <div
      @click="isOpen = !isOpen"
      class="px-4 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 flex items-center gap-2 cursor-pointer"
    >
      <img :src="buttonIcon" alt="menu icon" class="w-5 h-5" v-if="buttonIcon" />
      {{ buttonText }}
      <Icon name="mdi:chevron-down" class="w-5 h-5" />
    </div>
    
    <div
      v-if="isOpen"
      :class="menuPosition"
      class="absolute mt-2 w-48 bg-white border rounded-sm shadow-lg"
    >
      <ul class="py-2 text-gray-700">
        <li v-for="(item, index) in items" :key="index">
          <a
            href="#"
            class="flex items-center px-4 py-2 hover:bg-gray-100 gap-2"
            @click.prevent="selectItem(item.action)"
          >
            <Icon :name="item.icon" class="w-5 h-5" v-if="item.icon" />
            {{ item.label }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  buttonText: {
    type: String,
    default: '選單'
  },
  buttonIcon: {
    type: String,
    default: '' // 可選的按鈕圖標
  },
  items: {
    type: Array,
    default: () => [
      { label: '打印', action: 'print', icon: 'mdi:printer' },
      { label: '刪除', action: 'delete', icon: 'mdi:delete' },
      { label: '添加', action: 'add', icon: 'mdi:plus' },
      { label: '按時間排序', action: 'timeAsc', icon: 'material-symbols-clock-arrow-up-outline' },
      { label: '按發車地點排序', action: 'locAsc', icon: 'material-symbols-car-gear-outline' }
    ]
  },
  position: {
    type: String,
    default: 'right-0'
  }
});

const emit = defineEmits(['itemSelected']);
const isOpen = ref(false);
const menuRef = ref(null);
const menuPosition = ref(`absolute ${props.position} mt-2`);

onClickOutside(menuRef, () => {
  isOpen.value = false;
});

const selectItem = (action) => {
  emit('itemSelected', action);
  isOpen.value = false;
};
</script>
