<template>
  <div>
    <Header title="查看用戶"/>
  </div>
    <div class="flex justify-evenly items-center">
            <div class="flex items-center border rounded-md w-2/3 my-2 ml-4">
                <Icon name="material-symbols-search-rounded" class="h-5 w-5 text-gray-500 mx-2" /></input>
                <input
                type="text"
                class=" py-1 w-full rounded-md focus:ring-0 focus:border-transparent border-none outline-none"
                placeholder="搜索訂單"
                >
            </div>
            <PopMenu 
            :items="menuItems"
            @itemSelected="handleItemSelected"
            class="z-20"/>
    </div>

    <div class="flex flex-col">
    <div class="grid grid-cols-[80px_4fr_4fr_4fr_40px] bg-gray-100 font-bold py-2 text-center border-b border-gray-300">
      <div>用戶編號</div>
      <div>LINE名字</div>
      <div>加入時間</div>
      <div>生日</div>
    </div>

    <!-- 數據列 -->
    <div v-for="(item, index) in Users" :key="index" class="grid grid-cols-[80px_4fr_4fr_4fr_40px] text-center py-2 border-b border-gray-300 items-center">
      <div>{{ item.id }}</div>
      <div>{{ item.full_name }}</div>
      <div>{{ formatDate(item.created_at) }}</div>
      <div>{{ formatDate(item.birthday) }}</div>
      <div v-if="showDeleteColumn"
        class=" text-red-500 px-4 py-1 rounded ml-2"
      >
        <Icon name="mdi:delete" class="text-red-500"/>
      </div>
    </div>
    </div>
    <UserPopup ref="popupRef" v-model="showPopup" :isEdit="isEdit" @submit="handleSubmit" />
    <div>
        <BottomNavigator/>
    </div>
</template>

<script setup lang="ts">
import type { Users } from '~~/server/models/users';


const Users = ref<any[]>([]);
const data = ref<Users[]>([]);
const fetchData = async () => {
    try {
      const result = await $fetch('/api/GetUser');
      data.value = result.data as Users[];
      Users.value = data.value.map(Users => ({
        id:Users.id,
        full_name: Users.full_name,
        birthday: Users.birthday,
        created_at: Users.created_at
      }));
    } catch {
      alert('Fetch error');
    }
  };

onMounted(fetchData)


import { ref } from 'vue';
import type { UserPopup } from '#components';

const menuItems = ref([
  { label: '修改', action: 'edit', icon: 'material-symbols-edit-outline' },
  { label: '刪除', action: 'delete', icon: 'mdi:delete' },
  { label: '添加', action: 'add', icon: 'mdi:plus' }
]);

const showDeleteColumn = ref(false);
const showPopup = ref(false);
const isEdit = ref(false)

const handleItemSelected = (action: string) => {
if (action === 'edit') {
  isEdit.value = true;
  showPopup.value =true;
} else if (action === 'delete') {
  showDeleteColumn.value = true;
} else if (action === 'add') {
  isEdit.value = false;
  showPopup.value =true;  
}
};

const handleSubmit = (data: any) => {
  console.log('提交的資料:', data)
}
</script>