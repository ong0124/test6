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

    <div class="flex my-2 ml-8 items-center">
      <p>上車地點：</p>
      <div class="flex flex-1 justify-around">
        <button class="border-2 border-gray-500 rounded-xl py-1 px-4"
        :class="sortBy === 'Booking.airport' ? 'bg-amber-500 text-white border-white' : 'border-gray-500'"
         @click="sortByHandler('Booking.airport')"
         >
          尚義機場
        </button>
        <button class="border-2 border-gray-500 rounded-xl py-1 px-4"
        :class="sortBy === 'Booking.pier' ? 'bg-amber-500 text-white border-white' : 'border-gray-500'"
        @click="sortByHandler('Booking.pier')"
        >
          水頭碼頭
        </button>
      </div>
    </div>

    <div class="flex flex-col ml-2 mb-16 ">
            <div ref="scrollContainer" class="overflow-x-auto pb-4">
              <table class="table-fixed min-w-full mr-12">
                <thead>
                  <tr class="bg-gray-100 ">
                    <th class="p-4 text-sm md:text-lg sticky left-0 bg-indigo-200 whitespace-nowrap">訂單ID</th>
                    <th v-for="(header, index) in headersToRender.slice(1)" :key="index" class="p-4 text-sm md:text-sm bg-indigo-100 whitespace-nowrap">
                          {{ header }}
                    </th>
                    <th v-if="showDeleteColumn || showAddRow || isEditing " class=" whitespace-nowrap p-2 px-4 text-sm md:text-sm bg-indigo-100">
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
                        <button 
                           class=" text-gray-500 px-4 py-1 rounded"
                            @click="CancelOption"
                          >
                            <Icon name="material-symbols-close-rounded" class="text-gray-500 w-5 h-5"/>
                        </button>
                      </td>
                  </tr>
                    <tr v-if="filteredOrders.length === 0 && !showAddRow">
                      <td :colspan="headersToRender.length + (showDeleteColumn ? 1 : 0)"
                          class="py-6 px-24 text-gray-400 text-lg md:text-lg">
                        🚫 這一天沒有訂單
                      </td>
                    </tr>
                      <tr v-for="(order, index) in filteredOrders" :key="index" class=" text-center odd:bg-white even:bg-gray-50">
                        <td class="border-b p-2 whitespace-nowrap text-sm md:text-md sticky left-0 z-10"
                          :class=" index % 2 === 0 ? 'bg-sky-50 ' : 'bg-gray-100' ">{{ order.id }}</td>
                        <td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">
                        <template v-if="isEditing">
                        <input v-model="order.contact" class="border rounded p-1 text-sm" />
                        </template>
                        <template v-else>
                          {{ order.contact }}
                        </template></td>
                        <td class="border-b py-4 px-12 whitespace-nowrap text-sm md:text-lg">
                          <template v-if="isEditing">
                            <input v-model="order.phone" class="border rounded p-1 text-sm" />
                          </template>
                          <template v-else>
                            {{ order.phone }}
                          </template>
                        </td>
                        <td class="border-b py-4 px-8 whitespace-nowrap text-sm md:text-lg">
                            <select v-if="isEditing" v-model="order.departure_loc" class=" border rounded p-1 text-sm">
                              <option value="Booking.pier">水頭碼頭</option>
                              <option value="Booking.airport">尚義機場</option>
                            </select>
                            <span v-else>{{ t((order.display_departure)) }}</span>
                        </td>
                        <td v-if= "sortBy === 'Booking.airport'"class="border-b py-4 px-8 whitespace-nowrap text-sm md:text-lg">
                            <p>{{ order.flight_num }} </p>
                            <p>{{ order.flight_loc }}</p>
                        </td>
                        <td class="border-b py-4 px-8 whitespace-nowrap text-sm md:text-lg">  
                            <select v-if="isEditing" v-model="order.destination_loc" class=" border rounded p-1 text-sm">
                              <option value="Booking.pier">水頭碼頭</option>
                              <option value="Booking.airport">尚義機場</option>
                            </select>
                            <span v-else>{{ t((order.display_destination)) }} </span>
                        </td>
                        <td v-if= "sortBy === 'Booking.airport'"class="border-b py-4 px-8 whitespace-nowrap text-sm md:text-lg">
                            {{ order.ferry_time}}
                        </td>
                        <td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">  
                          <a-config-provider v-if="isEditing" :locale="zhTW">
                            <a-date-picker v-model:value="order.shuttle_date"  :inputReadOnly="true" valueFormat="YYYY-MM-DD" />
                          </a-config-provider>
                          <span v-else>{{ order.display_date }}</span>
                        </td>
                        <td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg"> 
                          <a-config-provider v-if="isEditing" :locale="zhTW">
                          <a-time-picker v-model:value="order.shuttle_time" :inputReadOnly="true" format="HH:mm" />
                          </a-config-provider>
                          <span v-else>{{ order.display_time }}</span>
                        </td>
                        <td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">
                          <select v-if="isEditing" v-model="order.status" class="border rounded p-1 text-sm">
                            <option value="notTraveled">未出行</option>
                            <option value="complete">完成</option>
                          </select>
                          <span v-else :class="statusClass(order.status)">{{ TranslateStatus(order.status) }}</span>
                        </td>
                        <td class="border-b py-4 px-2 whitespace-nowrap text-sm md:text-lg">
                          <input v-if="isEditing" type="number" v-model.number="order.adult_num" class=" border rounded p-1 text-sm" />
                          <span v-else>{{ order.adult_num }}</span>
                        </td>
                        <td class="border-b py-4 px-2 whitespace-nowrap text-sm md:text-lg">
                          <input v-if="isEditing" type="number" v-model.number="order.child_num" class=" border rounded p-1 text-sm" />
                          <span v-else>{{ order.child_num }}</span>
                        </td>
                        <td class="border-b py-4 px-4 whitespace-nowrap text-sm md:text-lg ">{{ order.totalTickets }}</td>

                        <td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">
                          <select v-if="isEditing" v-model="order.payment_status" class=" border rounded p-1 text-sm">
                            <option value="已付款">已付款</option>
                            <option value="未付款">未付款</option>
                          </select>
                          <span v-else>{{ order.payment_status }}</span>
                        </td>
                        <td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">
                          <input v-if="isEditing" type="number" v-model.number="order.totalprice" class=" border rounded p-1 text-sm" />
                          <span v-else>{{ order.totalprice }}</span>
                        </td>
                        <th v-if="(showDeleteColumn || isEditing) && !showAddRow" class="border-b whitespace-nowrap">
                        <button v-if="isEditing" class="text-white font-bold bg-red-500 px-4 py-1 rounded-lg" @click="confirmUpdate(order)"
                        > 確認
                        </button>
                        <button v-else
                            class=" text-red-500 px-4 py-1 rounded"
                            @click="DeleteOrder(order.id)"
                          >
                            <Icon name="mdi:delete" class="text-red-500 w-5 h-5"/>
                          </button>

                          <button 
                            class=" text-gray-500 px-4 py-1 rounded"
                            @click="CancelOption"
                          >
                            <Icon name="material-symbols-close-rounded" class="text-gray-500 w-5 h-5"/>
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
  import dayjs from 'dayjs';
  import zhTW from 'ant-design-vue/es/locale/zh_TW';
  import 'dayjs/locale/zh-tw';
  import ExcelJS from 'exceljs';
  import FileSaver from 'file-saver';
  
  const { t } = useI18n();
  const searchQuery = ref('');
  
  const DateSelected = ref(dayjs());
  const FileNameDate = DateSelected.value.format("YYYY年MM月DD日");
  
  const getExportData = () => {
    const headers = tableHeaders;
    const data = filteredOrders.value.map(order => [
      order.id,
      order.contact,
      order.phone,
      t(`${order.display_departure}`),  
      t(`${order.display_destination}`), 
      formatDate(order.display_date ),
      order.display_time ,
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
    
    const workbook = new ExcelJS.Workbook();
    const fileName = `訂單詳情_${FileNameDate}.xlsx`;
    const sheet = workbook.addWorksheet(fileName);
    
    sheet.mergeCells('A1:M1');
    const titleCell = sheet.getCell('A1');
    titleCell.value = `訂單報表 - ${DateSelected.value.format('YYYY-MM-DD')}`;
    titleCell.font = { size: 18, bold: true };
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
      
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

const headersToRender = computed(() => {
  const newHeaders = [...tableHeaders]
  if (sortBy.value === 'Booking.airport') {
    const insertAt = (arr: string[], target: string, newItem: string) => {
      const index = arr.indexOf(target)
      if (index !== -1) arr.splice(index + 1, 0, newItem)
    }
    insertAt(newHeaders, '上車地點', '航班信息')
    insertAt(newHeaders, '下車地點', '銜接的船班時間')
  }
  return newHeaders
})

// 設置狀態顏色
const statusClass = (status: string) => ({
  'text-black font-bold bg-green-400 px-4 py-1 rounded-2xl': status === 'complete',
  'text-white font-bold bg-red-400 px-2 py-1 rounded-2xl': status === 'notTraveled',
});

const orders = ref<any[]>([]);
const data = ref<BookingModel[]>([]);
const sortBy = ref<string>('Booking.airport');
const sortByHandler = (location: 'Booking.airport' | 'Booking.pier') => {
  sortBy.value = location
  orders.value = location === 'Booking.airport' ? airportOrders.value : pierOrders.value;
}

const airportOrders = ref<any[]>([]);
const pierOrders = ref<any[]>([]);

const fetchData = async () => {
  try {
    const result = await $fetch('/api/GETbooking', {
      query: {  
        date: DateSelected.value.format('YYYY-MM-DD')
      }
    });

    console.log('📤 發送查詢:', { date: DateSelected.value.format('YYYY-MM-DD') });

    data.value = result.data as BookingModel[];
    console.log('🚚 抓回的 data:', data.value); 

    const airport: any[] = [];
    const pier: any[] = [];

    const Grouporders = data.value.flatMap(booking => {
      const isRoundTrip = booking.trip_type === 'roundTrip';
      const isShuttleToday = dayjs(booking.shuttle_date).isSame(DateSelected.value, 'day');
      const isReturnToday = dayjs(booking.return_shuttle_date).isSame(DateSelected.value, 'day');

      const orders: any[] = [];

      // 去程
      if (isShuttleToday) {
        const goOrder = {
          segment: 'go',
          id: booking.id,
          trip_type: booking.trip_type,
          display_departure: booking.departure_loc,
          display_destination: booking.destination_loc,
          display_date: formatDate(booking.shuttle_date),
          display_time: booking.shuttle_time,
          contact: booking.contact_name,
          totalTickets: booking.total_tickets,
          totalprice: booking.totalprice,
          status: booking.status,
          adult_num: booking.adult_num,
          child_num: booking.child_num,
          payment_status: booking.payment_status,
          phone: booking.contact_phone,
          flight_num: booking.flight_num,
          flight_loc :booking.flight_loc,
          ferry_time : booking.ferry_time
        };

        orders.push(goOrder);
        if (booking.departure_loc === 'Booking.airport') {
          airport.push(goOrder);
        } else if (booking.departure_loc === 'Booking.pier') {
          pier.push(goOrder);
        }
      }

      // 回程
      if (isRoundTrip && isReturnToday) {
        const returnOrder = {
          segment: 'return', 
          id: booking.id,
          trip_type: booking.trip_type,
          display_departure: booking.return_departure,
          display_destination: booking.return_destination,
          display_date: formatDate(booking.return_shuttle_date),
          display_time: booking.return_shuttle_time,
          contact: booking.contact_name,
          totalTickets: booking.total_tickets,
          totalprice: booking.totalprice,
          status: booking.status,
          adult_num: booking.adult_num,
          child_num: booking.child_num,
          payment_status: booking.payment_status,
          phone: booking.contact_phone,
          flight_num: booking.flight_num,
          flight_loc :booking.flight_loc,
          ferry_time : booking.ferry_time
        };

        orders.push(returnOrder);
        if (booking.return_departure === 'Booking.airport') {
          airport.push(returnOrder);
        } else if (booking.return_departure === 'Booking.pier') {
          pier.push(returnOrder);
        }
      }

      return orders;
    });

      const sortByTime = (a: any, b: any) => {
      if (a.display_time < b.display_time) return -1;
      if (a.display_time > b.display_time) return 1;
      return 0;
    };
    airportOrders.value = airport.sort(sortByTime);
    pierOrders.value = pier.sort(sortByTime);
    orders.value = sortBy.value === 'Booking.airport' ? airportOrders.value : pierOrders.value;

  } catch (error) {
    console.error('Fetch error:', error);
    alert('網絡卡頓，無法獲取數據，請重新進入網站');
  }
};

  
  onMounted(()=> fetchData());

    watch(DateSelected, () => {
      console.log('選擇日期:', DateSelected);
      fetchData();
    });

  const scrollContainer = ref<HTMLElement | null>(null)
  
  const showDeleteColumn = ref(false);
  const showAddRow = ref(false);
  const isEditing = ref(false);

  const CancelOption = () =>{
    showDeleteColumn.value = false;
    showAddRow.value = false;
    isEditing.value = false;
    fetchData();
  }
  const handleItemSelected = async (action: string) => {
    console.log('選擇的動作:', action);
    if (action === 'print') {
      generatePDF();
    } else if (action === 'excel') {
      generateExcel();
    }
    else if (action === 'delete') {
      showAddRow.value = false;
      isEditing.value = false;
      showDeleteColumn.value = true;
      nextTick(() => {
        if (scrollContainer.value) {
          scrollContainer.value.scrollTo({
            left: scrollContainer.value.scrollWidth,
            behavior: 'smooth'
          });
        }
      });
    } else if (action === 'add') {
      showAddRow.value = true;
      isEditing.value = false;
      showDeleteColumn.value = false;
    }
    else if (action === 'edit') {
      isEditing.value = true;
      showDeleteColumn.value = false;
      showAddRow.value = false;
    }
  };
  

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

const confirmUpdate = async (order: any) => {
  try {
    const body: any = {
      contact_name: order.contact,
      contact_phone: order.phone,
      departure_loc: order.departure_loc,
      destination_loc: order.destination_loc,
      status: order.status,
      adult_num: order.adult_num,
      child_num: order.child_num,
      totalprice: order.totalprice,
      payment_status: order.payment_status
    };
    if (order.segment === 'go') {
      body.departure_loc = order.departure_loc;
      body.destination_loc = order.destination_loc;
      body.shuttle_date = order.shuttle_date 
      ? dayjs(order.shuttle_date).format('YYYY-MM-DD')
      : undefined;
      body.shuttle_time = order.shuttle_time
      ? dayjs(order.shuttle_time).format('HH:mm:ss')
      : undefined;
    } else if (order.segment === 'return') {
      body.return_departure = order.departure_loc;
      body.return_destination = order.destination_loc;
      body.return_shuttle_date = order.shuttle_date
      ? dayjs(order.shuttle_date).format('YYYY-MM-DD')
      : undefined;
      body.return_shuttle_time = order.shuttle_time
      ? dayjs(order.shuttle_time).format('HH:mm:ss')
      : undefined;
    }
    console.log('🧾 請求內容 body:', body);
    const res = await $fetch(`/api/detailsUpdate/${order.id}`, {
      method: 'PUT',
      body
    });

    if (res.message === 'Booking updated successfully') {
      alert('更新成功！');
      isEditing.value = false;
    }
  } catch (error) {
    console.error(error);
    alert('更新失敗');
  }
};



</script>  