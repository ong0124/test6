import __nuxt_component_3 from './index2.mjs';
import { _ as _sfc_main$2 } from './PopMenu.vue.mjs';
import { f as formatDate } from './formatDate.mjs';
import { defineComponent, ref, computed, watch, reactive, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { d as dayjs, _ as _sfc_main$1, a as _sfc_main$3 } from '../_/index.mjs';
import { C as ConfigProvider, l as localeValues, D as DatePicker$1 } from './dayjs.mjs';
import ExcelJS from 'exceljs';
import FileSaver from 'file-saver';
import { e as useI18n } from './server.mjs';
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
import 'node:path';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';
import '@vueuse/core';
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
    useRouter();
    const DateSelected = ref(dayjs());
    const FileNameDate = DateSelected.value.format("YYYY年MM月DD日");
    const getExportData = () => {
      const headers = tableHeaders;
      const data2 = filteredOrders.value.map((order) => [
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
      doc.text(`訂單詳情（${FileNameDate}）`, 14, 10);
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
      const { utils, writeFile } = await import('../_/xlsx.mjs').then(function (n) { return n.x; });
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
      "時間",
      "狀態",
      "成人票(人)",
      "兒童票(人)",
      "全票數",
      "是否付款",
      "總價格"
    ];
    const statusClass = (status) => ({
      "text-black font-bold bg-green-400 px-4 py-1 rounded-2xl": status === "complete",
      "text-white font-bold bg-red-400 px-2 py-1 rounded-2xl": status === "notTraveled"
    });
    const date = DateSelected.value.format("YYYY-MM-DD");
    const orders = ref([]);
    const data = ref([]);
    const sortBy = ref("departure_loc");
    const fetchData = async (sortField = "departure_loc") => {
      try {
        const result = await $fetch("/api/GETbooking", {
          query: {
            // 使用 query 而不是 params
            sortBy: sortField,
            date: DateSelected.value.format("YYYY-MM-DD")
          }
        });
        console.log("📤 發送查詢:", { sortBy: sortField, date });
        data.value = result.data;
        console.log("🚚 抓回的 data:", data.value);
        orders.value = data.value.map((booking) => ({
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
        console.error("Fetch error:", error);
        alert("網絡卡頓，無法獲取數據，請重新進入網站");
      }
    };
    watch(DateSelected, () => {
      console.log("選擇日期:", DateSelected);
      fetchData(sortBy.value);
    });
    const scrollContainer = ref(null);
    const showDeleteColumn = ref(false);
    const showAddRow = ref(false);
    const handleItemSelected = async (action) => {
      console.log("選擇的動作:", action);
      if (action === "print") {
        generatePDF();
      } else if (action === "excel") {
        generateExcel();
      } else if (action === "delete") {
        showDeleteColumn.value = true;
        if (scrollContainer.value) {
          scrollContainer.value.scrollTo({
            left: scrollContainer.value.scrollWidth,
            behavior: "smooth"
          });
        }
      } else if (action === "add") {
        showAddRow.value = true;
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
      payment_status: "unpaid",
      totalprice: 0
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
      _push(`</div><div class="flex flex-col ml-2 mb-16"><div class="overflow-x-auto pb-4"><table class="table-fixed min-w-full mr-12"><thead><tr class="bg-gray-100"><th class="p-4 text-sm md:text-lg sticky left-0 bg-indigo-200 whitespace-nowrap">訂單ID</th><!--[-->`);
      ssrRenderList(tableHeaders.slice(1), (header, index) => {
        _push(`<th class="p-4 text-sm md:text-sm bg-indigo-100 whitespace-nowrap"><span class="inline-flex items-center gap-1">${ssrInterpolate(header)} `);
        if (header === "時間") {
          _push(ssrRenderComponent(_component_Icon, {
            name: sortBy.value === "shuttle_time" ? "mdi:arrow-up" : "mdi:arrow-down",
            class: [
              "w-5 h-5 transition-colors duration-200",
              sortBy.value === "shuttle_time" ? "text-gray-600" : "text-amber-500"
            ]
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (header === "上車地點") {
          _push(ssrRenderComponent(_component_Icon, {
            name: sortBy.value === "departure_loc" ? "mdi:arrow-up" : "mdi:arrow-down",
            class: [
              "w-5 h-5 transition-colors duration-200",
              sortBy.value === "departure_loc" ? "text-gray-600" : "text-amber-500"
            ]
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</span></th>`);
      });
      _push(`<!--]-->`);
      if (showDeleteColumn.value || showAddRow.value) {
        _push(`<th class="whitespace-nowrap p-2 px-4 text-sm md:text-sm bg-indigo-100"> 操作 </th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr></thead><tbody>`);
      if (showAddRow.value) {
        _push(`<tr class="bg-yellow-50 text-center"><td class="border p-2">-</td><td class="border p-2"><input${ssrRenderAttr("value", unref(newOrder).contact)} class="w-full border rounded p-1 text-sm"></td><td class="border p-2"><input${ssrRenderAttr("value", unref(newOrder).phone)} class="w-full border rounded p-1 text-sm"></td><td class="border p-2"><select class="w-full border rounded p-1 text-sm"><option value="Booking.pier"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).departure_loc) ? ssrLooseContain(unref(newOrder).departure_loc, "Booking.pier") : ssrLooseEqual(unref(newOrder).departure_loc, "Booking.pier")) ? " selected" : ""}>水頭碼頭</option><option value="Booking.airport"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).departure_loc) ? ssrLooseContain(unref(newOrder).departure_loc, "Booking.airport") : ssrLooseEqual(unref(newOrder).departure_loc, "Booking.airport")) ? " selected" : ""}>尚義機場</option></select></td><td class="border p-2"><select class="w-full border rounded p-1 text-sm"><option value="Booking.pier"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).destination_loc) ? ssrLooseContain(unref(newOrder).destination_loc, "Booking.pier") : ssrLooseEqual(unref(newOrder).destination_loc, "Booking.pier")) ? " selected" : ""}>水頭碼頭</option><option value="Booking.airport"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).destination_loc) ? ssrLooseContain(unref(newOrder).destination_loc, "Booking.airport") : ssrLooseEqual(unref(newOrder).destination_loc, "Booking.airport")) ? " selected" : ""}>尚義機場</option></select></td><td class="border p-2">`);
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
        _push(`</td><td class="border p-2"><select class="w-full border rounded p-1 text-sm"><option value="notTraveled"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).status) ? ssrLooseContain(unref(newOrder).status, "notTraveled") : ssrLooseEqual(unref(newOrder).status, "notTraveled")) ? " selected" : ""}>未出行</option><option value="complete"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).status) ? ssrLooseContain(unref(newOrder).status, "complete") : ssrLooseEqual(unref(newOrder).status, "complete")) ? " selected" : ""}>完成</option></select></td><td class="border p-2"><input type="number"${ssrRenderAttr("value", unref(newOrder).adult_num)} class="w-full border rounded p-1 text-sm"></td><td class="border p-2"><input type="number"${ssrRenderAttr("value", unref(newOrder).child_num)} class="w-full border rounded p-1 text-sm"></td><td class="border p-2">${ssrInterpolate(unref(newOrder).adult_num + unref(newOrder).child_num)}</td><td class="border p-2"><select class="w-full border rounded p-1 text-sm"><option value="已付款"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).payment_status) ? ssrLooseContain(unref(newOrder).payment_status, "已付款") : ssrLooseEqual(unref(newOrder).payment_status, "已付款")) ? " selected" : ""}>已付款</option><option value="未付款"${ssrIncludeBooleanAttr(Array.isArray(unref(newOrder).payment_status) ? ssrLooseContain(unref(newOrder).payment_status, "未付款") : ssrLooseEqual(unref(newOrder).payment_status, "未付款")) ? " selected" : ""}>未付款</option></select></td><td class="border p-2"><input type="number"${ssrRenderAttr("value", unref(newOrder).totalprice)} class="w-full border rounded p-1 text-sm"></td><td class="border p-2 px-2 whitespace-nowrap"><button class="text-white font-bold bg-red-500 px-4 py-1 rounded-lg"> 確認 </button></td></tr>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(filteredOrders).length === 0 && !showAddRow.value) {
        _push(`<tr><td${ssrRenderAttr("colspan", tableHeaders.length + (showDeleteColumn.value ? 1 : 0))} class="py-6 px-24 text-gray-400 text-lg md:text-lg"> 🚫 這一天沒有訂單 </td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(filteredOrders), (order, index) => {
        _push(`<tr class="text-center odd:bg-white even:bg-gray-50"><td class="${ssrRenderClass([index % 2 === 0 ? "bg-sky-50 " : "bg-gray-100", "border-b p-2 whitespace-nowrap text-sm md:text-md sticky left-0 z-10"])}">${ssrInterpolate(order.id)}</td><td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">${ssrInterpolate(order.contact)}</td><td class="border-b py-4 px-12 whitespace-nowrap text-sm md:text-lg">${ssrInterpolate(order.phone)}</td><td class="border-b py-4 px-8 whitespace-nowrap text-sm md:text-lg">${ssrInterpolate(unref(t)(`${order.departure_loc}`))}</td><td class="border-b py-4 px-8 whitespace-nowrap text-sm md:text-lg">${ssrInterpolate(unref(t)(`${order.destination_loc}`))}</td><td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(order.shuttle_date))}</td><td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">${ssrInterpolate(order.shuttle_time)}</td><td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg"><span class="${ssrRenderClass(statusClass(order.status))}">${ssrInterpolate(("TranslateStatus" in _ctx ? _ctx.TranslateStatus : unref(TranslateStatus))(order.status))}</span></td><td class="border-b py-4 px-2 whitespace-nowrap text-sm md:text-lg">${ssrInterpolate(order.adult_num)}</td><td class="border-b py-4 px-2 whitespace-nowrap text-sm md:text-lg">${ssrInterpolate(order.child_num)}</td><td class="border-b py-4 px-4 whitespace-nowrap text-sm md:text-lg">${ssrInterpolate(order.totalTickets)}</td><td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">${ssrInterpolate(order.payment_status)}</td><td class="border-b py-4 px-6 whitespace-nowrap text-sm md:text-lg">${ssrInterpolate(order.totalprice)}</td>`);
        if (showDeleteColumn.value) {
          _push(`<th class="border-b">`);
          if (showDeleteColumn.value && !showAddRow.value) {
            _push(`<button class="text-red-500 px-4 py-1 rounded">`);
            _push(ssrRenderComponent(_component_Icon, {
              name: "mdi:delete",
              class: "text-red-500 w-5 h-5"
            }, null, _parent));
            _push(`</button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</th>`);
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
