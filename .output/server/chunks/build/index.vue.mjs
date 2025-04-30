import __nuxt_component_1 from './index2.mjs';
import { _ as _sfc_main$2 } from './PopMenu.vue.mjs';
import { f as formatDate } from './formatDate.mjs';
import { defineComponent, ref, computed, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { e as useI18n } from './server.mjs';
import { _ as _sfc_main$1, a as _sfc_main$3 } from '../_/index.mjs';
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
    const router = useRouter();
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
      doc.text("訂單詳情", 14, 10);
      const headers = [tableHeaders];
      const data2 = filteredOrders.value.map((order) => [
        order.id,
        order.contact,
        order.phone,
        t(`${order.departure_loc}`),
        t(`${order.destination_loc}`),
        formatDate(order.shuttle_date),
        order.shuttle_time,
        order.status,
        order.adult_num,
        order.child_num,
        order.totalTickets,
        order.totalprice,
        order.payment_status
      ]);
      autoTable(doc, {
        head: headers,
        body: data2,
        startY: 20,
        // 表格起始位置
        styles: { fontSize: 10, font: "SourceHanSans-Normal" },
        // 使用指定字体
        headStyles: { font: "SourceHanSans-Normal", fontStyle: "normal", fillColor: [22, 160, 133] },
        alternateRowStyles: { fillColor: [240, 240, 240] }
      });
      doc.save("訂單詳情.pdf");
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
      "text-green-600 font-bold": status === "已完成",
      "text-red-600 font-bold": status === "未出行",
      "text-yellow-600 font-bold": status === "处理中"
    });
    const orders = ref([]);
    const data = ref([]);
    const sortBy = ref("departure_loc");
    const fetchData = async (sortField = "departure_loc") => {
      try {
        const result = await $fetch("/api/GETbooking", {
          query: {
            // 使用 query 而不是 params
            sortBy: sortField
          }
        });
        data.value = result.data;
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
        alert("獲取數據失敗");
      }
    };
    const scrollContainer = ref(null);
    const showDeleteColumn = ref(false);
    const handleItemSelected = async (action) => {
      console.log("選擇的動作:", action);
      if (action === "print") {
        generatePDF();
      } else if (action === "delete") {
        showDeleteColumn.value = true;
        if (scrollContainer.value) {
          scrollContainer.value.scrollTo({
            left: scrollContainer.value.scrollWidth,
            behavior: "smooth"
          });
        }
      } else if (action === "add") {
        router.push("/addOrders");
      } else if (action === "timeAsc") {
        sortBy.value = "shuttle_time";
        await fetchData(sortBy.value);
      } else if (action === "locAsc") {
        sortBy.value = "departure_loc";
        await fetchData(sortBy.value);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$1;
      const _component_Icon = __nuxt_component_1;
      const _component_PopMenu = _sfc_main$2;
      const _component_BottomNavigator = _sfc_main$3;
      _push(`<!--[--><div>`);
      _push(ssrRenderComponent(_component_Header, null, null, _parent));
      _push(`</div><div><div class="flex justify-evenly items-center"><div class="flex items-center border-2 border-blue-500 rounded-md w-2/3 my-2 ml-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols-search-rounded",
        class: "h-5 w-5 text-gray-500 mx-2"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" class="py-1 w-full rounded-md focus:ring-0 focus:border-transparent border-none outline-none" placeholder="搜索訂單"></div>`);
      _push(ssrRenderComponent(_component_PopMenu, {
        onItemSelected: handleItemSelected,
        class: "z-20"
      }, null, _parent));
      _push(`</div><div class="flex flex-col ml-2 mb-16"><div class="overflow-x-auto w-full pb-4"><table class="table-fixed min-w-full border-collapse border mr-12"><thead><tr class="bg-gray-100"><th class="border p-2 text-xs md:text-sm sticky left-0 bg-indigo-50">訂單ID</th><!--[-->`);
      ssrRenderList(tableHeaders.slice(1), (header, index) => {
        _push(`<th class="border p-2 text-xs md:text-sm bg-indigo-50">${ssrInterpolate(header)}</th>`);
      });
      _push(`<!--]-->`);
      if (showDeleteColumn.value) {
        _push(`<th class="border p-2 text-xs md:text-sm bg-indigo-50"> 操作 </th>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tr></thead><tbody><!--[-->`);
      ssrRenderList(unref(filteredOrders), (order, index) => {
        _push(`<tr class="border-b text-center"><td class="border p-2 text-xs md:text-md sticky left-0 bg-gray-50 z-10">${ssrInterpolate(order.id)}</td><td class="border p-2 text-xs md:text-sm">${ssrInterpolate(order.contact)}</td><td class="border p-2 text-xs md:text-sm">${ssrInterpolate(order.phone)}</td><td class="border p-2 text-xs md:text-sm">${ssrInterpolate(unref(t)(`${order.departure_loc}`))}</td><td class="border p-2 text-xs md:text-sm">${ssrInterpolate(unref(t)(`${order.destination_loc}`))}</td><td class="border p-2 text-xs md:text-sm">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(order.shuttle_date))}</td><td class="border p-2 text-xs md:text-sm">${ssrInterpolate(order.shuttle_time)}</td><td class="border p-2 text-xs md:text-sm"><span class="${ssrRenderClass(statusClass(order.status))}">${ssrInterpolate(("TranslateStatus" in _ctx ? _ctx.TranslateStatus : unref(TranslateStatus))(order.status))}</span></td><td class="border p-2 text-xs md:text-sm">${ssrInterpolate(order.adult_num)}</td><td class="border p-2 text-xs md:text-sm">${ssrInterpolate(order.child_num)}</td><td class="border p-2 text-xs md:text-sm">${ssrInterpolate(order.totalTickets)}</td><td class="border p-2 text-xs md:text-sm">${ssrInterpolate(order.payment_status)}</td><td class="border p-2 text-xs md:text-sm">${ssrInterpolate(order.totalprice)}</td>`);
        if (showDeleteColumn.value) {
          _push(`<th>`);
          if (showDeleteColumn.value) {
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
