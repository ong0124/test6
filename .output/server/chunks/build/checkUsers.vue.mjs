import __nuxt_component_3 from './index2.mjs';
import { _ as _sfc_main$3 } from './PopMenu.vue.mjs';
import { a as formatDate } from './formatDate.mjs';
import { defineComponent, reactive, watch, mergeProps, unref, withCtx, createVNode, ref, computed, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { d as dayjs, _ as _sfc_main$2, a as _sfc_main$4 } from '../_/index.mjs';
import { C as ConfigProvider, l as localeValues, D as DatePicker$1 } from './dayjs.mjs';
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
import '@vueuse/core';
import '@babel/runtime/helpers/esm/extends';
import '@babel/runtime/helpers/esm/objectSpread2';
import '@ctrl/tinycolor';
import '@ant-design/colors';
import 'stylis';
import 'vue-types';
import 'lodash-es';
import 'dom-align';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UserPopup",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    isEdit: { type: Boolean }
  },
  emits: ["update:modelValue", "submit", "submitted"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const form = reactive({
      id: "",
      lineName: "",
      birthday: void 0
    });
    const setFormData = (data) => {
      console.log("Incoming data:", data);
      form.id = data.id ?? "";
      form.lineName = data.full_name ?? "";
      form.birthday = data.birthday ? dayjs(data.birthday) : void 0;
    };
    watch(() => props.modelValue, (visible) => {
      if (visible && !props.isEdit) {
        resetForm();
      }
    });
    const resetForm = () => {
      form.id = "";
      form.lineName = "";
      form.birthday = void 0;
    };
    __expose({
      setFormData
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_a_config_provider = ConfigProvider;
      const _component_a_date_picker = DatePicker$1;
      if (_ctx.modelValue) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" }, _attrs))}><div class="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg"><h2 class="text-xl font-bold mb-4 text-center">${ssrInterpolate(_ctx.isEdit ? "編輯用戶" : "新增用戶")}</h2><div class="mb-4"><div class="mb-1 text-sm text-gray-700">用戶編號：</div>`);
        if (_ctx.isEdit) {
          _push(`<div class="w-full border px-3 py-2 rounded bg-gray-100">${ssrInterpolate(form.id)}</div>`);
        } else {
          _push(`<input${ssrRenderAttr("value", form.id)} type="number" class="w-full border px-3 py-2 rounded">`);
        }
        _push(`</div><div class="mb-4"><div class="mb-1 text-sm text-gray-700">LINE名字：</div><input${ssrRenderAttr("value", form.lineName)} type="text" class="w-full border px-3 py-2 rounded"></div><div class="mb-4 flex items-center"><div class="mb-1 text-sm text-gray-700 pr-6">生日：</div>`);
        _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(localeValues) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_date_picker, {
                value: form.birthday,
                "onUpdate:value": ($event) => form.birthday = $event
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_date_picker, {
                  value: form.birthday,
                  "onUpdate:value": ($event) => form.birthday = $event
                }, null, 8, ["value", "onUpdate:value"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex justify-end space-x-2"><button class="px-4 py-2 bg-gray-300 rounded">取消</button><button class="px-4 py-2 bg-amber-500 text-white rounded">${ssrInterpolate(_ctx.isEdit ? "更新" : "提交")}</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkUsers",
  __ssrInlineRender: true,
  setup(__props) {
    const Users = ref([]);
    const data = ref([]);
    const fetchData = async () => {
      try {
        const result = await $fetch("/api/GetUser");
        data.value = result.data;
        Users.value = data.value.map((Users2) => ({
          id: Users2.id,
          full_name: Users2.full_name,
          birthday: Users2.birthday,
          created_at: Users2.created_at
        }));
      } catch {
        alert("Fetch error");
      }
    };
    const menuItems = ref([
      { label: "修改", action: "edit", icon: "ooui:recent-changes-ltr" },
      { label: "刪除", action: "delete", icon: "mdi:delete" },
      { label: "添加", action: "add", icon: "mdi:plus" }
    ]);
    const showExtendColumn = ref(false);
    const showPopup = ref(false);
    const isEdit = ref(false);
    const currentAction = ref("");
    const selectedUser = ref(null);
    const popupRef = ref();
    const handleItemSelected = (action, user) => {
      currentAction.value = action;
      selectedUser.value = user ?? null;
      if (action === "edit") {
        showExtendColumn.value = true;
        nextTick(() => {
          var _a;
          (_a = popupRef.value) == null ? void 0 : _a.setFormData(user);
        });
      } else if (action === "delete") {
        showExtendColumn.value = true;
      } else if (action === "add") {
        isEdit.value = false;
        showPopup.value = true;
      }
    };
    const handleSubmit = (data2) => {
      console.log("提交的資料:", data2);
    };
    const searchQuery = ref("");
    const filteredUsers = computed(() => {
      const keyword = searchQuery.value.toLowerCase();
      return Users.value.filter(
        (user) => Object.values(user).some(
          (value) => String(value).toLowerCase().includes(keyword)
        )
      );
    });
    const IconHandle = async (item) => {
      if (currentAction.value === "edit") {
        isEdit.value = true;
        showPopup.value = true;
        selectedUser.value = item;
        console.log("Data:" + JSON.stringify(item));
        nextTick(() => {
          var _a;
          (_a = popupRef.value) == null ? void 0 : _a.setFormData(item);
        });
      } else if (currentAction.value === "delete") {
        const confirmDelete = confirm("你確定要刪除此用戶嗎？");
        if (!confirmDelete) return;
        try {
          const response = await $fetch("/api/DeleteUser", {
            method: "DELETE",
            body: { id: item.id }
          });
          if (response) {
            await fetchData();
          } else {
            alert("Post Failed: No valid response");
          }
        } catch {
          alert("Delete error");
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = _sfc_main$2;
      const _component_Icon = __nuxt_component_3;
      const _component_PopMenu = _sfc_main$3;
      const _component_UserPopup = _sfc_main$1;
      const _component_BottomNavigator = _sfc_main$4;
      _push(`<!--[--><div>`);
      _push(ssrRenderComponent(_component_Header, { title: "查看用戶" }, null, _parent));
      _push(`</div><div class="flex justify-evenly items-center"><div class="flex items-center border-2 border-blue-500 rounded-md w-2/3 my-2 ml-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols-search-rounded",
        class: "h-5 w-5 text-gray-500 mx-2"
      }, null, _parent));
      _push(`<input${ssrRenderAttr("value", searchQuery.value)} type="text" class="py-1 w-full rounded-md focus:ring-0 focus:border-transparent border-none outline-none" placeholder="搜索訂單"></div>`);
      _push(ssrRenderComponent(_component_PopMenu, {
        items: menuItems.value,
        onItemSelected: handleItemSelected,
        class: "z-20"
      }, null, _parent));
      _push(`</div><div class="flex flex-col mb-20"><div class="grid grid-cols-[80px_1fr_1fr_1fr_60px] bg-gray-100 font-semibold text-sm text-gray-700 py-3 border-b border-gray-300 items-center"><div class="text-center">用戶編號</div><div class="text-center">LINE 名字</div><div class="text-center">加入時間</div><div class="text-center">出生日期</div><div class="flex justify-center">`);
      _push(ssrRenderComponent(_component_Icon, { name: "tdesign:setting-filled" }, null, _parent));
      _push(`</div></div><!--[-->`);
      ssrRenderList(unref(filteredUsers), (item, index) => {
        _push(`<div class="grid grid-cols-[80px_1fr_1fr_1fr_60px] text-center text-sm py-3 border-b border-gray-300 items-center"><div>${ssrInterpolate(item.id)}</div><div>${ssrInterpolate(item.full_name)}</div><div class="bg-gray-100">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(item.created_at))}</div><div>${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(item.birthday))}</div>`);
        if (showExtendColumn.value) {
          _push(`<div class="text-red-500 px-4 rounded ml-2r">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: currentAction.value === "edit" ? "ooui:recent-changes-ltr" : "streamline:file-delete-alternate-solid",
            class: currentAction.value === "edit" ? "text-blue-500 cursor-pointer" : "text-red-500 cursor-pointer",
            onClick: ($event) => IconHandle(item)
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
      _push(ssrRenderComponent(_component_UserPopup, {
        ref_key: "popupRef",
        ref: popupRef,
        modelValue: showPopup.value,
        "onUpdate:modelValue": ($event) => showPopup.value = $event,
        isEdit: isEdit.value,
        onSubmit: handleSubmit,
        onSubmitted: fetchData
      }, null, _parent));
      _push(`<div>`);
      _push(ssrRenderComponent(_component_BottomNavigator, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkUsers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=checkUsers.vue.mjs.map
