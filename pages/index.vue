<template>
  <div>
    <Header />
  </div>
  <div>
    <div class="flex justify-evenly items-center">
        <div class="flex items-center border-2 border-blue-500 rounded-md w-2/3 my-2 ml-4">
              <Icon name="material-symbols-search-rounded" class="h-5 w-5 text-gray-500 mx-2 " /></input>
              <input
              v-model="searchQuery"
              type="text"
              class=" py-1 w-full rounded-md focus:ring-0 focus:border-transparent border-none outline-none"
              placeholder="搜索訂單"
              >
        </div>
          <PopMenu @itemSelected="handleItemSelected" class="z-20"/>
    </div>
    <div class="flex flex-col ml-2 mb-16 ">
            <!-- 滾動容器 -->
            <div ref="scrollContainer" class="overflow-x-auto w-full pb-4">
              <table class="table-fixed min-w-full border-collapse border mr-12">
                <thead>
                  <tr class="bg-gray-100 ">
                    <th class="border p-2 text-xs md:text-sm sticky left-0 bg-indigo-50">訂單ID</th>
                    <th v-for="(header, index) in tableHeaders.slice(1)" :key="index" class="border p-2 text-xs md:text-sm bg-indigo-50">
                      {{ header }}
                    </th>
                    <th v-if="showDeleteColumn" class="border p-2 text-xs md:text-sm bg-indigo-50">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody >
                  <tr v-for="(order, index) in paginatedOrders" :key="index" class="border-b text-center">
                    <td class="border p-2 text-xs md:text-md sticky left-0 bg-gray-50 z-10">{{ order.id }}</td>
                    <td class="border p-2 text-xs md:text-sm">{{ order.contact }}</td>
                    <td class="border p-2 text-xs md:text-sm">{{ order.phone }}</td>
                    <td class="border p-2 text-xs md:text-sm">{{ t(`${order.departure_loc}`) }}</td>
                    <td class="border p-2 text-xs md:text-sm">{{ t(`${order.destination_loc}`) }}</td>
                    <td class="border p-2 text-xs md:text-sm">{{ formatDate(order.shuttle_date) }}</td>
                    <td class="border p-2 text-xs md:text-sm">{{ order.shuttle_time }}</td>
                    <td class="border p-2 text-xs md:text-sm">
                      <span :class="statusClass(order.status)">{{ order.status }}</span>
                    </td>
                    <td class="border p-2 text-xs md:text-sm">{{ order.adult_num }}</td>
                    <td class="border p-2 text-xs md:text-sm">{{ order.child_num }}</td>
                    <td class="border p-2 text-xs md:text-sm">{{ order.totalTickets }}</td>
                    <td class="border p-2 text-xs md:text-sm">{{ order.totalprice }}</td>
                    <th v-if="showDeleteColumn">
                      <button 
                        v-if="showDeleteColumn"
                        class=" text-red-500 px-4 py-1 rounded"
                        @click="DeleteOrder(order.id)"
                      >
                        <Icon name="mdi:delete" class="text-red-500 w-5 h-5"/>
                      </button>
                    </th>
                    
                  </tr>
                </tbody>
              </table>   
            </div>
      </div>
    <BottomNavigator/>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import type { BookingModel } from '~~/server/models/booking';
  import { useRouter } from 'vue-router';

  const { t } = useI18n();
  const searchQuery = ref('');
  const router = useRouter();

const generatePDF = async () => {
const { jsPDF } = await import('jspdf');
const autoTable = (await import('jspdf-autotable')).default;

const doc = new jsPDF();

// 正确的字体路径（必须放 public/fonts/）
const fontUrl = "/fonts/SourceHanSans-Normal.ttf"; 
const fontResponse = await fetch(fontUrl);
const fontData = await fontResponse.arrayBuffer(); 
const fontBase64 = btoa(
  new Uint8Array(fontData).reduce((data, byte) => data + String.fromCharCode(byte), '')
);

// 加载字体到 jsPDF
doc.addFileToVFS("SourceHanSans-Normal.ttf", fontBase64);
doc.addFont("SourceHanSans-Normal.ttf", "SourceHanSans-Normal", "normal");
doc.setFont("SourceHanSans-Normal");

// 标题
doc.text("訂單詳情", 14, 10);

// 表格数据
const headers = [tableHeaders];
const data = paginatedOrders.value.map(order => [
order.id,
order.contact,
order.phone,
t(`${order.departure_loc}`),  // 這裡要翻譯
t(`${order.destination_loc}`), // 這裡要翻譯
formatDate(order.shuttle_date),
order.shuttle_time,
order.status,
order.adult_num,
order.child_num,
order.totalTickets,
order.totalprice
]);

autoTable(doc, {
  head: headers,
  body: data,
  startY: 20, // 表格起始位置
  styles: { fontSize: 10, font: "SourceHanSans-Normal" }, // 使用指定字体
  headStyles: { font: "SourceHanSans-Normal", fontStyle: "normal", fillColor: [22, 160, 133] },
  alternateRowStyles: { fillColor: [240, 240, 240] },
});

// 保存 PDF
doc.save("訂單詳情.pdf");
};

//table
const filteredOrders = computed(() => {
  const keyword = searchQuery.value.toLowerCase()
  return orders.value.filter(order =>
    Object.values(order).some(value =>
      String(value).toLowerCase().includes(keyword)
    )
  );
});

const tableHeaders = [
    '訂單 ID','聯絡人', '電話號碼', '上車地點', '下車地點','日期',  
    '時間', '狀態','成人票(人)','兒童票(人)', '全票數', '總價格',
  ];
  const currentPage = ref(1); // 當前頁數
  const itemsPerPage = 10; // 每頁顯示 5 筆數據出生日期
  
  // 計算當前頁面的數據
  const paginatedOrders = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredOrders.value.slice(start, start + itemsPerPage);
  });
  
  // 設置狀態顏色
  const statusClass = (status: string) => ({
    'text-green-600 font-bold': status === '已完成',
    'text-red-600 font-bold': status === '未出行',
    'text-yellow-600 font-bold': status === '处理中'
  });
  
const orders = ref<any[]>([]);
const data = ref<BookingModel[]>([]);
const fetchData = async () => {
    try {
      const result = await $fetch('/api/GETallOrders');
      data.value = result.data as BookingModel[];
      orders.value = data.value.map(booking => ({
        id: booking.id,
        departure_loc: booking.departure_loc,
        destination_loc: booking.destination_loc,
        shuttle_date: booking.shuttle_date,
        shuttle_time: booking.shuttle_time,
        status: booking.status,
        adult_num: booking.adult_num,
        child_num: booking.child_num,
        totalTickets:booking.total_tickets,
        totalprice: booking.totalprice,
        contact: booking.contact_name,
        phone: booking.contact_phone
      }));
    } catch {
      alert('Fetch error');
    }
  };

onMounted(fetchData)

const scrollContainer = ref<HTMLElement | null>(null)

const showDeleteColumn = ref(false);
const handleItemSelected = (action: string) => {
if (action === 'print') {
  generatePDF();
} else if (action === 'delete') {
  showDeleteColumn.value = true;
  if (scrollContainer.value) {
      scrollContainer.value.scrollTo({
        left: scrollContainer.value.scrollWidth,
        behavior: 'smooth'
      });
    }
} else if (action === 'add') {
  router.push('/addOrders'); 
}
};

const DeleteOrder = async (id: number) => {
  console.log("ID"+ id);
  try {
    const response = await $fetch('/api/DeleteBookingById', {
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

</script>  