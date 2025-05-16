<template>
  <div>
    <Header />
  </div>
  <div>
    <div class="flex justify-evenly items-center">
        <div class="flex items-center border-2 border-blue-500 rounded-md w-2/3 mt-2 ml-4">
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

    <div class="flex my-2 ml-8 items-center">
      <p>        
        乘车日期：
      </p>
        <a-config-provider :locale="zhTW">
          <a-date-picker v-model:value="DateSelected" 
          :inputReadOnly="true"
          class="w-1/2" />
        </a-config-provider>
    </div>
    <div class="flex flex-col ml-2 mb-16 ">
            <!-- 滾動容器 -->
            <div ref="scrollContainer" class="overflow-x-auto pb-4">
              <table class="table-fixed min-w-full mr-12">
                <thead>
                  <tr class="bg-gray-100 ">
                    <th class="p-4 text-sm md:text-lg sticky left-0 bg-indigo-200 whitespace-nowrap">訂單ID</th>
                    <th v-for="(header, index) in tableHeaders.slice(1)" :key="index" class="p-4 text-sm md:text-sm bg-indigo-100 whitespace-nowrap"
                     @click="headerClickSort(header)">
                        <span class="inline-flex items-center gap-1">
                          {{ header }}
                          <Icon
                            v-if="header === '時間'"
                            :name="sortBy === 'shuttle_time' ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                            :class="[
                              'w-5 h-5 transition-colors duration-200',
                              sortBy === 'shuttle_time' ? 'text-gray-600' : 'text-amber-500'
                            ]"
                          />

                          <Icon
                            v-if="header === '上車地點'"
                            :name="sortBy === 'departure_loc' ? 'mdi:arrow-up' : 'mdi:arrow-down'"
                            :class="[
                              'w-5 h-5 transition-colors duration-200',
                              sortBy === 'departure_loc' ? 'text-gray-600' : 'text-amber-500'
                            ]"
                          />
                        </span>
                    </th>
                    <th v-if="showDeleteColumn || showAddRow " class=" whitespace-nowrap p-2 px-4 text-sm md:text-sm bg-indigo-100">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody >
                  <tr v-if="showAddRow" class="bg-yellow-50 text-center">
                      <td class="border p-2">-</td>
                      <td class="border p-2"><input v-model="newOrder.contact" class="w-full border rounded p-1 text-sm" /></td>
                      <td class="border p-2"><input v-model="newOrder.phone" class="w-full border rounded p-1 text-sm" /></td>
                      <td class="border p-2">
                        <select v-model="newOrder.departure_loc" class="w-full border rounded p-1 text-sm">
                          <option value="Booking.pier">水頭碼頭</option>
                          <option value="Booking.airport">尚義機場</option>
                        </select>                    
                      </td>
                      <td class="border p-2">
                        <select v-model="newOrder.destination_loc" class="w-full border rounded p-1 text-sm">
                          <option value="Booking.pier">水頭碼頭</option>
                          <option value="Booking.airport">尚義機場</option>
                        </select>
                      </td>
                      <td class="border p-2">
                        <a-config-provider :locale="zhTW"> 
                          <a-date-picker v-model:value="newOrder.shuttle_date" class="w-full" :inputReadOnly="true" valueFormat="YYYY-MM-DD" />
                        </a-config-provider>
                          </td>
                          <td class="border p-2">
                             <a-config-provider :locale="zhTW">
                               <a-time-picker type="time" v-model:value="newOrder.shuttle_time" class="w-full" :inputReadOnly="true" format="HH:mm" />
                             </a-config-provider>
                          </td>
                      <td class="border p-2">
                        <select v-model="newOrder.status" class="w-full border rounded p-1 text-sm">
                          <option value="notTraveled">未出行</option>
                          <option value="complete">完成</option>
                        </select>
                      </td>
                      <td class="border p-2"><input type="number" v-model.number="newOrder.adult_num" class="w-full border rounded p-1 text-sm" /></td>
                      <td class="border p-2"><input type="number" v-model.number="newOrder.child_num" class="w-full border rounded p-1 text-sm" /></td>
                      <td class="border p-2">{{ newOrder.adult_num + newOrder.child_num }}</td>
                      <td class="border p-2">
                        <select v-model="newOrder.payment_status" class="w-full border rounded p-1 text-sm">
                          <option value="已付款">已付款</option>
                          <option value="未付款">未付款</option>
                        </select>
                      </td>
                      <td class="border p-2"><input type="number" v-model="newOrder.totalprice" class="w-full border rounded p-1 text-sm" /></td>
                      <td class="border p-2 px-2 whitespace-nowrap">
                        <button class="text-white font-bold bg-red-500 px-4 py-1 rounded-lg" @click="saveNewOrder">
                          確認
                        </button>
                      </td>
                  </tr>
                    <tr v-if="filteredOrders.length === 0 && !showAddRow">
                      <td :colspan="tableHeaders.length + (showDeleteColumn ? 1 : 0)"
                          class="py-6 px-24 text-gray-400 text-lg md:text-lg">
                        🚫 這一天沒有訂單
                      </td>
                    </tr>
                      <tr v-for="(order, index) in filteredOrders" :key="index" class=" text-center odd:bg-white even:bg-gray-50">
                        <td class="border-b p-2 whitespace-nowrap text-sm md:text-md sticky left-0 z-10"
                          :class=" index % 2 === 0 ? 'bg-sky-50 ' : 'bg-gray-100' ">{{ order.id }}</td>
                        <td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">{{ order.contact }}</td>
                        <td class="border-b py-4 px-12 whitespace-nowrap text-sm md:text-lg">{{ order.phone }}</td>
                        <td class="border-b py-4 px-8 whitespace-nowrap text-sm md:text-lg">{{ t(`${order.departure_loc}`) }}</td>
                        <td class="border-b py-4 px-8 whitespace-nowrap text-sm md:text-lg">{{ t(`${order.destination_loc}`) }}</td>
                        <td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">{{ formatDate(order.shuttle_date) }}</td>
                        <td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">{{ order.shuttle_time }}</td>
                        <td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">
                          <span :class="statusClass(order.status) ">{{ TranslateStatus(order.status) }}</span>
                        </td>
                        <td class="border-b py-4 px-2 whitespace-nowrap text-sm md:text-lg">{{ order.adult_num }}</td>
                        <td class="border-b py-4 px-2 whitespace-nowrap text-sm md:text-lg">{{ order.child_num }}</td>
                        <td class="border-b py-4 px-4 whitespace-nowrap text-sm md:text-lg">{{ order.totalTickets }}</td>
                        <td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">{{ order.payment_status }}</td>
                        <td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">{{ order.totalprice }}</td>
                        <th v-if="showDeleteColumn" class="border-b">
                          <button 
                            v-if="showDeleteColumn && !showAddRow"
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
  import dayjs from 'dayjs';
  import zhTW from 'ant-design-vue/es/locale/zh_TW';
  import 'dayjs/locale/zh-tw';
  import ExcelJS from 'exceljs';
  import FileSaver from 'file-saver';
  import type { Dayjs } from 'dayjs';
  
  const { t } = useI18n();
  const searchQuery = ref('');
  const router = useRouter();
  // const DateShuttle = ref<Dayjs>();
  // const TimeShuttle = ref<string>(''); 

const DateSelected = ref(dayjs());
const FileNameDate = DateSelected.value.format("YYYY年MM月DD日");

const getExportData = () => {
  const headers = tableHeaders;
  const data = filteredOrders.value.map(order => [
    order.id,
    order.contact,
    order.phone,
    t(`${order.departure_loc}`),  
    t(`${order.destination_loc}`), 
    formatDate(order.shuttle_date),
    order.shuttle_time,
    TranslateStatus(order.status),
    order.adult_num,
    order.child_num,
    order.totalTickets,
    order.totalprice,
    order.payment_status
  ]);
  return { headers, data };
};

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
doc.text(`訂單詳情（${FileNameDate}）`, 14, 10);

// 表格数据
const { headers, data } = getExportData();

autoTable(doc, {
  head: [headers],
  body: data,
  startY: 20, // 表格起始位置
  styles: { fontSize: 10, font: "SourceHanSans-Normal" }, // 使用指定字体
  headStyles: { font: "SourceHanSans-Normal", fontStyle: "normal", fillColor: [22, 160, 133] },
  alternateRowStyles: { fillColor: [240, 240, 240] },
});

 const filename = `訂單詳情_${FileNameDate}.pdf`;
// 保存 PDF
doc.save(filename);
};

const generateExcel = async () => {
  const { headers, data } = getExportData();
  
  const { utils, writeFile } = await import("xlsx");

  const workbook = new ExcelJS.Workbook();
  const fileName = `訂單詳情_${FileNameDate}.xlsx`;
  const sheet = workbook.addWorksheet(fileName);

  sheet.mergeCells('A1:M1');
  const titleCell = sheet.getCell('A1');
  titleCell.value = `訂單報表 - ${DateSelected.value.format('YYYY-MM-DD')}`;
  titleCell.font = { size: 18, bold: true };
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  // titleCell.fill = {
  //   type: 'pattern',
  //   pattern: 'solid',
  //   fgColor: { argb: 'FFE2EFDA' }
  // };

  sheet.addRow(headers);
  const headerRow = sheet.getRow(2);
  headerRow.font = { bold: true, size: 14 };
  headerRow.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  headerRow.eachCell(cell => {
    cell.border = {
      top: { style: 'medium' },
      bottom: { style: 'medium' },
      left: { style: 'thin' },
      right: { style: 'thin' }
    };
  });

   data.forEach(rowData => {
    const row = sheet.addRow(rowData);
    row.eachCell(cell => {
      cell.font = { size: 11 };
      cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      };
    });
  });

  // 👉 自定列寬
  sheet.columns.forEach((column, index) => {
    column.width = [10, 15, 15, 18, 18, 12, 10, 12, 10, 10, 10, 12, 12][index] || 15;
  });

  // 👉 匯出
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  FileSaver.saveAs(blob, `訂單報表_${DateSelected.value.format('YYYY-MM-DD')}.xlsx`);
};


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
    '時間', '狀態','成人票(人)','兒童票(人)', '全票數', '是否付款','總價格',
  ];
  
  // 設置狀態顏色
  const statusClass = (status: string) => ({
    'text-black font-bold bg-green-400 px-4 py-1 rounded-2xl': status === 'complete',
    'text-white font-bold bg-red-400 px-2 py-1 rounded-2xl': status === 'notTraveled',
  });
  const date = DateSelected.value.format('YYYY-MM-DD');
  const orders = ref<any[]>([]);
  const data = ref<BookingModel[]>([]);
  const sortBy = ref('departure_loc');
  const fetchData = async (sortField: string = 'departure_loc') => {
    try {
      const result = await $fetch('/api/GETbooking', {
        query: {  // 使用 query 而不是 params
          sortBy: sortField,
          date: DateSelected.value.format('YYYY-MM-DD')
        }
      });
      console.log('📤 發送查詢:', { sortBy: sortField, date });
      data.value = result.data as BookingModel[];
      console.log('🚚 抓回的 data:', data.value); 
      
      orders.value = data.value.map(booking => ({
        id: booking.id,
        departure_loc: booking.departure_loc,
        destination_loc: booking.destination_loc,
        shuttle_date: booking.shuttle_date,
        shuttle_time: booking.shuttle_time,
        status: booking.status,
        adult_num: booking.adult_num,
        child_num: booking.child_num,
        totalTickets: booking.total_tickets,
        totalprice: booking.totalprice,
        contact: booking.contact_name,
        phone: booking.contact_phone,
        payment_status: booking.payment_status
      }));
    } catch (error) {
      console.error('Fetch error:', error);
      alert('網絡卡頓，無法獲取數據，請重新進入網站');
    }
  };
  
  onMounted(()=> fetchData(sortBy.value));

    watch(DateSelected, () => {
      console.log('選擇日期:', DateSelected);
      fetchData(sortBy.value);
    });

  const scrollContainer = ref<HTMLElement | null>(null)
  
  const showDeleteColumn = ref(false);
  const showAddRow = ref(false);
  const handleItemSelected = async (action: string) => {
    console.log('選擇的動作:', action);
    if (action === 'print') {
      generatePDF();
    } else if (action === 'excel') {
      generateExcel();
    }
    else if (action === 'delete') {
      showDeleteColumn.value = true;
      if (scrollContainer.value) {
        scrollContainer.value.scrollTo({
          left: scrollContainer.value.scrollWidth,
          behavior: 'smooth'
        });
      }
    } else if (action === 'add') {
      showAddRow.value = true;
    }
  };
  
  async function headerClickSort(header: string) {
    if (header === '上車地點') {
      sortBy.value = 'departure_loc';
      await fetchData(sortBy.value);
    } else if (header === '時間') {
      sortBy.value = 'shuttle_time';
      await fetchData(sortBy.value);
    }
  }
    const newOrder = reactive({
      contact: '',
      phone: '',
      departure_loc: '',
      destination_loc: '',
      shuttle_date: '',
      shuttle_time: '',
      status: '',
      adult_num: 0,
      child_num: 0,
      payment_status: 'unpaid',
      totalprice: 0
    });

    const saveNewOrder = async () => {
          const form = {
          trip_type: 'oneWay',
          LineID: 'U1234567890abcdef1234567890abcdef',
          adult_num: newOrder.adult_num,
          child_num: newOrder.child_num,
          contact_phone: newOrder.phone,
          totalprice: newOrder.totalprice,
          contact_name: newOrder.contact,
          departure_loc: newOrder.departure_loc,
          destination_loc: newOrder.destination_loc,
          return_departure: '',
          return_destination: '',
          arrivalpoint_date: undefined, 
          arrivalpoint_time: undefined,
          return_arrival_date: undefined, 
          return_arrival_time: undefined,
          flight_num: undefined,
          ferry_time: undefined,
          flight_time:undefined,
          shuttle_date: newOrder.shuttle_date
            ? dayjs(newOrder.shuttle_date).format('YYYY-MM-DD')
            : undefined,
          shuttle_time: newOrder.shuttle_time
            ? dayjs(newOrder.shuttle_time).format('HH:mm')
            : undefined,
          return_shuttle_date: undefined , 
          return_shuttle_time: undefined,
          status: newOrder.status,
          payment_status: newOrder.payment_status
        }; 
        
        console.log('送出的表單內容:', form);

        try{
          const response = await $fetch('/api/POSTbooking', {
            method: 'POST',
            body: form
          });
          if (response?.id) {
          await fetchData();
          newOrder.contact= '';
          newOrder.phone= '';
          newOrder.departure_loc= '';
          newOrder.destination_loc= '';
          newOrder.shuttle_date= '';
          newOrder.shuttle_time= '';
          newOrder.status= '';
          newOrder.adult_num= 0;
          newOrder.child_num= 0;
          newOrder.payment_status= 'unpaid';
          newOrder.totalprice= 0;
          }
        }catch{
          alert(t('alertMessage4'));
          }
    };

  const DeleteOrder = async (id: number) => {
    const confirmDelete = confirm("你確定要刪除這筆訂單嗎？");
    if (!confirmDelete) return;
    console.log("ID"+ id);
    try {
      const response = await $fetch('/api/DeleteBookingById', {
        method: 'DELETE',
        body: {id},
      });
    if (response) {
      await fetchData(); // 重新獲取資料
    } else {
      alert("網絡卡頓，無法獲取數據，請重新進入網站");
    }
  } catch {
    alert('刪除失敗');
  }
};

watch(() => newOrder.departure_loc, (newVal) => {
  if (newVal === 'Booking.pier') {
    newOrder.destination_loc = 'Booking.airport';
  } else if (newVal === 'Booking.airport') {
    newOrder.destination_loc = 'Booking.pier';
  }
});
</script>  