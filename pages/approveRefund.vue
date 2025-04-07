<template>
  <div>
    <Header title="退款審核"/>
  </div>
    <div class="pl-2 pt-2">
        <p>待批准的退款</p>
    </div>
     <div class="mb-20">
      <div class="flex bg-amber-100 m-2  rounded-lg " v-for="(item, idx) in refunds" :key="idx">
        <div class="flex flex-col w-full pl-4 py-2 ">
          <div class="flex justify-between pt-2">
            <p class="rounded-full bg-blue-300 px-2 text-white text-center">
              {{ item.id }}
            </p>
            <template class="flex pr-4">
              <p>單號：</p>
              <p>{{ item.booking_id }}</p>
            </template>
          </div>
          <div class="flex flex-col mt-2">
            <template class="flex">
              <p>申請账号：</p>
              <p>{{ item.fullname }}</p>
            </template>
            <template class="flex justify-between">
              <template class="flex">
                <p>申请时间：</p>
                <p>{{ formatDate(item.created_at) }}</p>
              </template>  
              <template class="flex pr-4 text-red-500">
                <p class="pr-2">NT$</p>
                <p>{{ item.refund_amount }}</p>
              </template>
            </template>
            <template class="flex">
              <p>旅程：</p>
              <template class="flex w-2/3 justify-between ">
                <p>{{ item.departure_loc }}</p>
                <p>to</p>
                <p>{{ item.destination_loc }}</p>
              </template>
            </template>
            <template class="flex">
              <p>出車時間:</p>
              <p>{{ formatDate(item.shuttle_date) }}</p>
              <p>{{ item.shuttle_time }}</p>
            </template>

            <template class="flex justify-end mr-4">
              <button class="rounded-xl bg-green-400 px-4 ">同意</button>
            </template>
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


const refunds = ref<any[]>([]);
  const data = ref<RefundModel[]>([]);
  const fetchData = async () => {
      try {
        const result = await $fetch('/api/GetAllRefund');
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
        }));
      } catch {
        alert('Fetch error');
      }
    };

  onMounted(fetchData)

</script>