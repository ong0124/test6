<template>
  <div>
    <Header title="休假設定"/>
    <div class="flex flex-col">
      <div class="flex ">
        <p>添加休假日</p>
      </div>
      <div class="flex justify-evenly pb-4">
            <a-config-provider :locale="zhTW">
              <div class="flex flex-col">
                <p class="text-center">開始時間</p>
                <a-date-picker
                v-model:value="startOffDate" />
              </div>
              <div class="flex flex-col">
                <p class="text-center">結束時間</p>
                <a-date-picker
                v-model:value="endOffDate"/>
              </div>
            </a-config-provider>
            <button 
            class="rounded-lg p-1 px-2 self-center text-white bg-blue-400"
            @click="PostData">
            提交
            </button>
      </div>
      <div class="flex flex-col pl-2">
        <div >
          <p>
            已设置的休假日期
          </p>
          <div></div>
        </div>
    <div class="grid grid-cols-[40px_4fr_4fr_2fr_120px] bg-gray-100 font-bold py-2 text-center border-b border-gray-300">
      <div>序號</div>
      <div>開始時間</div>
      <div>結束時間</div>
      <div>創建人</div>
      <div></div>
    </div>

    <!-- 數據列 -->
    <div v-for="(item, index) in offDays" :key="index" class="grid grid-cols-[40px_4fr_4fr_1fr_120px] text-center py-2 border-b border-gray-300 items-center">
      <div>{{ item.id }}</div>
      <div>{{ formatDate(item.startOffDays) }}</div>
      <div>{{ formatDate(item.endOffDays) }}</div>
      <div>{{ item.create_by }}</div>
      <div>
        <button class="px-2 py-1 text-white bg-red-500 rounded" @click="deleteOffDay(item.id)">
          刪除
        </button>
      </div>
    </div>
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
