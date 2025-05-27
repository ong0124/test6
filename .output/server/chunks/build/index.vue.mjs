import __nuxt_component_3 from './index2.mjs';
import { _ as _sfc_main$2 } from './PopMenu.vue.mjs';
import { defineComponent, ref, computed, watch, reactive, unref, withCtx, createVNode, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import { d as dayjs, _ as _sfc_main$1, a as _sfc_main$3 } from '../_/index.mjs';
import { C as ConfigProvider, l as localeValues, D as DatePicker$1 } from './dayjs.mjs';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { e as useI18n } from './server.mjs';
import { f as formatDate } from './formatDate.mjs';
import { T as TimePicker$1 } from './dayjs2.mjs';
import '@iconify/utils/lib/css/icon';
import '@iconify/vue';
import './v3.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:module';
import 'node:path';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';
import '@vueuse/core';
import 'vue-router';
import '@babel/runtime/helpers/esm/extends';
import '@babel/runtime/helpers/esm/objectSpread2';
import '@ctrl/tinycolor';
import '@ant-design/colors';
import 'stylis';
import 'vue-types';
import 'lodash-es';
import 'dom-align';
import 'pinia';

function TranslateStatus(status) {
  const statusMap = {
    complete: "完成",
    notTraveled: "未出行"
  };
  return statusMap[status] || "未知状态";
}

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const searchQuery = ref("");
    const DateSelected = ref(dayjs());
    const FileNameDate = DateSelected.value.format("YYYY年MM月DD日");
    const getExportData = () => {
      const headers = tableHeaders;
      const data2 = filteredOrders.value.map((order) => [
        order.id,
        order.contact,
        order.phone,
        t(`${order.display_departure}`),
        t(`${order.display_destination}`),
        formatDate(order.display_date),
        order.display_time,
        TranslateStatus(order.status),
        order.adult_num,
        order.child_num,
        order.totalTickets,
        order.totalprice,
        order.payment_status
      ]);
      return { headers, data: data2 };
    };
    const generatePDF = async () => {
      const { jsPDF } = await import('jspdf');
      const autoTable = (await import('jspdf-autotable')).default;
      const doc = new jsPDF();
      const fontUrl = "/fonts/SourceHanSans-Normal.ttf";
      const fontResponse = await fetch(fontUrl);
      const fontData = await fontResponse.arrayBuffer();
      const fontBase64 = btoa(
        new Uint8Array(fontData).reduce((data3, byte) => data3 + String.fromCharCode(byte), "")
      );
      doc.addFileToVFS("SourceHanSans-Normal.ttf", fontBase64);
      doc.addFont("SourceHanSans-Normal.ttf", "SourceHanSans-Normal", "normal");
      doc.setFont("SourceHanSans-Normal");
      doc.text(`訂單詳情（${FileNameDate})`, 14, 10);
      const { headers, data: data2 } = getExportData();
      autoTable(doc, {
        head: [headers],
        body: data2,
        startY: 20,
        // 表格起始位置
        styles: { fontSize: 10, font: "SourceHanSans-Normal" },
        // 使用指定字体
        headStyles: { font: "SourceHanSans-Normal", fontStyle: "normal", fillColor: [22, 160, 133] },
        alternateRowStyles: { fillColor: [240, 240, 240] }
      });
      const filename = `訂單詳情_${FileNameDate}.pdf`;
      doc.save(filename);
    };
    const generateExcel = async () => {
      const { headers, data: data2 } = getExportData();
      const workbook = new ExcelJS.Workbook();
      const fileName = `訂單詳情_${FileNameDate}.xlsx`;
      const sheet = workbook.addWorksheet(fileName);
      sheet.mergeCells("A1:M1");
      const titleCell = sheet.getCell("A1");
      titleCell.value = `訂單報表 - ${DateSelected.value.format("YYYY-MM-DD")}`;
      titleCell.font = { size: 18, bold: true };
      titleCell.alignment = { horizontal: "center", vertical: "middle" };
      sheet.addRow(headers);
      const headerRow = sheet.getRow(2);
      headerRow.font = { bold: true, size: 14 };
      headerRow.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      headerRow.eachCell((cell) => {
        cell.border = {
          top: { style: "medium" },
          bottom: { style: "medium" },
          left: { style: "thin" },
          right: { style: "thin" }
        };
      });
      data2.forEach((rowData) => {
        const row = sheet.addRow(rowData);
        row.eachCell((cell) => {
          cell.font = { size: 11 };
          cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
          cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" }
          };
        });
      });
      sheet.columns.forEach((column, index) => {
        column.width = [10, 15, 15, 18, 18, 12, 10, 12, 10, 10, 10, 12, 12][index] || 15;
      });
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      FileSaver.saveAs(blob, `訂單報表_${DateSelected.value.format("YYYY-MM-DD")}.xlsx`);
    };
    const filteredOrders = computed(() => {
      const keyword = searchQuery.value.toLowerCase();
      return orders.value.filter(
        (order) => Object.values(order).some(
          (value) => String(value).toLowerCase().includes(keyword)
        )
      );
    });
    const tableHeaders = [
      "訂單 ID",
      "聯絡人",
      "電話號碼",
      "上車地點",
      "下車地點",
      "日期",
      "發車時間",
      "狀態",
      "成人票(人)",
      "兒童票(人)",
      "全票數",
      "是否付款",
      "總價格"
    ];
    const headersToRender = computed(() => {
      const newHeaders = [...tableHeaders];
      const insertAt = (arr, target, newItem) => {
        const index = arr.indexOf(target);
        if (index !== -1) arr.splice(index + 1, 0, newItem);
      };
      if (sortBy.value === "Booking.airport") {
        insertAt(newHeaders, "上車地點", "航班信息");
        insertAt(newHeaders, "下車地點", "銜接的船班時間");
      } else {
        insertAt(newHeaders, "下車地點", "銜接班機的時間");
      }
      return newHeaders;
    });
    const statusClass = (status) => ({
      "text-black font-bold bg-green-400 px-4 py-1 rounded-2xl": status === "complete",
      "text-white font-bold bg-red-400 px-2 py-1 rounded-2xl": status === "notTraveled"
    });
    const orders = ref([]);
    const data = ref([]);
    const sortBy = ref("Booking.airport");
    const airportOrders = ref([]);
    const pierOrders = ref([]);
    const fetchData = async () => {
      try {
        const result = await $fetch("/api/GETbooking", {
          query: {
            date: DateSelected.value.format("YYYY-MM-DD")
          }
        });
        console.log("📤 發送查詢:", { date: DateSelected.value.format("YYYY-MM-DD") });
        data.value = result.data;
        console.log("🚚 抓回的 data:", data.value);
        const airport = [];
        const pier = [];
        const Grouporders = data.value.flatMap((booking) => {
          const isRoundTrip = booking.trip_type === "roundTrip";
          const isShuttleToday = dayjs(booking.shuttle_date).isSame(DateSelected.value, "day");
          const isReturnToday = dayjs(booking.return_shuttle_date).isSame(DateSelected.value, "day");
          const orders2 = [];
          if (isShuttleToday) {
            const goOrder = {
              segment: "go",
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
              flight_loc: booking.flight_loc,
              ferry_time: dayjs(booking.ferry_time, "HH:mm"),
              flight_time: booking.flight_time,
              arrivalpoint_time: booking.arrivalpoint_time
            };
            orders2.push(goOrder);
            if (booking.departure_loc === "Booking.airport") {
              airport.push(goOrder);
            } else if (booking.departure_loc === "Booking.pier") {
              pier.push(goOrder);
            }
          }
          if (isRoundTrip && isReturnToday) {
            const returnOrder = {
              segment: "return",
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
              flight_loc: booking.flight_loc,
              ferry_time: dayjs(booking.ferry_time, "HH:mm"),
              flight_time: booking.flight_time,
              arrivalpoint_time: booking.return_arrival_time
            };
            orders2.push(returnOrder);
            if (booking.return_departure === "Booking.airport") {
              airport.push(returnOrder);
            } else if (booking.return_departure === "Booking.pier") {
              pier.push(returnOrder);
            }
          }
          return orders2;
        });
        const sortByTime = (a, b) => {
          if (a.display_time < b.display_time) return -1;
          if (a.display_time > b.display_time) return 1;
          return 0;
        };
        airportOrders.value = airport.sort(sortByTime);
        pierOrders.value = pier.sort(sortByTime);
        orders.value = sortBy.value === "Booking.airport" ? airportOrders.value : pierOrders.value;
      } catch (error) {
        console.error("Fetch error:", error);
        alert("網絡卡頓，無法獲取數據，請重新進入網站");
      }
    };
    watch(DateSelected, () => {
      console.log("選擇日期:", DateSelected);
      fetchData();
    });
    const scrollContainer = ref(null);
    const showDeleteColumn = ref(false);
    const showAddRow = ref(false);
    const isEditing = ref(false);
    const handleItemSelected = async (action) => {
      console.log("選擇的動作:", action);
      if (action === "print") {
        generatePDF();
      } else if (action === "excel") {
        generateExcel();
      } else if (action === "delete") {
        showAddRow.value = false;
        isEditing.value = false;
        showDeleteColumn.value = true;
        nextTick(() => {
          if (scrollContainer.value) {
            scrollContainer.value.scrollTo({
              left: scrollContainer.value.scrollWidth,
              behavior: "smooth"
            });
          }
        });
      } else if (action === "add") {
        showAddRow.value = true;
        isEditing.value = false;
        showDeleteColumn.value = false;
      } else if (action === "edit") {
        isEditing.value = true;
        showDeleteColumn.value = false;
        showAddRow.value = false;
      }
    };
    const newOrder = reactive({
      contact: "",
      phone: "",
      departure_loc: "",
      destination_loc: "",
      shuttle_date: "",
      shuttle_time: "",
      status: "",
      adult_num: 0,
      child_num: 0,
      payment_status: "",
      totalprice: 0,
      flight_num: "",
      flight_loc: "",
      arrival_time: "",
      flightOrferry_time: ""
    });
    watch(() => newOrder.departure_loc, (newVal) => {
      if (newVal === "Booking.pier") {
        newOrder.destination_loc = "Booking.airport";
      } else if (newVal === "Booking.airport") {
        newOrder.destination_loc = "Booking.pier";
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$1;
      const _component_Icon = __nuxt_component_3;
      const _component_PopMenu = _sfc_main$2;
      const _component_a_config_provider = ConfigProvider;
      const _component_a_date_picker = DatePicker$1;
      const _component_a_time_picker = TimePicker$1;
      const _component_BottomNavigator = _sfc_main$3;
      _push(`<!--[--><div>`);
      _push(ssrRenderComponent(_component_Header, null, null, _parent));
      _push(`</div><div><div class="flex justify-evenly items-center"><div class="flex items-center border-2 border-blue-500 rounded-md w-2/3 mt-2 ml-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols-search-rounded",
        class: "h-5 w-5 text-gray-500 mx-2"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" class="py-1 w-full rounded-md focus:ring-0 focus:border-transparent border-none outline-none" placeholder="搜索訂單"></div>`);
      _push(ssrRenderComponent(_component_PopMenu, {
        onItemSelected: handleItemSelected,
        class: "z-20"
      }, null, _parent));
      _push(`</div><div class="flex my-2 ml-8 items-center"><p> 乘车日期： </p>`);
      _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(localeValues) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_a_date_picker, {
              value: DateSelected.value,
              "onUpdate:value": ($event) => DateSelected.value = $event,
              inputReadOnly: true,
              class: "w-1/2"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_a_date_picker, {
                value: DateSelected.value,
                "onUpdate:value": ($event) => DateSelected.value = $event,
                inputReadOnly: true,
                class: "w-1/2"
              }, null, 8, ["value", "onUpdate:value"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex my-2 ml-8 items-center"><p>上車地點：</p><div class="flex flex-1 justify-around"><button class="${ssrRenderClass([sortBy.value === "Booking.airport" ? "bg-amber-500 text-white border-white" : "border-gray-500", "border-2 border-gray-500 rounded-xl py-1 px-4"])}"> 尚義機場 </button><button class="${ssrRenderClass([sortBy.value === "Booking.pier" ? "bg-amber-500 text-white border-white" : "border-gray-500", "border-2 border-gray-500 rounded-xl py-1 px-4"])}"> 水頭碼頭 </button></div></div><div class="flex flex-col ml-2 mb-16"><div class="overflow-x-auto pb-4"><table class="table-fixed min-w-full mr-12"><thead><tr class="bg-gray-100"><th class="p-4 text-sm md:text-lg sticky left-0 bg-indigo-200 whitespace-nowrap">訂單ID</th><!--[-->`);
      ssrRenderList(unref(headersToRender).slice(1), (header, index) => {
        _push(`<th class="p-4 text-sm md:text-sm bg-indigo-100 whitespace-nowrap">${ssrInterpolate(header)}</th>`);
      });
      _push(`<!--]-->`);
      if (showDeleteColumn.value || showAddRow.value || isEditing.value) {
        _push(`<th class="whitespace-nowrap p-2 px-4 text-sm md:text-sm bg-indigo-100"> 操作 </th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr></thead><tbody>`);
      if (showAddRow.value) {
        _push(`<tr class="bg-yellow-50 text-center"><td class="border p-2">-</td><td class="border p-2"><input${ssrRenderAttr("value", unref(newOrder).contact)} class="w-full border rounded p-1 text-sm"></td><td class="border p-2"><input${ssrRenderAttr("value", unref(newOrder).phone)} class="w-full border rounded p-1 text-sm"></td><td class="border p-2"><select class="w-full border rounded p-1 text-sm"><option value="Booking.pier"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).departure_loc) ? ssrLooseContain(unref(newOrder).departure_loc, "Booking.pier") : ssrLooseEqual(unref(newOrder).departure_loc, "Booking.pier")) ? " selected" : ""}>水頭碼頭</option><option value="Booking.airport"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).departure_loc) ? ssrLooseContain(unref(newOrder).departure_loc, "Booking.airport") : ssrLooseEqual(unref(newOrder).departure_loc, "Booking.airport")) ? " selected" : ""}>尚義機場</option></select>`);
        _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(localeValues) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_time_picker, {
                type: "time",
                value: unref(newOrder).arrival_time,
                "onUpdate:value": ($event) => unref(newOrder).arrival_time = $event,
                class: "w-full",
                inputReadOnly: true,
                format: "HH:mm"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_time_picker, {
                  type: "time",
                  value: unref(newOrder).arrival_time,
                  "onUpdate:value": ($event) => unref(newOrder).arrival_time = $event,
                  class: "w-full",
                  inputReadOnly: true,
                  format: "HH:mm"
                }, null, 8, ["value", "onUpdate:value"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td>`);
        if (sortBy.value === "Booking.airport") {
          _push(`<td class="border-b py-4 px-8 text-sm md:text-lg"><input${ssrRenderAttr("value", unref(newOrder).flight_num)} class="border rounded p-1 text-sm"><select class="border rounded p-1 text-sm mt-2"><option value="TSA"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).flight_loc) ? ssrLooseContain(unref(newOrder).flight_loc, "TSA") : ssrLooseEqual(unref(newOrder).flight_loc, "TSA")) ? " selected" : ""}>松山 (TSA)</option><option value="RMQ"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).flight_loc) ? ssrLooseContain(unref(newOrder).flight_loc, "RMQ") : ssrLooseEqual(unref(newOrder).flight_loc, "RMQ")) ? " selected" : ""}>台中 (RMQ)</option><option value="CYI"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).flight_loc) ? ssrLooseContain(unref(newOrder).flight_loc, "CYI") : ssrLooseEqual(unref(newOrder).flight_loc, "CYI")) ? " selected" : ""}>嘉義 (CYI)</option><option value="TNN"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).flight_loc) ? ssrLooseContain(unref(newOrder).flight_loc, "TNN") : ssrLooseEqual(unref(newOrder).flight_loc, "TNN")) ? " selected" : ""}>台南 (TNN)</option><option value="MZG"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).flight_loc) ? ssrLooseContain(unref(newOrder).flight_loc, "MZG") : ssrLooseEqual(unref(newOrder).flight_loc, "MZG")) ? " selected" : ""}>澎湖 (MZG)</option></select></td>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<td class="border p-2"><select class="w-full border rounded p-1 text-sm"><option value="Booking.pier"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).destination_loc) ? ssrLooseContain(unref(newOrder).destination_loc, "Booking.pier") : ssrLooseEqual(unref(newOrder).destination_loc, "Booking.pier")) ? " selected" : ""}>水頭碼頭</option><option value="Booking.airport"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).destination_loc) ? ssrLooseContain(unref(newOrder).destination_loc, "Booking.airport") : ssrLooseEqual(unref(newOrder).destination_loc, "Booking.airport")) ? " selected" : ""}>尚義機場</option></select></td><td class="border p-2">`);
        _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(localeValues) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_time_picker, {
                type: "time",
                value: unref(newOrder).flightOrferry_time,
                "onUpdate:value": ($event) => unref(newOrder).flightOrferry_time = $event,
                class: "w-full",
                inputReadOnly: true,
                format: "HH:mm"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_time_picker, {
                  type: "time",
                  value: unref(newOrder).flightOrferry_time,
                  "onUpdate:value": ($event) => unref(newOrder).flightOrferry_time = $event,
                  class: "w-full",
                  inputReadOnly: true,
                  format: "HH:mm"
                }, null, 8, ["value", "onUpdate:value"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td><td class="border p-2">`);
        _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(localeValues) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_date_picker, {
                value: unref(newOrder).shuttle_date,
                "onUpdate:value": ($event) => unref(newOrder).shuttle_date = $event,
                class: "w-full",
                inputReadOnly: true,
                valueFormat: "YYYY-MM-DD"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_date_picker, {
                  value: unref(newOrder).shuttle_date,
                  "onUpdate:value": ($event) => unref(newOrder).shuttle_date = $event,
                  class: "w-full",
                  inputReadOnly: true,
                  valueFormat: "YYYY-MM-DD"
                }, null, 8, ["value", "onUpdate:value"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td><td class="border p-2">`);
        _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(localeValues) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_time_picker, {
                type: "time",
                value: unref(newOrder).shuttle_time,
                "onUpdate:value": ($event) => unref(newOrder).shuttle_time = $event,
                class: "w-full",
                inputReadOnly: true,
                format: "HH:mm"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_time_picker, {
                  type: "time",
                  value: unref(newOrder).shuttle_time,
                  "onUpdate:value": ($event) => unref(newOrder).shuttle_time = $event,
                  class: "w-full",
                  inputReadOnly: true,
                  format: "HH:mm"
                }, null, 8, ["value", "onUpdate:value"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td><td class="border p-2"><select class="w-full border rounded p-1 text-sm"><option value="notTraveled"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).status) ? ssrLooseContain(unref(newOrder).status, "notTraveled") : ssrLooseEqual(unref(newOrder).status, "notTraveled")) ? " selected" : ""}>未出行</option><option value="complete"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).status) ? ssrLooseContain(unref(newOrder).status, "complete") : ssrLooseEqual(unref(newOrder).status, "complete")) ? " selected" : ""}>完成</option></select></td><td class="border p-2"><input type="number"${ssrRenderAttr("value", unref(newOrder).adult_num)} class="w-full border rounded p-1 text-sm"></td><td class="border p-2"><input type="number"${ssrRenderAttr("value", unref(newOrder).child_num)} class="w-full border rounded p-1 text-sm"></td><td class="border p-2">${ssrInterpolate(unref(newOrder).adult_num + unref(newOrder).child_num)}</td><td class="border p-2"><select class="w-full border rounded p-1 text-sm"><option value="已付款"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).payment_status) ? ssrLooseContain(unref(newOrder).payment_status, "已付款") : ssrLooseEqual(unref(newOrder).payment_status, "已付款")) ? " selected" : ""}>已付款</option><option value="未付款"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).payment_status) ? ssrLooseContain(unref(newOrder).payment_status, "未付款") : ssrLooseEqual(unref(newOrder).payment_status, "未付款")) ? " selected" : ""}>未付款</option></select></td><td class="border p-2"><input type="number"${ssrRenderAttr("value", unref(newOrder).totalprice)} class="w-full border rounded p-1 text-sm"></td><td class="border p-2 px-2 whitespace-nowrap"><button class="text-white font-bold bg-red-500 px-4 py-1 rounded-lg"> 確認 </button><button class="text-gray-500 px-4 py-1 rounded">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "material-symbols-close-rounded",
          class: "text-gray-500 w-5 h-5"
        }, null, _parent));
        _push(`</button></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(filteredOrders).length === 0 && !showAddRow.value) {
        _push(`<tr><td${ssrRenderAttr("colspan", unref(headersToRender).length + (showDeleteColumn.value ? 1 : 0))} class="py-6 px-24 text-gray-400 text-lg md:text-lg"> 🚫 這一天沒有訂單 </td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(filteredOrders), (order, index) => {
        _push(`<tr class="text-center odd:bg-white even:bg-gray-50"><td class="${ssrRenderClass([index % 2 === 0 ? "bg-sky-50 " : "bg-gray-100", "border-b p-2 whitespace-nowrap text-sm md:text-md sticky left-0 z-10"])}">${ssrInterpolate(order.id)}</td><td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(`<input${ssrRenderAttr("value", order.contact)} class="border rounded p-1 text-sm">`);
        } else {
          _push(`<!--[-->${ssrInterpolate(order.contact)}<!--]-->`);
        }
        _push(`</td><td class="border-b py-4 px-12 whitespace-nowrap text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(`<input${ssrRenderAttr("value", order.phone)} class="border rounded p-1 text-sm">`);
        } else {
          _push(`<!--[-->${ssrInterpolate(order.phone)}<!--]-->`);
        }
        _push(`</td><td class="border-b py-4 px-8 text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(`<span><select class="border rounded p-1 text-sm"><option value="Booking.pier"${ssrIncludeBooleanAttr(Array.isArray(order.departure_loc) ? ssrLooseContain(order.departure_loc, "Booking.pier") : ssrLooseEqual(order.departure_loc, "Booking.pier")) ? " selected" : ""}>水頭碼頭</option><option value="Booking.airport"${ssrIncludeBooleanAttr(Array.isArray(order.departure_loc) ? ssrLooseContain(order.departure_loc, "Booking.airport") : ssrLooseEqual(order.departure_loc, "Booking.airport")) ? " selected" : ""}>尚義機場</option></select>`);
          _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(localeValues) }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_a_time_picker, {
                  type: "time",
                  value: order.arrival_time,
                  "onUpdate:value": ($event) => order.arrival_time = $event,
                  class: "w-full",
                  inputReadOnly: true,
                  format: "HH:mm"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_a_time_picker, {
                    type: "time",
                    value: order.arrival_time,
                    "onUpdate:value": ($event) => order.arrival_time = $event,
                    class: "w-full",
                    inputReadOnly: true,
                    format: "HH:mm"
                  }, null, 8, ["value", "onUpdate:value"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</span>`);
        } else {
          _push(`<span><p>${ssrInterpolate(unref(t)(order.display_departure))}</p><p>(${ssrInterpolate(order.arrivalpoint_time)})</p></span>`);
        }
        _push(`</td>`);
        if (sortBy.value === "Booking.airport") {
          _push(`<td class="border-b py-4 px-8 text-sm md:text-lg">`);
          if (isEditing.value) {
            _push(`<span><input${ssrRenderAttr("value", order.flight_loc)} class="border rounded p-1 text-sm"><input${ssrRenderAttr("value", order.flight_num)} class="border rounded p-1 text-sm"></span>`);
          } else {
            _push(`<span><p>${ssrInterpolate(order.flight_loc)}</p><p>${ssrInterpolate(order.flight_num)}</p></span>`);
          }
          _push(`</td>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<td class="border-b py-4 px-8 whitespace-nowrap text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(`<select class="border rounded p-1 text-sm"><option value="Booking.pier"${ssrIncludeBooleanAttr(Array.isArray(order.destination_loc) ? ssrLooseContain(order.destination_loc, "Booking.pier") : ssrLooseEqual(order.destination_loc, "Booking.pier")) ? " selected" : ""}>水頭碼頭</option><option value="Booking.airport"${ssrIncludeBooleanAttr(Array.isArray(order.destination_loc) ? ssrLooseContain(order.destination_loc, "Booking.airport") : ssrLooseEqual(order.destination_loc, "Booking.airport")) ? " selected" : ""}>尚義機場</option></select>`);
        } else {
          _push(`<span>${ssrInterpolate(unref(t)(order.display_destination))}</span>`);
        }
        _push(`</td><td class="border-b py-4 px-8 whitespace-nowrap text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(localeValues) }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_a_time_picker, {
                  type: "time",
                  value: order.ferry_time,
                  "onUpdate:value": ($event) => order.ferry_time = $event,
                  class: "w-full",
                  inputReadOnly: true,
                  format: "HH:mm"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_a_time_picker, {
                    type: "time",
                    value: order.ferry_time,
                    "onUpdate:value": ($event) => order.ferry_time = $event,
                    class: "w-full",
                    inputReadOnly: true,
                    format: "HH:mm"
                  }, null, 8, ["value", "onUpdate:value"])
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<!--[-->${ssrInterpolate(sortBy.value === "Booking.airport" ? order.ferry_time : order.flight_time)}<!--]-->`);
        }
        _push(`</td><td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(`<span>`);
          _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(localeValues) }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_a_date_picker, {
                  value: order.shuttle_date,
                  "onUpdate:value": ($event) => order.shuttle_date = $event,
                  inputReadOnly: true,
                  valueFormat: "YYYY-MM-DD"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_a_date_picker, {
                    value: order.shuttle_date,
                    "onUpdate:value": ($event) => order.shuttle_date = $event,
                    inputReadOnly: true,
                    valueFormat: "YYYY-MM-DD"
                  }, null, 8, ["value", "onUpdate:value"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</span>`);
        } else {
          _push(`<span>${ssrInterpolate(order.display_date)}</span>`);
        }
        _push(`</td><td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(localeValues) }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_a_time_picker, {
                  value: order.shuttle_time,
                  "onUpdate:value": ($event) => order.shuttle_time = $event,
                  inputReadOnly: true,
                  format: "HH:mm"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_a_time_picker, {
                    value: order.shuttle_time,
                    "onUpdate:value": ($event) => order.shuttle_time = $event,
                    inputReadOnly: true,
                    format: "HH:mm"
                  }, null, 8, ["value", "onUpdate:value"])
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<span>${ssrInterpolate(order.display_time)}</span>`);
        }
        _push(`</td><td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(`<select class="border rounded p-1 text-sm"><option value="notTraveled"${ssrIncludeBooleanAttr(Array.isArray(order.status) ? ssrLooseContain(order.status, "notTraveled") : ssrLooseEqual(order.status, "notTraveled")) ? " selected" : ""}>未出行</option><option value="complete"${ssrIncludeBooleanAttr(Array.isArray(order.status) ? ssrLooseContain(order.status, "complete") : ssrLooseEqual(order.status, "complete")) ? " selected" : ""}>完成</option></select>`);
        } else {
          _push(`<span class="${ssrRenderClass(statusClass(order.status))}">${ssrInterpolate(("TranslateStatus" in _ctx ? _ctx.TranslateStatus : unref(TranslateStatus))(order.status))}</span>`);
        }
        _push(`</td><td class="border-b py-4 px-2 whitespace-nowrap text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(`<input type="number"${ssrRenderAttr("value", order.adult_num)} class="border rounded p-1 text-sm">`);
        } else {
          _push(`<span>${ssrInterpolate(order.adult_num)}</span>`);
        }
        _push(`</td><td class="border-b py-4 px-2 whitespace-nowrap text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(`<input type="number"${ssrRenderAttr("value", order.child_num)} class="border rounded p-1 text-sm">`);
        } else {
          _push(`<span>${ssrInterpolate(order.child_num)}</span>`);
        }
        _push(`</td><td class="border-b py-4 px-4 whitespace-nowrap text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(`<span>${ssrInterpolate(order.adult_num + order.child_num)}</span>`);
        } else {
          _push(`<span>${ssrInterpolate(order.totalTickets)}</span>`);
        }
        _push(`</td><td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(`<select class="border rounded p-1 text-sm"><option value="已付款"${ssrIncludeBooleanAttr(Array.isArray(order.payment_status) ? ssrLooseContain(order.payment_status, "已付款") : ssrLooseEqual(order.payment_status, "已付款")) ? " selected" : ""}>已付款</option><option value="未付款"${ssrIncludeBooleanAttr(Array.isArray(order.payment_status) ? ssrLooseContain(order.payment_status, "未付款") : ssrLooseEqual(order.payment_status, "未付款")) ? " selected" : ""}>未付款</option></select>`);
        } else {
          _push(`<span>${ssrInterpolate(order.payment_status)}</span>`);
        }
        _push(`</td><td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">`);
        if (isEditing.value) {
          _push(`<input type="number"${ssrRenderAttr("value", order.totalprice)} class="border rounded p-1 text-sm">`);
        } else {
          _push(`<span>${ssrInterpolate(order.totalprice)}</span>`);
        }
        _push(`</td>`);
        if ((showDeleteColumn.value || isEditing.value) && !showAddRow.value) {
          _push(`<th class="border-b whitespace-nowrap">`);
          if (isEditing.value) {
            _push(`<button class="text-white font-bold bg-red-500 px-4 py-1 rounded-lg"> 確認 </button>`);
          } else {
            _push(`<button class="text-red-500 px-4 py-1 rounded">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:delete",
              class: "text-red-500 w-5 h-5"
            }, null, _parent));
            _push(`</button>`);
          }
          _push(`<button class="text-gray-500 px-4 py-1 rounded">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "material-symbols-close-rounded",
            class: "text-gray-500 w-5 h-5"
          }, null, _parent));
          _push(`</button></th>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tr>`);
      });
      _push(`<!--]--></tbody></table></div></div>`);
      _push(ssrRenderComponent(_component_BottomNavigator, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.vue.mjs.map
