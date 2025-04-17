import __nuxt_component_1 from './index2.mjs';
import { ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { onClickOutside } from '@vueuse/core';

const _sfc_main = {
  __name: "PopMenu",
  __ssrInlineRender: true,
  props: {
    buttonText: {
      type: String,
      default: "選單"
    },
    buttonIcon: {
      type: String,
      default: ""
      // 可選的按鈕圖標
    },
    items: {
      type: Array,
      default: () => [
        { label: "打印", action: "print", icon: "mdi:printer" },
        { label: "刪除", action: "delete", icon: "mdi:delete" },
        { label: "添加", action: "add", icon: "mdi:plus" }
      ]
    },
    position: {
      type: String,
      default: "right-0"
    }
  },
  emits: ["itemSelected"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isOpen = ref(false);
    const menuRef = ref(null);
    const menuPosition = ref(`absolute ${props.position} mt-2`);
    onClickOutside(menuRef, () => {
      isOpen.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative inline-block text-left",
        ref_key: "menuRef",
        ref: menuRef
      }, _attrs))}><div class="px-4 py-1 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 flex items-center gap-2 cursor-pointer">`);
      if (__props.buttonIcon) {
        _push(`<img${ssrRenderAttr("src", __props.buttonIcon)} alt="menu icon" class="w-5 h-5">`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(__props.buttonText)} `);
      _push(ssrRenderComponent(_component_Icon, {
        name: "mdi:chevron-down",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</div>`);
      if (isOpen.value) {
        _push(`<div class="${ssrRenderClass([menuPosition.value, "absolute mt-2 w-48 bg-white border rounded-sm shadow-lg"])}"><ul class="py-2 text-gray-700"><!--[-->`);
        ssrRenderList(__props.items, (item, index) => {
          _push(`<li><a href="#" class="flex items-center px-4 py-2 hover:bg-gray-100 gap-2">`);
          if (item.icon) {
            _push(ssrRenderComponent(_component_Icon, {
              name: item.icon,
              class: "w-5 h-5"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(` ${ssrInterpolate(item.label)}</a></li>`);
        });
        _push(`<!--]--></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PopMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=PopMenu.vue.mjs.map
