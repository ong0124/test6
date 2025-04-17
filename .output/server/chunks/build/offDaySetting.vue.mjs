import { f as formatDate } from './formatDate.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { m as ConfigProvider, k as localeValues, D as DatePicker$1 } from './dayjs.mjs';
import { _ as _sfc_main$1, a as _sfc_main$2 } from '../_/index.mjs';
import '@babel/runtime/helpers/esm/extends';
import '@babel/runtime/helpers/esm/objectSpread2';
import '@ctrl/tinycolor';
import '@ant-design/colors';
import 'stylis';
import 'vue-types';
import 'lodash-es';
import 'dom-align';
import './index2.mjs';
import '@iconify/utils/lib/css/icon';
import '@iconify/vue';
import './server.mjs';
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
import 'pinia';
import 'vue-router';
import './v3.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "offDaySetting",
  __ssrInlineRender: true,
  setup(__props) {
    const startOffDate = ref();
    const endOffDate = ref();
    const offDays = ref([]);
    ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$1;
      const _component_a_config_provider = ConfigProvider;
      const _component_a_date_picker = DatePicker$1;
      const _component_BottomNavigator = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Header, { title: "休假設定" }, null, _parent));
      _push(`<div class="flex flex-col"><div class="mx-5 my-2 p-4 rounded-2xl border-blue-500 border-2"><div class="flex justify-center bg-gray-200 bg-opacity-80 border shadow-sm p-1 mb-1"><p class="font-semibold text-lg">添加休假日</p></div><div class="flex items-center justify-center gap-6 pb-4 mt-2">`);
      _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(localeValues) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-center"${_scopeId}><p class="mb-1 text-sm font-semibold"${_scopeId}>開始時間</p>`);
            _push2(ssrRenderComponent(_component_a_date_picker, {
              value: startOffDate.value,
              "onUpdate:value": ($event) => startOffDate.value = $event
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex flex-col items-center"${_scopeId}><p class="mb-1 text-sm font-semibold"${_scopeId}>結束時間</p>`);
            _push2(ssrRenderComponent(_component_a_date_picker, {
              value: endOffDate.value,
              "onUpdate:value": ($event) => endOffDate.value = $event
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-center" }, [
                createVNode("p", { class: "mb-1 text-sm font-semibold" }, "開始時間"),
                createVNode(_component_a_date_picker, {
                  value: startOffDate.value,
                  "onUpdate:value": ($event) => startOffDate.value = $event
                }, null, 8, ["value", "onUpdate:value"])
              ]),
              createVNode("div", { class: "flex flex-col items-center" }, [
                createVNode("p", { class: "mb-1 text-sm font-semibold" }, "結束時間"),
                createVNode(_component_a_date_picker, {
                  value: endOffDate.value,
                  "onUpdate:value": ($event) => endOffDate.value = $event
                }, null, 8, ["value", "onUpdate:value"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex justify-center"><button class="rounded-lg px-8 py-1 text-white text-sm bg-blue-500 hover:bg-blue-600"> 提交 </button></div></div><div class="flex flex-col pl-2 mb-20"><div class="flex justify-center items-center gap-2 mb-2 mx-6 bg-white border border-gray-500 rounded-md shadow-sm"><p class="text-gray-500"> 已设置的休假日期 </p></div><div class="grid grid-cols-[40px_4fr_4fr_2fr_80px] bg-gray-100 font-bold py-2 text-center text-gray-700 text-sm border-b border-gray-300"><div>序號</div><div>開始時間</div><div>結束時間</div><div>創建人</div><div>操作</div></div><!--[-->`);
      ssrRenderList(offDays.value, (item, index) => {
        _push(`<div class="grid grid-cols-[40px_4fr_4fr_2fr_80px] text-center py-2 border-b border-gray-300 items-center text-sm"><div>${ssrInterpolate(item.id)}</div><div class="">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(item.startOffDays))}</div><div class="bg-gray-100">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(item.endOffDays))}</div><div>${ssrInterpolate(item.create_by)}</div><div><button class="px-3 py-1 text-red-500 border font-medium border-red-500 hover:bg-red-500 hover:text-white rounded-sm"> 刪除 </button></div></div>`);
      });
      _push(`<!--]--></div></div>`);
      _push(ssrRenderComponent(_component_BottomNavigator, null, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/offDaySetting.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=offDaySetting.vue.mjs.map
