<template>
  <div>
    <Header title="休假設定"/>
    <div class="flex flex-col">
      <div class="mx-5 my-2 p-4 rounded-2xl border-blue-500 border-2">
        <div class="flex justify-center bg-gray-200 bg-opacity-80 border shadow-sm p-1 mb-1">
          <p class="font-semibold text-lg">添加休假日</p>
        </div>
        <div class="flex items-center justify-center gap-6 pb-4 mt-2">
          <a-config-provider :locale="zhTW">
            <div class="flex flex-col items-center">
              <p class="mb-1 text-sm font-semibold">開始時間</p>
              <a-date-picker v-model:value="startOffDate" />
            </div>
            <div class="flex flex-col items-center">
              <p class="mb-1 text-sm font-semibold">結束時間</p>
              <a-date-picker v-model:value="endOffDate" />
            </div>
          </a-config-provider> 
        </div>
        <div class="flex justify-center">
          <button
            class="rounded-lg px-8 py-1 text-white text-sm bg-blue-500 hover:bg-blue-600"
            @click="PostData"
          >
            提交
          </button>
        </div>
      </div>

      <div class="flex flex-col pl-2 mb-20">
        <div class="flex justify-center items-center gap-2 mb-2 mx-6 bg-white border border-gray-500 rounded-md shadow-sm">
          <p class="text-gray-500">
            已设置的休假日期
          </p>
        </div>

        <div class="grid grid-cols-[40px_4fr_4fr_2fr_80px] bg-gray-100 font-bold py-2 text-center text-gray-700 text-sm border-b border-gray-300">
          <div>序號</div>
          <div>開始時間</div>
          <div>結束時間</div>
          <div>創建人</div>
          <div>操作</div>
        </div>
        <template v-if="offDays.length > 0">
          <div
            v-for="(item, index) in offDays"
            :key="index"
            class="grid grid-cols-[40px_4fr_4fr_2fr_80px] text-center py-2 border-b border-gray-300 items-center text-sm"
            >
            <div>{{ item.id }}</div>
            <div class="">{{ formatDate(item.startOffDays) }}</div>
            <div class="bg-gray-100">{{ formatDate(item.endOffDays) }}</div>
            <div>{{ item.create_by }}</div>
            <div>
              <button
              class="px-3 py-1 text-red-500 border font-medium border-red-500 hover:bg-red-500 hover:text-white rounded-sm"
              @click="deleteOffDay(item.id)"
              >
              刪除
            </button>
            </div>
          </div>
        </template>  
        <template v-else>
          <div class="text-center text-gray-400 py-10">
            <Icon name="ic:outline-event-busy" class="w-10 h-10 mx-auto mb-2" />
            <p class="text-sm">還沒有設置任何休假</p>
          </div>
        </template>

      </div>
    </div>
    <BottomNavigator/>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import zhTW from 'ant-design-vue/es/locale/zh_TW';
import 'dayjs/locale/zh-tw';
import type { offDays_dates } from '~~/server/models/offDays';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const startOffDate = ref<Dayjs>();
const endOffDate = ref<Dayjs>();
const User = 'admin';
const offDays = ref<any[]>([]);
const data = ref<offDays_dates[]>([]);
const fetchData = async () => {
    try {
      const result = await $fetch('/api/GETallOffdays');
      data.value = result.data as offDays_dates[];
      offDays.value = data.value.map(offDays => ({
        id:offDays.id,
        startOffDays: offDays.start_offDays,
        endOffDays: offDays.end_offDays,
        created_at: offDays.created_at,
        create_by: offDays.created_by
      }));
    } catch {
      alert('Fetch error');
    }
  };

onMounted(fetchData)

const deleteOffDay = async(id: number) => {
  console.log("DeleteId"+id);
  try {
    const response = await $fetch('/api/DeleteOffDays', {
      method: 'DELETE',
      body: {id},
    });
    if (response) {
        await fetchData(); // 重新獲取資料
      } else {
        alert("Post Failed: No valid response");
    }
  } catch {
    alert('Delete error');
  }
};

const PostData = async () =>{
    try{
        const form = {
           startOffDate: startOffDate.value ? dayjs(startOffDate.value).format('YYYY-MM-DD') : null,
           endOffDate: endOffDate.value ? dayjs(endOffDate.value).format('YYYY-MM-DD') : null,
           created_by: User,
        };
        const response = await $fetch('/api/CreateOffDays', {
            method: 'POST',
            body: form
          });
          if (response) {
              await fetchData(); // 重新獲取資料
            } else {
              alert("Post Failed: No valid response");
            }
          } catch (error) {
            console.error("PostData 失败:", error);
            alert("提交失敗");
          }
};

</script>
