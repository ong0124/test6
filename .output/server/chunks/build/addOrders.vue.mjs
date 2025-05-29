import { shallowRef, defineComponent, computed, ref, watch, createVNode, Fragment, resolveComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { e as useI18n, f as useLocalePath, n as navigateTo, _ as _export_sfc } from './server.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderClass } from 'vue/server-renderer';
import { d as dayjs, _ as _sfc_main$2, a as _sfc_main$3 } from '../_/index.mjs';
import __nuxt_component_3 from './index2.mjs';
import _extends from '@babel/runtime/helpers/esm/extends';
import { b as booleanType, P as PropTypes, u as useConfigInject, a as useStyle, c as classNames, f as filterEmpty, t as tuple, d as Compact, e as localeValues$1, l as localeValues$2, C as ConfigProvider, D as DatePicker$1, B as Button, g as api, h as api$1 } from './dayjs.mjs';
import { defineStore } from 'pinia';
import _objectSpread from '@babel/runtime/helpers/esm/objectSpread2';
import { T as TimePicker$1 } from './dayjs2.mjs';
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
import 'vue-router';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import './v3.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'unhead/utils';
import 'devalue';
import 'unhead/plugins';
import '@ctrl/tinycolor';
import '@ant-design/colors';
import 'stylis';
import 'vue-types';
import 'lodash-es';
import 'dom-align';

const Pagination = {
  // Options.jsx
  items_per_page: "条/页",
  jump_to: "跳至",
  jump_to_confirm: "确定",
  page: "页",
  // Pagination.jsx
  prev_page: "上一页",
  next_page: "下一页",
  prev_5: "向前 5 页",
  next_5: "向后 5 页",
  prev_3: "向前 3 页",
  next_3: "向后 3 页"
};

const locale$2 = {
  locale: "zh_CN",
  today: "今天",
  now: "此刻",
  backToToday: "返回今天",
  ok: "确定",
  timeSelect: "选择时间",
  dateSelect: "选择日期",
  weekSelect: "选择周",
  clear: "清除",
  month: "月",
  year: "年",
  previousMonth: "上个月 (翻页上键)",
  nextMonth: "下个月 (翻页下键)",
  monthSelect: "选择月份",
  yearSelect: "选择年份",
  decadeSelect: "选择年代",
  yearFormat: "YYYY年",
  dayFormat: "D日",
  dateFormat: "YYYY年M月D日",
  dateTimeFormat: "YYYY年M月D日 HH时mm分ss秒",
  previousYear: "上一年 (Control键加左方向键)",
  nextYear: "下一年 (Control键加右方向键)",
  previousDecade: "上一年代",
  nextDecade: "下一年代",
  previousCentury: "上一世纪",
  nextCentury: "下一世纪"
};

const locale$1 = {
  placeholder: "请选择时间",
  rangePlaceholder: ["开始时间", "结束时间"]
};

const locale = {
  lang: _extends({
    placeholder: "请选择日期",
    yearPlaceholder: "请选择年份",
    quarterPlaceholder: "请选择季度",
    monthPlaceholder: "请选择月份",
    weekPlaceholder: "请选择周",
    rangePlaceholder: ["开始日期", "结束日期"],
    rangeYearPlaceholder: ["开始年份", "结束年份"],
    rangeMonthPlaceholder: ["开始月份", "结束月份"],
    rangeQuarterPlaceholder: ["开始季度", "结束季度"],
    rangeWeekPlaceholder: ["开始周", "结束周"]
  }, locale$2),
  timePickerLocale: _extends({}, locale$1)
};
locale.lang.ok = "确定";

const typeTemplate = "${label}不是一个有效的${type}";
const localeValues = {
  locale: "zh-cn",
  Pagination,
  DatePicker: locale,
  TimePicker: locale$1,
  Calendar: locale,
  // locales for all components
  global: {
    placeholder: "请选择"
  },
  Table: {
    filterTitle: "筛选",
    filterConfirm: "确定",
    filterReset: "重置",
    filterEmptyText: "无筛选项",
    filterCheckall: "全选",
    filterSearchPlaceholder: "在筛选项中搜索",
    selectAll: "全选当页",
    selectInvert: "反选当页",
    selectNone: "清空所有",
    selectionAll: "全选所有",
    sortTitle: "排序",
    expand: "展开行",
    collapse: "关闭行",
    triggerDesc: "点击降序",
    triggerAsc: "点击升序",
    cancelSort: "取消排序"
  },
  Tour: {
    Next: "下一步",
    Previous: "上一步",
    Finish: "结束导览"
  },
  Modal: {
    okText: "确定",
    cancelText: "取消",
    justOkText: "知道了"
  },
  Popconfirm: {
    cancelText: "取消",
    okText: "确定"
  },
  Transfer: {
    searchPlaceholder: "请输入搜索内容",
    itemUnit: "项",
    itemsUnit: "项",
    remove: "删除",
    selectCurrent: "全选当页",
    removeCurrent: "删除当页",
    selectAll: "全选所有",
    removeAll: "删除全部",
    selectInvert: "反选当页"
  },
  Upload: {
    uploading: "文件上传中",
    removeFile: "删除文件",
    uploadError: "上传错误",
    previewFile: "预览文件",
    downloadFile: "下载文件"
  },
  Empty: {
    description: "暂无数据"
  },
  Icon: {
    icon: "图标"
  },
  Text: {
    edit: "编辑",
    copy: "复制",
    copied: "复制成功",
    expand: "展开"
  },
  PageHeader: {
    back: "返回"
  },
  Form: {
    optional: "（可选）",
    defaultValidateMessages: {
      default: "字段验证错误${label}",
      required: "请输入${label}",
      enum: "${label}必须是其中一个[${enum}]",
      whitespace: "${label}不能为空字符",
      date: {
        format: "${label}日期格式无效",
        parse: "${label}不能转换为日期",
        invalid: "${label}是一个无效日期"
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: "${label}须为${len}个字符",
        min: "${label}最少${min}个字符",
        max: "${label}最多${max}个字符",
        range: "${label}须在${min}-${max}字符之间"
      },
      number: {
        len: "${label}必须等于${len}",
        min: "${label}最小值为${min}",
        max: "${label}最大值为${max}",
        range: "${label}须在${min}-${max}之间"
      },
      array: {
        len: "须为${len}个${label}",
        min: "最少${min}个${label}",
        max: "最多${max}个${label}",
        range: "${label}数量须在${min}-${max}之间"
      },
      pattern: {
        mismatch: "${label}与模式不匹配${pattern}"
      }
    }
  },
  Image: {
    preview: "预览"
  },
  QRCode: {
    expired: "二维码已过期",
    refresh: "点击刷新",
    scanned: "已扫描"
  }
};

const useUserStore = defineStore("user", {
  state: () => ({
    user_id: null,
    user_name: null,
    user_picture: null
  }),
  actions: {
    async loginWithLINE() {
      return;
    },
    logout() {
      return;
    },
    loadUser() {
      return;
    },
    async checkLoginStatus() {
      return;
    }
  }
});

const useFlexGapSupport = () => {
  const flexible = shallowRef(false);
  return flexible;
};

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24
};
const spaceProps = () => ({
  prefixCls: String,
  size: {
    type: [String, Number, Array]
  },
  direction: PropTypes.oneOf(tuple("horizontal", "vertical")).def("horizontal"),
  align: PropTypes.oneOf(tuple("start", "end", "center", "baseline")),
  wrap: booleanType()
});
function getNumberSize(size) {
  return typeof size === "string" ? spaceSize[size] : size || 0;
}
const Space = defineComponent({
  compatConfig: {
    MODE: 3
  },
  name: "ASpace",
  inheritAttrs: false,
  props: spaceProps(),
  slots: Object,
  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const {
      prefixCls,
      space,
      direction: directionConfig
    } = useConfigInject("space", props);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const supportFlexGap = useFlexGapSupport();
    const size = computed(() => {
      var _a, _b, _c;
      return (_c = (_a = props.size) !== null && _a !== void 0 ? _a : (_b = space === null || space === void 0 ? void 0 : space.value) === null || _b === void 0 ? void 0 : _b.size) !== null && _c !== void 0 ? _c : "small";
    });
    const horizontalSize = ref();
    const verticalSize = ref();
    watch(size, () => {
      [horizontalSize.value, verticalSize.value] = (Array.isArray(size.value) ? size.value : [size.value, size.value]).map((item) => getNumberSize(item));
    }, {
      immediate: true
    });
    const mergedAlign = computed(() => props.align === void 0 && props.direction === "horizontal" ? "center" : props.align);
    const cn = computed(() => {
      return classNames(prefixCls.value, hashId.value, `${prefixCls.value}-${props.direction}`, {
        [`${prefixCls.value}-rtl`]: directionConfig.value === "rtl",
        [`${prefixCls.value}-align-${mergedAlign.value}`]: mergedAlign.value
      });
    });
    const marginDirection = computed(() => directionConfig.value === "rtl" ? "marginLeft" : "marginRight");
    const style = computed(() => {
      const gapStyle = {};
      if (supportFlexGap.value) {
        gapStyle.columnGap = `${horizontalSize.value}px`;
        gapStyle.rowGap = `${verticalSize.value}px`;
      }
      return _extends(_extends({}, gapStyle), props.wrap && {
        flexWrap: "wrap",
        marginBottom: `${-verticalSize.value}px`
      });
    });
    return () => {
      var _a, _b;
      const {
        wrap,
        direction = "horizontal"
      } = props;
      const children = (_a = slots.default) === null || _a === void 0 ? void 0 : _a.call(slots);
      const items = filterEmpty(children);
      const len = items.length;
      if (len === 0) {
        return null;
      }
      const split = (_b = slots.split) === null || _b === void 0 ? void 0 : _b.call(slots);
      const itemClassName = `${prefixCls.value}-item`;
      const horizontalSizeVal = horizontalSize.value;
      const latestIndex = len - 1;
      return createVNode("div", _objectSpread(_objectSpread({}, attrs), {}, {
        "class": [cn.value, attrs.class],
        "style": [style.value, attrs.style]
      }), [items.map((child, index) => {
        let originIndex = children.indexOf(child);
        if (originIndex === -1) {
          originIndex = `$$space-${index}`;
        }
        let itemStyle = {};
        if (!supportFlexGap.value) {
          if (direction === "vertical") {
            if (index < latestIndex) {
              itemStyle = {
                marginBottom: `${horizontalSizeVal / (split ? 2 : 1)}px`
              };
            }
          } else {
            itemStyle = _extends(_extends({}, index < latestIndex && {
              [marginDirection.value]: `${horizontalSizeVal / (split ? 2 : 1)}px`
            }), wrap && {
              paddingBottom: `${verticalSize.value}px`
            });
          }
        }
        return wrapSSR(createVNode(Fragment, {
          "key": originIndex
        }, [createVNode("div", {
          "class": itemClassName,
          "style": itemStyle
        }, [child]), index < latestIndex && split && createVNode("span", {
          "class": `${itemClassName}-split`,
          "style": itemStyle
        }, [split])]));
      })]);
    };
  }
});
Space.Compact = Compact;
Space.install = function(app) {
  app.component(Space.name, Space);
  app.component(Compact.name, Compact);
  return app;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RoundedWayTicket",
  __ssrInlineRender: true,
  setup(__props) {
    useUserStore();
    const tab = ref("roundTrip");
    const { t } = useI18n();
    const localPath = useLocalePath();
    const { locale } = useI18n();
    const isSwapped = ref(false);
    const DateArrivalShip = ref();
    const DateShuttle = ref();
    const DateArrivalShipReturn = ref();
    const DateShuttleReturn = ref();
    const TimeArrivalShip = ref("");
    const TimeShuttle = ref("");
    const flightNumber = ref("");
    const flightTime = ref("");
    const ferryTime = ref("");
    const flightTimeReturn = ref("");
    const ferryTimeReturn = ref("");
    const TimeArrivalShipReturn = ref("");
    const TimeShuttleReturn = ref("");
    const isChecked = ref(false);
    const counts = ref({
      adult: 1,
      child: 1
    });
    const contact = ref("");
    const phone = ref("");
    const totalPrice = computed(() => {
      const adultCount = counts.value.adult;
      return Math.min(adultCount, 2) * 300 + Math.max(adultCount - 2, 0) * 200;
    });
    const onwardTrip = ref({
      p2: t("Booking.pier"),
      p3: t("Booking.airport")
    });
    const returnTrip = ref({
      p2: t("Booking.airport"),
      p3: t("Booking.pier")
    });
    const disabledHours = () => {
      return Array.from({ length: 24 }, (_, i) => i).filter((hour) => hour < 8 || hour > 18);
    };
    const disabledMinutes = (selectedHour) => {
      if (selectedHour === 8) {
        return Array.from({ length: 60 }, (_, i) => i).filter((minute) => minute < 30);
      }
      if (selectedHour === 18) {
        return Array.from({ length: 60 }, (_, i) => i).filter((minute) => minute >= 30);
      }
      return [];
    };
    const disabledHoursF = () => {
      const ferryTimeHour = dayjs(ferryTime.value, "HH:mm").hour();
      return Array.from({ length: 24 }, (_, i) => i).filter((hour) => hour < ferryTimeHour || hour > 18);
    };
    const disabledMinutesF = (selectedHour) => {
      const ferryTimeMinute = dayjs(ferryTime.value, "HH:mm").minute();
      if (selectedHour === 8) {
        return Array.from({ length: 60 }, (_, i) => i).filter((minute) => minute < 30);
      }
      if (selectedHour === 19) {
        return Array.from({ length: 60 }, (_, i) => i).filter((minute) => minute >= 1);
      }
      return Array.from({ length: 60 }, (_, i) => i).filter((minute) => minute < ferryTimeMinute);
    };
    const handleMessageOpen = (open) => {
      if (open) {
        api.info(t("alertMessage"));
      }
    };
    const handleDatePickerOpen = (open) => {
      if (open) {
        api.info(t("alertMessage2"));
      }
    };
    const handleMessageOpen2 = (open) => {
      if (open) {
        api.info(t("alertMessage3"));
      }
    };
    watch(TimeArrivalShip, (newTimeShuttle) => {
      if (newTimeShuttle) {
        const newShuttleTime = dayjs(newTimeShuttle, "HH:mm").add(30, "minute");
        const newTime = dayjs(newTimeShuttle, "HH:mm").add(90, "minute");
        flightTime.value = newTime.format("HH:mm");
        ferryTime.value = newTime.format("HH:mm");
        TimeShuttle.value = newShuttleTime.format("HH:mm");
      } else {
        TimeShuttle.value = "";
        ferryTime.value = "";
        flightTime.value = "";
      }
    });
    watch(TimeArrivalShipReturn, (newTimeShuttleReturn) => {
      if (newTimeShuttleReturn) {
        const newShuttleTimeReturn = dayjs(newTimeShuttleReturn, "HH:mm").add(30, "minute");
        const newTimeReturn = dayjs(newTimeShuttleReturn, "HH:mm").add(90, "minute");
        ferryTimeReturn.value = newTimeReturn.format("HH:mm");
        flightTimeReturn.value = newTimeReturn.format("HH:mm");
        TimeShuttleReturn.value = newShuttleTimeReturn.format("HH:mm");
      } else {
        TimeShuttleReturn.value = "";
        ferryTimeReturn.value = "";
        flightTimeReturn.value = "";
      }
    });
    watch(DateArrivalShipReturn, (newValue) => {
      if (newValue) {
        DateShuttleReturn.value = newValue;
      } else {
        DateShuttleReturn.value = void 0;
      }
    });
    watch(DateArrivalShip, (newValue) => {
      if (newValue) {
        DateShuttle.value = newValue;
      } else {
        DateShuttle.value = void 0;
        TimeArrivalShip.value = "";
      }
    });
    const disabledDate = (current) => {
      return current && current.isBefore(dayjs().add(1, "day").startOf("day"));
    };
    const disabledDateAfter = (current) => {
      return current && (!DateArrivalShip.value || current.isBefore(DateArrivalShip.value));
    };
    const disabledDateReturn = (current) => {
      return current && (!DateArrivalShip.value || current.isBefore(DateArrivalShip.value));
    };
    const swapText = () => {
      isSwapped.value = !isSwapped.value;
    };
    const antLocales = {
      "zh-CN": localeValues,
      "zh-TW": localeValues$2,
      "en-US": localeValues$1
    };
    const antLocale = computed(() => antLocales[locale.value] || localeValues$2);
    const openNotification = (placement) => {
      api$1.open({
        message: t("HomePage.notification.title"),
        description: t("HomePage.notification.description"),
        placement
      });
    };
    const navigateToConfirmation = async () => {
      if (!isChecked.value) {
        openNotification("bottom");
      } else {
        const form = {
          trip_type: tab.value,
          user_id: 7,
          adult_num: counts.value.adult,
          child_num: counts.value.child,
          contact_phone: phone.value,
          totalprice: totalPrice.value,
          contact_name: contact.value,
          departure_loc: isSwapped.value ? "Booking.airport" : "Booking.pier",
          destination_loc: isSwapped.value ? "Booking.pier" : "Booking.airport",
          return_departure: isSwapped.value ? "Booking.pier" : "Booking.airport",
          return_destination: isSwapped.value ? "Booking.airport" : "Booking.pier",
          arrivalpoint_date: DateArrivalShip.value ? DateArrivalShip.value.format("YYYY-MM-DD") : void 0,
          arrivalpoint_time: TimeArrivalShip.value,
          return_arrival_date: DateArrivalShipReturn.value ? DateArrivalShipReturn.value.format("YYYY-MM-DD") : void 0,
          return_arrival_time: TimeArrivalShipReturn.value,
          flight_num: flightNumber.value || void 0,
          ferry_time: ferryTime.value || void 0,
          flight_time: flightTime.value || void 0,
          shuttle_date: DateShuttle.value ? DateShuttle.value.format("YYYY-MM-DD") : void 0,
          shuttle_time: TimeArrivalShip.value,
          return_shuttle_date: DateShuttleReturn.value ? DateShuttleReturn.value.format("YYYY-MM-DD") : void 0,
          return_shuttle_time: TimeShuttleReturn.value
        };
        try {
          const response = await $fetch("/api/POSTbooking", {
            method: "POST",
            body: form
          });
          console.log(response);
          if (response == null ? void 0 : response.id) {
            navigateTo(localPath("/"));
          }
        } catch {
          alert(t("alertMessage4"));
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_3;
      const _component_a_config_provider = ConfigProvider;
      const _component_a_space = Space;
      const _component_a_date_picker = DatePicker$1;
      const _component_a_time_picker = TimePicker$1;
      const _component_DashLine = resolveComponent("DashLine");
      const _component_PopUpRules = resolveComponent("PopUpRules");
      const _component_a_button = Button;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex-col p-4" }, _attrs))}><div><p class="border-l-4 my-3 border-lwm-400 text-justify pl-2">${ssrInterpolate(_ctx.$t("Booking.outward"))}</p></div><div class="flex justify-around"><div class="flex">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-material-symbols-directions-car",
        class: "bg-gray-500 w-6 h-6"
      }, null, _parent));
      _push(`<p class="flex-1 text-gray-500 ml-2">${ssrInterpolate(_ctx.$t("Booking.departure"))}</p></div><div class="flex">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-mdi-map-marker-radius-outline",
        class: "bg-gray-500 w-6 h-6"
      }, null, _parent));
      _push(`<p class="flex-1 text-gray-500 ml-2">${ssrInterpolate(_ctx.$t("Booking.arrival"))}</p></div></div><div class="flex justify-evenly"><p class="ml-auto text-2xl">${ssrInterpolate(isSwapped.value ? returnTrip.value.p2 : onwardTrip.value.p2)}</p>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "fa6-solid:rotate",
        class: ["mx-auto bg-lwm-400 w-7 h-7 cursor-pointer transition-transform duration-500", { "rotate-180": isSwapped.value }],
        onClick: swapText
      }, null, _parent));
      _push(`<p class="mr-auto text-2xl">${ssrInterpolate(isSwapped.value ? returnTrip.value.p3 : onwardTrip.value.p3)}</p></div><div class="border-b-2 py-3"></div><div class="flex flex-col pt-3 pl-4">`);
      if (isSwapped.value) {
        _push(`<div class="flex items-center pb-1"><div class="flex pr-4">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:tickets",
          class: "bg-lwm-50 w-6 h-6"
        }, null, _parent));
        _push(`<p class="text-lwm-500">${ssrInterpolate(_ctx.$t("Booking.flightNumber"))}</p></div><div class="border rounded-lg"><input type="text"${ssrRenderAttr("placeholder", _ctx.$t("Booking.required"))}${ssrRenderAttr("value", flightNumber.value)} class="flex-1 px-2 py-1 w-full bg-white rounded-lg focus:outline-none text-sm"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: isSwapped.value ? "i-material-symbols-flight-land" : "i-majesticons-ship-line",
        class: "bg-lwm-50 w-6 h-6"
      }, null, _parent));
      if (isSwapped.value) {
        _push(`<p class="text-lwm-500">${ssrInterpolate(_ctx.$t("Booking.arrivalAtAirportTime"))}</p>`);
      } else {
        _push(`<p class="text-lwm-500">${ssrInterpolate(_ctx.$t("Booking.arrivalPortTime"))}</p>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(antLocale) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex pt-2 pl-4 space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_a_space, {
              direction: "vertical",
              size: 12
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_date_picker, {
                    value: DateArrivalShip.value,
                    "onUpdate:value": ($event) => DateArrivalShip.value = $event,
                    "disabled-date": disabledDate,
                    "show-today": false,
                    onOpenChange: handleDatePickerOpen,
                    inputReadOnly: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_date_picker, {
                      value: DateArrivalShip.value,
                      "onUpdate:value": ($event) => DateArrivalShip.value = $event,
                      "disabled-date": disabledDate,
                      "show-today": false,
                      onOpenChange: handleDatePickerOpen,
                      inputReadOnly: true
                    }, null, 8, ["value", "onUpdate:value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_a_time_picker, {
              value: TimeArrivalShip.value,
              "onUpdate:value": ($event) => TimeArrivalShip.value = $event,
              "value-format": "HH:mm",
              "disabled-hours": disabledHours,
              "disabled-minutes": disabledMinutes,
              "minute-step": isSwapped.value ? 5 : 30,
              "hour-step": 1,
              "hide-disabled-options": true,
              "show-now": false,
              format: "HH:mm",
              disabled: !DateArrivalShip.value,
              inputReadOnly: true
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex pt-2 pl-4 space-x-4" }, [
                createVNode(_component_a_space, {
                  direction: "vertical",
                  size: 12
                }, {
                  default: withCtx(() => [
                    createVNode(_component_a_date_picker, {
                      value: DateArrivalShip.value,
                      "onUpdate:value": ($event) => DateArrivalShip.value = $event,
                      "disabled-date": disabledDate,
                      "show-today": false,
                      onOpenChange: handleDatePickerOpen,
                      inputReadOnly: true
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(_component_a_time_picker, {
                  value: TimeArrivalShip.value,
                  "onUpdate:value": ($event) => TimeArrivalShip.value = $event,
                  "value-format": "HH:mm",
                  "disabled-hours": disabledHours,
                  "disabled-minutes": disabledMinutes,
                  "minute-step": isSwapped.value ? 5 : 30,
                  "hour-step": 1,
                  "hide-disabled-options": true,
                  "show-now": false,
                  format: "HH:mm",
                  disabled: !DateArrivalShip.value,
                  inputReadOnly: true
                }, null, 8, ["value", "onUpdate:value", "minute-step", "disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-col py-2 pl-4"><div class="flex items-center"><div class="flex pr-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:tickets",
        class: "bg-lwm-100 w-6 h-6"
      }, null, _parent));
      _push(`<p class="text-lwm-500">${ssrInterpolate(isSwapped.value ? _ctx.$t("Booking.ferryTime") : _ctx.$t("Booking.flightTime"))}</p></div><div>`);
      if (isSwapped.value) {
        _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(antLocale) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_time_picker, {
                value: ferryTime.value,
                "onUpdate:value": ($event) => ferryTime.value = $event,
                "minute-step": 30,
                "value-format": "HH:mm",
                format: "HH:mm",
                "disabled-hours": disabledHoursF,
                "disabled-minutes": disabledMinutesF,
                "hide-disabled-options": true,
                "show-now": false,
                disabled: !TimeArrivalShip.value,
                onOpenChange: handleMessageOpen,
                inputReadOnly: true
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_time_picker, {
                  value: ferryTime.value,
                  "onUpdate:value": ($event) => ferryTime.value = $event,
                  "minute-step": 30,
                  "value-format": "HH:mm",
                  format: "HH:mm",
                  "disabled-hours": disabledHoursF,
                  "disabled-minutes": disabledMinutesF,
                  "hide-disabled-options": true,
                  "show-now": false,
                  disabled: !TimeArrivalShip.value,
                  onOpenChange: handleMessageOpen,
                  inputReadOnly: true
                }, null, 8, ["value", "onUpdate:value", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(antLocale) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_time_picker, {
                value: flightTime.value,
                "onUpdate:value": ($event) => flightTime.value = $event,
                "minute-step": 5,
                "value-format": "HH:mm",
                format: "HH:mm",
                "disabled-hours": disabledHoursF,
                "disabled-minutes": disabledMinutesF,
                "hide-disabled-options": true,
                "show-now": false,
                disabled: !TimeArrivalShip.value,
                onOpenChange: handleMessageOpen2,
                inputReadOnly: true
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_time_picker, {
                  value: flightTime.value,
                  "onUpdate:value": ($event) => flightTime.value = $event,
                  "minute-step": 5,
                  "value-format": "HH:mm",
                  format: "HH:mm",
                  "disabled-hours": disabledHoursF,
                  "disabled-minutes": disabledMinutesF,
                  "hide-disabled-options": true,
                  "show-now": false,
                  disabled: !TimeArrivalShip.value,
                  onOpenChange: handleMessageOpen2,
                  inputReadOnly: true
                }, null, 8, ["value", "onUpdate:value", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div></div><div class="flex pl-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-material-symbols-directions-car",
        class: "bg-lwm-100 w-6 h-6"
      }, null, _parent));
      _push(`<p class="text-lwm-500">${ssrInterpolate(_ctx.$t("Booking.shuttleBusTime"))}</p></div>`);
      _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(antLocale) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex pt-2 pl-4 space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_a_space, {
              direction: "vertical",
              size: 12
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_date_picker, {
                    value: DateShuttle.value,
                    "onUpdate:value": ($event) => DateShuttle.value = $event,
                    disabled: true,
                    "disabled-date": disabledDateAfter
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_date_picker, {
                      value: DateShuttle.value,
                      "onUpdate:value": ($event) => DateShuttle.value = $event,
                      disabled: true,
                      "disabled-date": disabledDateAfter
                    }, null, 8, ["value", "onUpdate:value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_a_time_picker, {
              value: TimeShuttle.value,
              "onUpdate:value": ($event) => TimeShuttle.value = $event,
              "value-format": "HH:mm",
              disabled: true,
              "minute-step": 30,
              format: "HH:mm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex pt-2 pl-4 space-x-4" }, [
                createVNode(_component_a_space, {
                  direction: "vertical",
                  size: 12
                }, {
                  default: withCtx(() => [
                    createVNode(_component_a_date_picker, {
                      value: DateShuttle.value,
                      "onUpdate:value": ($event) => DateShuttle.value = $event,
                      disabled: true,
                      "disabled-date": disabledDateAfter
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(_component_a_time_picker, {
                  value: TimeShuttle.value,
                  "onUpdate:value": ($event) => TimeShuttle.value = $event,
                  "value-format": "HH:mm",
                  disabled: true,
                  "minute-step": 30,
                  format: "HH:mm"
                }, null, 8, ["value", "onUpdate:value"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="border-b-2 py-3 border-dashed border-gray-500"></div><p class="border-l-4 my-3 border-orange-400 text-justify pl-2">${ssrInterpolate(_ctx.$t("Booking.return"))}</p><div class="flex justify-around"><div class="flex">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-material-symbols-directions-car",
        class: "bg-gray-500 w-6 h-6"
      }, null, _parent));
      _push(`<p class="flex-1 text-gray-500 ml-2">${ssrInterpolate(_ctx.$t("Booking.departure"))}</p></div><div class="flex">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-mdi-map-marker-radius-outline",
        class: "bg-gray-500 w-6 h-6"
      }, null, _parent));
      _push(`<p class="flex-1 text-gray-500 ml-2">${ssrInterpolate(_ctx.$t("Booking.arrival"))}</p></div></div><div class="flex justify-evenly"><p class="ml-auto text-2xl">${ssrInterpolate(isSwapped.value ? onwardTrip.value.p2 : returnTrip.value.p2)}</p>`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "fa6-solid:rotate",
        class: ["mx-auto bg-lwm-400 w-7 h-7 cursor-pointer transition-transform duration-500", { "rotate-180": isSwapped.value }],
        onClick: swapText
      }, null, _parent));
      _push(`<p class="mr-auto text-2xl">${ssrInterpolate(isSwapped.value ? onwardTrip.value.p3 : returnTrip.value.p3)}</p></div><div class="border-b-2 py-3"></div><div class="flex flex-col pt-3 pl-4">`);
      if (!isSwapped.value) {
        _push(`<div class="flex items-center pb-1"><div class="flex pr-4">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:tickets",
          class: "bg-lwm-50 w-6 h-6"
        }, null, _parent));
        _push(`<p class="text-lwm-500">${ssrInterpolate(_ctx.$t("Booking.flightNumber"))}</p></div><div class="border rounded-lg"><input type="text"${ssrRenderAttr("placeholder", _ctx.$t("Booking.required"))}${ssrRenderAttr("value", flightNumber.value)} class="flex-1 px-2 py-1 w-full bg-white rounded-lg focus:outline-none text-sm"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: isSwapped.value ? "i-majesticons-ship-line" : "i-material-symbols-flight-land",
        class: "bg-lwm-50 w-6 h-6"
      }, null, _parent));
      if (isSwapped.value) {
        _push(`<p class="text-lwm-500">${ssrInterpolate(_ctx.$t("Booking.arrivalPortTime"))}</p>`);
      } else {
        _push(`<p class="text-lwm-500">${ssrInterpolate(_ctx.$t("Booking.arrivalAtAirportTime"))}</p>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(antLocale) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex pt-2 pl-4 space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_a_space, {
              direction: "vertical",
              size: 12
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_date_picker, {
                    value: DateArrivalShipReturn.value,
                    "onUpdate:value": ($event) => DateArrivalShipReturn.value = $event,
                    "disabled-date": disabledDate,
                    "show-today": false,
                    inputReadOnly: true
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_date_picker, {
                      value: DateArrivalShipReturn.value,
                      "onUpdate:value": ($event) => DateArrivalShipReturn.value = $event,
                      "disabled-date": disabledDate,
                      "show-today": false,
                      inputReadOnly: true
                    }, null, 8, ["value", "onUpdate:value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_a_time_picker, {
              value: TimeArrivalShipReturn.value,
              "onUpdate:value": ($event) => TimeArrivalShipReturn.value = $event,
              "value-format": "HH:mm",
              "disabled-hours": disabledHours,
              "disabled-minutes": disabledMinutes,
              "minute-step": isSwapped.value ? 30 : 5,
              "hour-step": 1,
              "hide-disabled-options": true,
              "show-now": false,
              format: "HH:mm",
              disabled: !DateArrivalShipReturn.value,
              inputReadOnly: true
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex pt-2 pl-4 space-x-4" }, [
                createVNode(_component_a_space, {
                  direction: "vertical",
                  size: 12
                }, {
                  default: withCtx(() => [
                    createVNode(_component_a_date_picker, {
                      value: DateArrivalShipReturn.value,
                      "onUpdate:value": ($event) => DateArrivalShipReturn.value = $event,
                      "disabled-date": disabledDate,
                      "show-today": false,
                      inputReadOnly: true
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(_component_a_time_picker, {
                  value: TimeArrivalShipReturn.value,
                  "onUpdate:value": ($event) => TimeArrivalShipReturn.value = $event,
                  "value-format": "HH:mm",
                  "disabled-hours": disabledHours,
                  "disabled-minutes": disabledMinutes,
                  "minute-step": isSwapped.value ? 30 : 5,
                  "hour-step": 1,
                  "hide-disabled-options": true,
                  "show-now": false,
                  format: "HH:mm",
                  disabled: !DateArrivalShipReturn.value,
                  inputReadOnly: true
                }, null, 8, ["value", "onUpdate:value", "minute-step", "disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex flex-col py-2 pl-4"><div class="flex items-center"><div class="flex pr-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:tickets",
        class: "bg-lwm-100 w-6 h-6"
      }, null, _parent));
      _push(`<p class="text-lwm-500">${ssrInterpolate(isSwapped.value ? _ctx.$t("Booking.flightTime") : _ctx.$t("Booking.ferryTime"))}</p></div><div>`);
      if (isSwapped.value) {
        _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(antLocale) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_time_picker, {
                value: flightTimeReturn.value,
                "onUpdate:value": ($event) => flightTimeReturn.value = $event,
                "minute-step": 5,
                "value-format": "HH:mm",
                format: "HH:mm",
                "disabled-hours": disabledHoursF,
                "disabled-minutes": disabledMinutesF,
                "hide-disabled-options": true,
                "show-now": false,
                disabled: !TimeArrivalShip.value,
                onOpenChange: handleMessageOpen2,
                inputReadOnly: true
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_time_picker, {
                  value: flightTimeReturn.value,
                  "onUpdate:value": ($event) => flightTimeReturn.value = $event,
                  "minute-step": 5,
                  "value-format": "HH:mm",
                  format: "HH:mm",
                  "disabled-hours": disabledHoursF,
                  "disabled-minutes": disabledMinutesF,
                  "hide-disabled-options": true,
                  "show-now": false,
                  disabled: !TimeArrivalShip.value,
                  onOpenChange: handleMessageOpen2,
                  inputReadOnly: true
                }, null, 8, ["value", "onUpdate:value", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(antLocale) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_a_time_picker, {
                value: ferryTimeReturn.value,
                "onUpdate:value": ($event) => ferryTimeReturn.value = $event,
                "minute-step": 30,
                "value-format": "HH:mm",
                format: "HH:mm",
                "disabled-hours": disabledHoursF,
                "disabled-minutes": disabledMinutesF,
                "hide-disabled-options": true,
                "show-now": false,
                disabled: !TimeArrivalShipReturn.value,
                onOpenChange: handleMessageOpen,
                inputReadOnly: true
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_a_time_picker, {
                  value: ferryTimeReturn.value,
                  "onUpdate:value": ($event) => ferryTimeReturn.value = $event,
                  "minute-step": 30,
                  "value-format": "HH:mm",
                  format: "HH:mm",
                  "disabled-hours": disabledHoursF,
                  "disabled-minutes": disabledMinutesF,
                  "hide-disabled-options": true,
                  "show-now": false,
                  disabled: !TimeArrivalShipReturn.value,
                  onOpenChange: handleMessageOpen,
                  inputReadOnly: true
                }, null, 8, ["value", "onUpdate:value", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div></div><div class="flex pl-4">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "i-material-symbols-directions-car",
        class: "bg-lwm-100 w-6 h-6"
      }, null, _parent));
      _push(`<p class="text-lwm-500">${ssrInterpolate(_ctx.$t("Booking.shuttleBusTime"))}</p></div>`);
      _push(ssrRenderComponent(_component_a_config_provider, { locale: unref(antLocale) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex pt-2 pl-4 space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_a_space, {
              direction: "vertical",
              size: 12
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_a_date_picker, {
                    value: DateShuttleReturn.value,
                    "onUpdate:value": ($event) => DateShuttleReturn.value = $event,
                    disabled: true,
                    "disabled-date": disabledDateReturn
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_a_date_picker, {
                      value: DateShuttleReturn.value,
                      "onUpdate:value": ($event) => DateShuttleReturn.value = $event,
                      disabled: true,
                      "disabled-date": disabledDateReturn
                    }, null, 8, ["value", "onUpdate:value"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_a_time_picker, {
              value: TimeShuttleReturn.value,
              "onUpdate:value": ($event) => TimeShuttleReturn.value = $event,
              "value-format": "HH:mm",
              disabled: true,
              "minute-step": 30,
              format: "HH:mm"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex pt-2 pl-4 space-x-4" }, [
                createVNode(_component_a_space, {
                  direction: "vertical",
                  size: 12
                }, {
                  default: withCtx(() => [
                    createVNode(_component_a_date_picker, {
                      value: DateShuttleReturn.value,
                      "onUpdate:value": ($event) => DateShuttleReturn.value = $event,
                      disabled: true,
                      "disabled-date": disabledDateReturn
                    }, null, 8, ["value", "onUpdate:value"])
                  ]),
                  _: 1
                }),
                createVNode(_component_a_time_picker, {
                  value: TimeShuttleReturn.value,
                  "onUpdate:value": ($event) => TimeShuttleReturn.value = $event,
                  "value-format": "HH:mm",
                  disabled: true,
                  "minute-step": 30,
                  format: "HH:mm"
                }, null, 8, ["value", "onUpdate:value"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_DashLine, null, null, _parent));
      _push(`<div class="flex pl-6 pt-2 justify-evenly content-center"><div class="flex flex-1"><p class="flex-1">${ssrInterpolate(_ctx.$t("Booking.adultTicket"))}</p><div class="flex-1 flex"><button>`);
      _push(ssrRenderComponent(_component_Icon, { name: "i-mdi-minus-circle-outline" }, null, _parent));
      _push(`</button><p class="border border-gray-300 bg-gray-white w-fit px-4 mx-1 my-auto text-sm rounded-full">${ssrInterpolate(counts.value.adult)}</p><button>`);
      _push(ssrRenderComponent(_component_Icon, { name: "i-material-symbols-add-circle-outline" }, null, _parent));
      _push(`</button></div></div></div><div class="flex pl-6 pt-2 justify-evenly content-center"><div class="flex flex-1"><p class="flex-1">${ssrInterpolate(_ctx.$t("Booking.childTicket"))}</p><div class="flex-1 flex"><button>`);
      _push(ssrRenderComponent(_component_Icon, { name: "i-mdi-minus-circle-outline" }, null, _parent));
      _push(`</button><p class="border border-gray-300 bg-gray-white w-fit px-4 mx-1 my-auto text-sm rounded-full">${ssrInterpolate(counts.value.child)}</p><button>`);
      _push(ssrRenderComponent(_component_Icon, { name: "i-material-symbols-add-circle-outline" }, null, _parent));
      _push(`</button></div></div></div><div class="flex pl-6 pt-3 justify-evenly content-center"><p class="flex-1">${ssrInterpolate(_ctx.$t("Booking.ticketPrice"))}</p><p class="flex-1">NT$ ${ssrInterpolate(unref(totalPrice))}${ssrInterpolate(_ctx.$t("Booking.pricePerPerson"))}</p></div><div class="flex py-4 px-6 content-center"><p class="flex-none pr-6">${ssrInterpolate(_ctx.$t("Booking.contact"))}</p><input${ssrRenderAttr("value", contact.value)} type="text"${ssrRenderAttr("placeholder", _ctx.$t("Booking.required"))} class="flex-1 px-2 border-b-2 border-gray-600 bg-inherit focus:outline-none text-sm min-w-0"></div><div class="flex py-4 px-6 content-center"><p class="flex-none pr-2">${ssrInterpolate(_ctx.$t("Booking.phone"))}</p><input${ssrRenderAttr("value", phone.value)} type="text"${ssrRenderAttr("placeholder", _ctx.$t("Booking.required"))} class="flex-1 px-2 border-b-2 border-gray-600 bg-inherit focus:outline-none text-sm min-w-0"></div><div class="flex justify-center"><input type="checkbox" id="checkbox"${ssrIncludeBooleanAttr(Array.isArray(isChecked.value) ? ssrLooseContain(isChecked.value, null) : isChecked.value) ? " checked" : ""} class="h-5 w-3 border-black rounded-full"><label for="checkbox" class="ml-2 text-sm text-gray-700">${ssrInterpolate(_ctx.$t("HomePage.readAgreement"))}</label>`);
      _push(ssrRenderComponent(_component_PopUpRules, null, null, _parent));
      _push(`</div><div class="pt-1 flex justify-center pb-4">`);
      _push(ssrRenderComponent(_component_a_button, {
        type: "primary",
        onClick: navigateToConfirmation,
        class: "w-2/3 rounded-lg !bg-lwm-400 text-white active:!bg-lime-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("HomePage.confirm"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("HomePage.confirm")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});

const _sfc_main = defineComponent({
  setup() {
    const isChecked = ref(false);
    const activeTab = ref(1);
    const showContent = (tab) => {
      activeTab.value = tab;
    };
    const { t } = useI18n();
    return {
      t,
      activeTab,
      isChecked,
      showContent
    };
  }
});

function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Header = _sfc_main$2;
  const _component_OneWayTicket = resolveComponent("OneWayTicket");
  const _component_RoundedWayTicket = _sfc_main$1;
  const _component_BottomNavigator = _sfc_main$3;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Header, {
    title: "添加訂單",
    showBack: true
  }, null, _parent));
  _push(`<div class="flex flex-col pb-16"><div class="shadow mt-6 mx-10 rounded-lg bg-gray-50"><div class="flex"><div class="${ssrRenderClass([{ "bg-lwm-100 rounded-tl-lg text-white": _ctx.activeTab === 2 }, "flex-1 flex justify-center rounded-tl-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01] active:scale-95 cursor-pointer"])}"><button class="${ssrRenderClass({ " text-lwm-400 font-bold": _ctx.activeTab === 1 })}">${ssrInterpolate(_ctx.$t("HomePage.oneWay"))}</button></div><div class="${ssrRenderClass([{ "bg-lwm-100 rounded-tr-lg text-white": _ctx.activeTab === 1 }, "flex-1 flex justify-center rounded-tr-lg transition-all duration-300 ease-in-out transform hover:scale-[1.01] active:scale-95 cursor-pointer"])}"><button class="${ssrRenderClass({ " text-lwm-400 font-bold": _ctx.activeTab === 2 })}">${ssrInterpolate(_ctx.$t("HomePage.roundTrip"))}</button></div></div>`);
  if (_ctx.activeTab === 1) {
    _push(`<div>`);
    _push(ssrRenderComponent(_component_OneWayTicket, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  if (_ctx.activeTab === 2) {
    _push(`<div>`);
    _push(ssrRenderComponent(_component_RoundedWayTicket, null, null, _parent));
    _push(`</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div>`);
  _push(ssrRenderComponent(_component_BottomNavigator, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/addOrders.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const addOrders = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { addOrders as default };
//# sourceMappingURL=addOrders.vue.mjs.map
