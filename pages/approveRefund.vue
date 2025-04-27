<template>
  <div>
    <Header title="退款審核"/>
  </div>
  
  <div class="flex justify-center mt-2 space-x-1">
    <div 
    :class="[
    'flex items-center gap-2 px-4 py-1 border border-blue-300 rounded-md shadow-sm w-fit',
    currentFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-blue-600'
    ]"
    @click="filterData('all')">
      <Icon name="material-symbols:border-all-rounded" class="w-5 h-5 " />
      <p class="text-sm font-medium ">全部</p>
    </div>
    <div 
    :class="[
    'flex items-center gap-2 px-4 py-1 border border-blue-300 rounded-md shadow-sm w-fit',
    currentFilter === 'null' ? 'bg-blue-500 text-white' : 'bg-white text-blue-600'
    ]"
    @click="filterData('null')">
      <Icon name="mingcute:bill-fill" class="w-5 h-5 " />
      <p class="text-sm font-medium ">待批准的退款</p>
    </div>
    <div
    :class="[
    'flex items-center gap-2 px-4 py-1 border border-blue-300 rounded-md shadow-sm w-fit',
    currentFilter === 'approved' ? 'bg-blue-500 text-white' : 'bg-white text-blue-600'
    ]"
    @click="filterData('approved')">
      <Icon name="lets-icons:done-all-round" class="w-5 h-5 " />
      <p class="text-sm font-medium ">已通过</p>
    </div>
  </div>

  <div class="mb-20 bg-gray-50 pt-2 pb-2">
      <div
        class="bg-white border border-gray-400 mx-2 mb-4 rounded-lg shadow-sm"
        v-for="(item, idx) in refunds"
        :key="idx"
      >
        <!--上-->
        <div class="flex justify-between items-center px-3 py-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
          <div class="px-3 flex items-center justify-center bg-white text-gray-800 text-sm border border-gray-300">
            <p class="text-gray-500">訂單ID：</p>
            <p>{{ item.id }}</p>
          </div>

          <div class="flex items-center text-sm bg-gray-200 rounded-md px-2 py-1">
            <Icon name="material-symbols:order-approve" class="w-4 h-4 mr-1 text-blue-500" />
            <span class="mr-1">單號：</span>
            <span>{{ item.booking_id }}</span>
          </div>
        </div>

        <!--中 -->
        <div class="flex flex-col px-4 py-3 space-y-2 text-sm text-gray-800">
          <div class="flex">
            <span class="w-24 text-gray-400">申請账号：</span>
            <span>{{ item.fullname }}</span>
          </div>

          <div class="flex">
            <span class="w-24 text-gray-400">申请时间：</span>
            <span>{{ formatDate(item.created_at) }}</span>
          </div>
          
          <div class="flex">
            <span class="w-24 text-gray-400">旅程：</span>
            <span class="flex-1 flex justify-between">
              <span>{{ t(`${item.departure_loc}`) }}</span>
              <span>to</span>
              <span>{{ t(`${item.destination_loc}`) }}</span>
            </span>
          </div>

          <div class="flex">
            <span class="w-24 text-gray-400">出車時間：</span>
            <span>{{ formatDate(item.shuttle_date) }} {{ item.shuttle_time }}</span>
          </div>
        </div>

        <!--下-->
        <div class="flex items-center justify-between px-2 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <!--左-->
          <div class="flex items-center font-medium text-sm">
            <span class="text-xl text-red-500">*</span>
            <span class="ml-1 text-gray-500">退款金額：</span>
            <span class=" text-gray-500">NT$</span>
            <span class="ml-1 text-lg text-red-500">{{ item.refund_amount }}</span>
          </div>

          <!--右-->
          <div class="flex space-x-2">
            <button class="rounded border text-red-400 border-red-500 hover:bg-red-400 hover:text-white px-3 py-1 text-sm transition" 
            @click="handleReject(item.id)">
              拒絕退款
            </button>
            <button class="rounded bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm transition"
            @click="handleApprove(item.id)">
              同意退款
            </button>
          </div>
        </div>
      </div>
    </div>
  <div>
    <BottomNavigator/>
  </div>

</template>

<script setup lang="ts">
import type { RefundModel } from '~/server/models/refund';

const { t } = useI18n();

const refunds = ref<any[]>([]);
const data = ref<RefundModel[]>([]);

  const fetchData = async (filter: string) => {
      try {
        const result = await $fetch('/api/GetAllRefund', {
          params: { filter }
          }
        );
        data.value = result.data as RefundModel[];
        refunds.value = data.value.map(refunds => ({
          id: refunds.id,
          booking_id: refunds.booking_id,
          refund_amount: refunds.refund_amount,
          fullname: refunds.full_name,
          created_at:refunds.created_at,
          departure_loc: refunds.departure_loc,
          destination_loc: refunds.destination_loc,
          shuttle_date: refunds.shuttle_date,
          shuttle_time: refunds.shuttle_time,
          status: refunds.status
        }));
      } catch (err){
        alert('Fetch error');
      }
    };

  // filterData 函式用來處理過濾條件
  const currentFilter = ref('all');
    const filterData = (filter: string) => {
      currentFilter.value = filter;
      fetchData(filter); 
    };

    // 預設載入全部資料
    onMounted(() => {
      filterData('all');
    });

const handleApprove = async (id: number) => {
  try {
    const res= await $fetch('/api/ApproveRefund', {
      method: 'PUT',
      body: { id, status: 'approved' },
    });
    await fetchData(currentFilter.value);
    console.log(`退款 ${id} 同意，狀態碼：`, res);
  } catch (error) {
    console.error(`退款 ${id} 同意失敗：`, error);
  }
};

const handleReject = async (id: number) => {
  try {
    const res = await $fetch('/api/ApproveRefund', {
      method: 'PUT',
      body: { id, status: 'rejected' },
    });
    await fetchData(currentFilter.value);
    console.log(`退款 ${id} 拒絕，狀態碼：`, res);
  } catch (error) {
    console.error(`退款 ${id} 拒絕失敗：`, error);
  }
};
</script>