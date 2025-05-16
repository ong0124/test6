import __nuxt_component_3 from './index2.mjs';
import { f as formatDate } from './formatDate.mjs';
import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { e as useI18n } from './server.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from '../_/index.mjs';
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
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "approveRefund",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const refunds = ref([]);
    ref([]);
    const currentFilter = ref("all");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$1;
      const _component_Icon = __nuxt_component_3;
      const _component_BottomNavigator = _sfc_main$2;
      _push(`<!--[--><div>`);
      _push(ssrRenderComponent(_component_Header, { title: "退款審核" }, null, _parent));
      _push(`</div><div class="flex justify-center mt-2 space-x-1"><div class="${ssrRenderClass([
        "flex items-center gap-2 px-4 py-1 border border-blue-300 rounded-md shadow-sm w-fit",
        unref(currentFilter) === "all" ? "bg-blue-500 text-white" : "bg-white text-blue-600"
      ])}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:border-all-rounded",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<p class="text-sm font-medium">全部</p></div><div class="${ssrRenderClass([
        "flex items-center gap-2 px-4 py-1 border border-blue-300 rounded-md shadow-sm w-fit",
        unref(currentFilter) === "null" ? "bg-blue-500 text-white" : "bg-white text-blue-600"
      ])}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mingcute:bill-fill",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<p class="text-sm font-medium">待批准的退款</p></div><div class="${ssrRenderClass([
        "flex items-center gap-2 px-4 py-1 border border-blue-300 rounded-md shadow-sm w-fit",
        unref(currentFilter) === "approved" ? "bg-blue-500 text-white" : "bg-white text-blue-600"
      ])}">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lets-icons:done-all-round",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`<p class="text-sm font-medium">已通过</p></div></div><div class="mb-20 bg-gray-50 pt-2 pb-2">`);
      if (unref(refunds).length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(refunds), (item, idx) => {
          _push(`<div class="bg-white border border-gray-400 mx-2 mb-4 rounded-lg shadow-sm"><div class="flex justify-between items-center px-3 py-2 border-b border-gray-200 bg-gray-50 rounded-t-lg"><div class="px-3 flex items-center justify-center bg-white text-gray-800 text-sm border border-gray-300"><p class="text-gray-500">訂單ID：</p><p>${ssrInterpolate(item.id)}</p></div><div class="flex items-center text-sm bg-gray-200 rounded-md px-2 py-1">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "material-symbols:order-approve",
            class: "w-4 h-4 mr-1 text-blue-500"
          }, null, _parent));
          _push(`<span class="mr-1">單號：</span><span>${ssrInterpolate(item.booking_id)}</span></div></div><div class="flex flex-col px-4 py-3 space-y-2 text-sm text-gray-800"><div class="flex"><span class="w-24 text-gray-400">申請账号：</span><span>${ssrInterpolate(item.fullname)}</span></div><div class="flex"><span class="w-24 text-gray-400">申请时间：</span><span>${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(item.created_at))}</span></div><div class="flex"><span class="w-24 text-gray-400">旅程：</span><span class="flex-1 flex justify-between"><span>${ssrInterpolate(unref(t)(`${item.departure_loc}`))}</span><span>to</span><span>${ssrInterpolate(unref(t)(`${item.destination_loc}`))}</span></span></div><div class="flex"><span class="w-24 text-gray-400">出車時間：</span><span>${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(item.shuttle_date))} ${ssrInterpolate(item.shuttle_time)}</span></div></div><div class="flex items-center justify-between px-2 py-3 border-t border-gray-200 bg-gray-50 rounded-b-lg"><div class="flex items-center font-medium text-sm"><span class="text-xl text-red-500">*</span><span class="ml-1 text-gray-500">退款金額：</span><span class="text-gray-500">NT$</span><span class="ml-1 text-lg text-red-500">${ssrInterpolate(item.refund_amount)}</span></div><div class="flex space-x-2"><button class="rounded border text-red-400 border-red-500 hover:bg-red-400 hover:text-white px-3 py-1 text-sm transition"> 拒絕退款 </button><button class="rounded bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm transition"> 同意退款 </button></div></div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="text-center text-gray-400 py-10">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:outline-inbox",
          class: "w-10 h-10 mx-auto mb-2"
        }, null, _parent));
        _push(`<p class="text-sm">暫時沒有退款訂單</p></div>`);
      }
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_BottomNavigator, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/approveRefund.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=approveRefund.vue.mjs.map
