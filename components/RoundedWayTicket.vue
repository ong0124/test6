<template>
    <div class="flex-col p-4">
        <div>
            <p class="border-l-4 my-3 border-lwm-400 text-justify pl-2">{{ $t('Booking.outward') }}</p>
        </div>
        <div class="flex justify-around">
                <div class="flex"><Icon name="i-material-symbols-directions-car" class="bg-gray-500 w-6 h-6"/>
                  <p class="flex-1 text-gray-500 ml-2">{{ $t('Booking.departure') }}</p>
                </div>
                <div class="flex"><Icon name="i-mdi-map-marker-radius-outline" class="bg-gray-500 w-6 h-6"/>
                  <p class="flex-1 text-gray-500 ml-2">{{ $t('Booking.arrival') }}</p>
                </div>
              </div>
              <div class="flex justify-evenly">
                <p class="ml-auto text-2xl ">{{ isSwapped ? returnTrip.p2 : onwardTrip.p2 }}</p>
                <Icon
                    name="fa6-solid:rotate"
                    class="mx-auto bg-lwm-400 w-7 h-7 cursor-pointer transition-transform duration-500"
                    :class="{'rotate-180': isSwapped}"
                    @click="swapText"
                  />
                <p class="mr-auto text-2xl">{{ isSwapped ? returnTrip.p3 : onwardTrip.p3 }}</p>
              </div>
              <div class="border-b-2 py-3"></div>
              <div class="flex flex-col pt-3 pl-4">
                <template v-if="isSwapped">
                  <div class="flex items-center pb-1">
                    <div class="flex pr-4">
                      <Icon name="lucide:tickets" class="bg-lwm-50 w-6 h-6" />
                      <p class="text-lwm-500">
                        {{ $t('Booking.flightNumber') }}
                      </p>
                    </div>
                      <div class="border rounded-lg">
                          <input
                            type="text"
                            :placeholder="$t('Booking.required')"
                            v-model="flightNumber"
                            class="flex-1 px-2 py-1 w-full bg-white rounded-lg focus:outline-none text-sm"
                          />
                        </div>
                  </div>
                </template>
                <div class="flex">
                  <Icon :name="isSwapped ? 'i-material-symbols-flight-land' : 'i-majesticons-ship-line'" 
                   class="bg-lwm-50 w-6 h-6"></Icon>
                  <p v-if="isSwapped" class="text-lwm-500">{{ $t('Booking.arrivalAtAirportTime') }}</p>
                  <p v-else class="text-lwm-500">{{ $t('Booking.arrivalPortTime') }}</p>
                </div>
              </div>
              <a-config-provider :locale="antLocale">
                <div class="flex pt-2 pl-4 space-x-4">
                  <a-space direction="vertical" :size="12">
                    <a-date-picker 
                    v-model:value="DateArrivalShip" 
                    :disabled-date="disabledDate" 
                    :show-today="false"
                    @open-change="handleDatePickerOpen"
                    :inputReadOnly="true" 
                    />
                  </a-space>
                  <a-time-picker
                    v-model:value="TimeArrivalShip"
                    value-format="HH:mm"
                    :disabled-hours="disabledHours"
                    :disabled-minutes="disabledMinutes"
                    :minute-step="isSwapped ? 5 : 30"
                    :hour-step="1"
                    :hide-disabled-options="true" 
                    :show-now="false"
                    format="HH:mm"
                    :disabled="!DateArrivalShip" 
                    :inputReadOnly="true" 
                  ></a-time-picker>
                </div>
              </a-config-provider>
              <div class="flex flex-col py-2 pl-4">
                <div class="flex items-center">
                  <div class="flex pr-4">
                    <Icon name="lucide:tickets" class="bg-lwm-100 w-6 h-6" />
                    <p class="text-lwm-500">
                      {{ isSwapped ? $t('Booking.ferryTime') : $t('Booking.flightTime') }}
                    </p>
                  </div>
                  <div>
                    <template v-if="isSwapped">
                      <a-config-provider :locale="antLocale">
                        <a-time-picker
                          v-model:value="ferryTime"
                          :minute-step="30"
                          value-format="HH:mm"
                          format="HH:mm"
                          :disabled-hours="disabledHoursF"
                          :disabled-minutes="disabledMinutesF"
                          :hide-disabled-options="true"
                          :show-now="false"
                          :disabled="!TimeArrivalShip" 
                          @open-change="handleMessageOpen"
                          :inputReadOnly="true" 
                        ></a-time-picker>
                      </a-config-provider>
                    </template>
                    <template v-else>
                      <a-config-provider :locale="antLocale">
                        <a-time-picker
                          v-model:value="flightTime"
                          :minute-step="5"
                          value-format="HH:mm"
                          format="HH:mm"
                          :disabled-hours="disabledHoursF"
                          :disabled-minutes="disabledMinutesF"
                          :hide-disabled-options="true"
                          :show-now="false"
                          :disabled="!TimeArrivalShip" 
                          @open-change="handleMessageOpen2"
                          :inputReadOnly="true" 
                        ></a-time-picker>
                      </a-config-provider>
                    </template>
                  </div>
                </div>
              </div>
              <div class="flex pl-4">
                <Icon name="i-material-symbols-directions-car" class="bg-lwm-100 w-6 h-6"></Icon>
                <p class="text-lwm-500">{{ $t('Booking.shuttleBusTime') }}</p>
              </div>
              <a-config-provider :locale="antLocale">
                <div class="flex pt-2 pl-4 space-x-4">
                  <a-space direction="vertical" :size="12">
                    <a-date-picker 
                      v-model:value="DateShuttle" 
                      :disabled="true" 
                      :disabled-date="disabledDateAfter"
                    />
                  </a-space>
                  <a-time-picker
                    v-model:value="TimeShuttle"
                    value-format="HH:mm"
                    :disabled="true"
                    :minute-step="30"
                    format="HH:mm"
                  ></a-time-picker>
                </div>
              </a-config-provider>
              <div class="border-b-2 py-3 border-dashed border-gray-500"></div>

                <p class="border-l-4 my-3 border-orange-400 text-justify pl-2">{{ $t('Booking.return') }}</p>
                <div class="flex justify-around">
                <div class="flex"><Icon name="i-material-symbols-directions-car" class="bg-gray-500 w-6 h-6"/>
                  <p class="flex-1 text-gray-500 ml-2">{{ $t('Booking.departure') }}</p>
                </div>
                <div class="flex"><Icon name="i-mdi-map-marker-radius-outline" class="bg-gray-500 w-6 h-6"/>
                  <p class="flex-1 text-gray-500 ml-2">{{ $t('Booking.arrival') }}</p>
                </div>
              </div>
              <div class="flex justify-evenly">
                <p class="ml-auto text-2xl ">{{ isSwapped ? onwardTrip.p2 : returnTrip.p2 }}</p>
                <Icon
                    name="fa6-solid:rotate"
                    class="mx-auto bg-lwm-400 w-7 h-7 cursor-pointer transition-transform duration-500"
                    :class="{'rotate-180': isSwapped}"
                    @click="swapText"
                />
                <p class="mr-auto text-2xl"> {{ isSwapped ? onwardTrip.p3 : returnTrip.p3 }}</p>
              </div>
              <div class="border-b-2 py-3"></div>
              <div class="flex flex-col pt-3 pl-4">
                <template v-if="!isSwapped">
                  <div class="flex items-center pb-1">
                    <div class="flex pr-4">
                      <Icon name="lucide:tickets" class="bg-lwm-50 w-6 h-6" />
                      <p class="text-lwm-500">
                        {{ $t('Booking.flightNumber') }}
                      </p>
                    </div>
                      <div class="border rounded-lg">
                          <input
                            type="text"
                            :placeholder="$t('Booking.required')"
                            v-model="flightNumber"
                            class="flex-1 px-2 py-1 w-full bg-white rounded-lg focus:outline-none text-sm"
                          />
                        </div>
                  </div>
                </template>
                <div class="flex">
                  <Icon :name="isSwapped ? 'i-majesticons-ship-line':'i-material-symbols-flight-land'" class="bg-lwm-50 w-6 h-6"></Icon>
                  <p v-if="isSwapped" class="text-lwm-500">{{ $t('Booking.arrivalPortTime') }}</p>
                  <p v-else class="text-lwm-500">{{ $t('Booking.arrivalAtAirportTime') }}</p>
                </div> 
              </div>
              <a-config-provider :locale="antLocale">
                <div class="flex pt-2 pl-4 space-x-4">
                  <a-space direction="vertical" :size="12">
                    <a-date-picker 
                    v-model:value="DateArrivalShipReturn" 
                    :disabled-date="disabledDate"
                    :show-today="false"
                    :inputReadOnly="true" 
                     />
                  </a-space>
                  <a-time-picker
                    v-model:value="TimeArrivalShipReturn"
                    value-format="HH:mm"
                    :disabled-hours="disabledHours"
                    :disabled-minutes="disabledMinutes"
                    :minute-step="isSwapped ? 30 : 5"
                    :hour-step="1"
                    :hide-disabled-options="true" 
                    :show-now="false"
                    format="HH:mm"
                    :disabled="!DateArrivalShipReturn" 
                    :inputReadOnly="true" 
                  ></a-time-picker>
                </div>
              </a-config-provider>
              <div class="flex flex-col py-2 pl-4">
                <div class="flex items-center">
                  <div class="flex pr-4">
                    <Icon name="lucide:tickets" class="bg-lwm-100 w-6 h-6" />
                    <p class="text-lwm-500">
                      {{ isSwapped ? $t('Booking.flightTime') : $t('Booking.ferryTime') }}
                    </p>
                  </div>
                  <div>
                    <template v-if="isSwapped">
                      <a-config-provider :locale="antLocale">
                        <a-time-picker
                          v-model:value="flightTimeReturn"
                          :minute-step="5"
                          value-format="HH:mm"
                          format="HH:mm"
                          :disabled-hours="disabledHoursF"
                          :disabled-minutes="disabledMinutesF"
                          :hide-disabled-options="true"
                          :show-now="false"
                          :disabled="!TimeArrivalShip" 
                          @open-change="handleMessageOpen2"
                          :inputReadOnly="true" 
                        ></a-time-picker>
                      </a-config-provider>
                    </template>
                    <template v-else>
                      <a-config-provider :locale="antLocale">
                        <a-time-picker
                          v-model:value="ferryTimeReturn"
                          :minute-step="30"
                          value-format="HH:mm"
                          format="HH:mm"
                          :disabled-hours="disabledHoursF"
                          :disabled-minutes="disabledMinutesF"
                          :hide-disabled-options="true"
                          :show-now="false"
                          :disabled="!TimeArrivalShipReturn" 
                          @open-change="handleMessageOpen"
                          :inputReadOnly="true" 
                        ></a-time-picker>
                      </a-config-provider>
                    </template>
                  </div>
                </div>
              </div>
              <div class="flex pl-4">
                <Icon name="i-material-symbols-directions-car" class="bg-lwm-100 w-6 h-6"></Icon>
                <p class="text-lwm-500">{{ $t('Booking.shuttleBusTime') }}</p>
              </div>
              <a-config-provider :locale="antLocale">
                <div class="flex pt-2 pl-4 space-x-4">
                  <a-space direction="vertical" :size="12">
                    <a-date-picker 
                      v-model:value="DateShuttleReturn" 
                      :disabled="true" 
                      :disabled-date="disabledDateReturn"
                    />
                  </a-space>
                  <a-time-picker
                    v-model:value="TimeShuttleReturn"
                    value-format="HH:mm"
                    :disabled="true"
                    :minute-step="30"
                    format="HH:mm"
                  ></a-time-picker>
                </div>
              </a-config-provider>
              <DashLine/>
              <div class="flex pl-6 pt-2 justify-evenly content-center">
                <div class="flex flex-1">
                  <p class="flex-1">{{ $t('Booking.adultTicket') }}</p>
                  <div class="flex-1 flex ">
                  <button @click="decrement('adult')">
                  <Icon name="i-mdi-minus-circle-outline"/></button>
                  <p class="border border-gray-300 bg-gray-white w-fit px-4 mx-1 my-auto text-sm rounded-full">{{ counts.adult }}</p>
                  <button @click="increment('adult')">
                    <Icon name="i-material-symbols-add-circle-outline"/>
                  </button>
                  </div>
                </div>
              </div>
              <div class="flex pl-6 pt-2 justify-evenly content-center">
                <div class="flex flex-1">
                  <p class="flex-1">{{ $t('Booking.childTicket') }}</p>
                  <div class="flex-1 flex">
                  <button @click="decrement('child')">
                  <Icon name="i-mdi-minus-circle-outline"/></button>
                  <p class="border border-gray-300 bg-gray-white w-fit px-4 mx-1 my-auto text-sm rounded-full">{{ counts.child }}</p>
                  <button @click="increment('child')">
                    <Icon name="i-material-symbols-add-circle-outline"/>
                  </button>
                  </div>
                </div>
              </div>

              <div class="flex pl-6 pt-3 justify-evenly content-center">
                <p class="flex-1">{{ $t('Booking.ticketPrice') }}</p>
                <p class="flex-1">NT$ {{ totalPrice }}{{ $t('Booking.pricePerPerson') }}</p>
              </div>


              <div class="flex py-4 px-6 content-center">
                <p class="flex-none pr-6">{{ $t('Booking.contact') }}</p>
                <input
                  v-model="contact"
                  type="text"
                  :placeholder="$t('Booking.required')"
                  class="flex-1 px-2 border-b-2 border-gray-600 bg-inherit focus:outline-none text-sm min-w-0"/>
              </div>

              <div class="flex py-4 px-6 content-center">
                <p class="flex-none pr-2">{{ $t('Booking.phone') }}</p>
                <input
                  v-model="phone"
                  type="text"
                  :placeholder="$t('Booking.required')"
                  class="flex-1 px-2 border-b-2 border-gray-600 bg-inherit focus:outline-none text-sm min-w-0"/>
              </div>

              <div class="flex justify-center">
                <input
                    type="checkbox"
                    id="checkbox"
                    v-model="isChecked"
                    class="h-5 w-3 border-black rounded-full"/>
                    <label for="checkbox" class="ml-2 text-sm text-gray-700">{{ $t('HomePage.readAgreement') }}</label>
                    <PopUpRules/>
              </div>
            <div class="pt-1 flex justify-center pb-4">
                <a-button
                  type="primary"
                  @click="navigateToConfirmation"
                 class="w-2/3 rounded-lg !bg-lwm-400 text-white active:!bg-lime-700">{{ $t('HomePage.confirm') }}</a-button>
              </div>
    </div>
</template>

<script lang="ts" setup>
import { defineComponent,ref,watch } from 'vue';
import type { NotificationPlacement,ConfigProvider } from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/en';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import zhTW from 'ant-design-vue/es/locale/zh_TW';
import enUS from 'ant-design-vue/es/locale/en_US';
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
    // 狀態
    const tab = ref<string>('roundTrip');
    const { t } = useI18n();
    const localPath = useLocalePath();
    const { locale } = useI18n(); 
    const isSwapped = ref(false);
    const DateArrivalShip = ref<Dayjs>();
    const DateShuttle = ref<Dayjs>(); // 選擇的日期
    const DateArrivalShipReturn = ref<Dayjs>();
    const DateShuttleReturn = ref<Dayjs>();
    const TimeArrivalShip = ref<string>('');
    const TimeShuttle = ref<string>('');
    const flightNumber = ref('');
    const flightTime = ref<string>('');
    const ferryTime = ref<string>('');
    const flightTimeReturn = ref<string>('');
    const ferryTimeReturn = ref<string>('');
    const TimeArrivalShipReturn = ref<string>('');
    const TimeShuttleReturn = ref<string>('');
    const isChecked = ref(false); // 定義復選框狀態
    const counts = ref({
      adult: 1,
      child: 1,
    });
    const contact = ref("");
    const phone = ref("");
    const totalPrice = computed(() => {
    const adultCount = counts.value.adult;
    // 计算前两个成人票价为 150，后续成人票价为 100
    return (Math.min(adultCount, 2) * 300) + Math.max(adultCount - 2, 0) * 200;
    });

    const onwardTrip = ref({
      p2: t('Booking.pier'),
      p3: t('Booking.airport'),
    });
    const returnTrip = ref({
      p2: t('Booking.airport'),
      p3: t('Booking.pier'),
    });

    
    const disabledHours = () => {
      return Array.from({ length: 24 }, (_, i) => i).filter(hour => hour < 8 || hour > 18);
    };
    const disabledMinutes = (selectedHour: number | null) => {
      if (selectedHour === 8) {
        return Array.from({ length: 60 }, (_, i) => i).filter(minute => minute < 30); // 8:30 之前禁用
    }
    if (selectedHour === 18) {
        return Array.from({ length: 60 }, (_, i) => i).filter(minute => minute >= 30); // 17:30 之后禁用
    }
    return [];
    };
    const disabledHoursF = () => {
  // 只允许 8 到 17 点
     const ferryTimeHour = dayjs(ferryTime.value, 'HH:mm').hour();
     return Array.from({ length: 24 }, (_, i) => i).filter(hour => hour < ferryTimeHour || hour > 18);
    };

    const disabledMinutesF = (selectedHour: number | null) => {
    const ferryTimeMinute = dayjs(ferryTime.value, 'HH:mm').minute();
    if (selectedHour === 8) {
        return Array.from({ length: 60 }, (_, i) => i).filter(minute => minute < 30); // 8:30 之前禁用
    }
    if (selectedHour === 19) {
        return Array.from({ length: 60 }, (_, i) => i).filter(minute => minute >= 1); // 17:30 之后禁用
    }
    return Array.from({ length: 60 }, (_, i) => i)
    .filter(minute => minute < ferryTimeMinute);
    };
    
    const handleMessageOpen = (open : boolean) => {
      if (open) {
      message.info(t('alertMessage'));
      }
    };
    const handleDatePickerOpen = (open : boolean) => {
    if (open) {
    message.info(t('alertMessage2'));
    }
    };
    const handleMessageOpen2 = (open : boolean) => {
      if (open) {
      message.info(t('alertMessage3'));
      }
    };
    
    watch(TimeArrivalShip, (newTimeShuttle) => {
    //   if (!DateArrivalShip.value) {
    // // 如果 DateArrivalShip 沒有選擇，清空 TimeArrivalShip 並提示
    //     TimeArrivalShip.value = '';
    //     alert('請先選擇到達日期');
    //     return;
    //   }
      if (newTimeShuttle) {
        const newShuttleTime = dayjs(newTimeShuttle, 'HH:mm').add(30, 'minute');
        const newTime = dayjs(newTimeShuttle, 'HH:mm').add(90, 'minute');

        // 如果時間超過午夜，DateShuttle加一天
        // if (newShuttleTime.isAfter(dayjs(newTimeShuttle, 'HH:mm').endOf('day'))) {
        //   DateShuttle.value = DateArrivalShip.value?.add(1, 'day');
        // } else {
        //   DateShuttle.value = DateArrivalShip.value;
        // }

        flightTime.value = newTime.format('HH:mm');
        ferryTime.value = newTime.format('HH:mm');
        TimeShuttle.value = newShuttleTime.format('HH:mm');
      } else {
        // 如果第一個時間清空，第二個時間框也重置
        TimeShuttle.value = '';
        ferryTime.value = '';
        flightTime.value = '';
      }
    });

    watch(TimeArrivalShipReturn, (newTimeShuttleReturn) => {
    //   if (!DateArrivalShipReturn.value) {
    // // 如果 DateArrivalShip 沒有選擇，清空 TimeArrivalShip 並提示
    //     TimeArrivalShipReturn.value = '';
    //     alert('請先選擇到達日期');
    //     return;
    //   }
      if (newTimeShuttleReturn) {
        const newShuttleTimeReturn = dayjs(newTimeShuttleReturn, 'HH:mm').add(30, 'minute');
        const newTimeReturn = dayjs(newTimeShuttleReturn, 'HH:mm').add(90, 'minute');

        // 如果時間超過午夜，DateShuttle加一天
        // if (newShuttleTimeReturn.isAfter(dayjs(newTimeShuttleReturn, 'HH:mm').endOf('day'))) {
        //   DateShuttleReturn.value = DateArrivalShipReturn.value?.add(1, 'day');
        // } else {
        //   DateShuttle.value = DateArrivalShip.value;
        // }

        ferryTimeReturn.value = newTimeReturn.format('HH:mm');
        flightTimeReturn.value = newTimeReturn.format('HH:mm');
        TimeShuttleReturn.value = newShuttleTimeReturn.format('HH:mm');
      } else {
        // 如果第一個時間清空，第二個時間框也重置
        TimeShuttleReturn.value = '';
        ferryTimeReturn.value = '';
        flightTimeReturn.value = '';
      }
    });

    watch(DateArrivalShipReturn, (newValue: Dayjs | undefined) => {
      if (newValue) {
        DateShuttleReturn.value = newValue; // 初始化返回班车时间
      } else {
        DateShuttleReturn.value = undefined; // 如果清空返回船只时间，也清空班车时间
      }
    });
    watch(DateArrivalShip, (newValue: Dayjs | undefined) => {
      if (newValue) {
        DateShuttle.value = newValue; // 初始化返回班车时间
      } else {
        DateShuttle.value = undefined;
        TimeArrivalShip.value = ''; // 如果清空返回船只时间，也清空班车时间
      }
    });

    const disabledDate = (current: Dayjs): boolean => {
    return current && current.isBefore(dayjs().add(1, 'day').startOf('day'));
    };

    const disabledDateAfter = (current: Dayjs): boolean => {
      return current && (!DateArrivalShip.value || current.isBefore(DateArrivalShip.value));
    };

    const disabledDateReturn = (current: Dayjs): boolean => {
      return current && (!DateArrivalShip.value || current.isBefore(DateArrivalShip.value));
    };
    // 方法
    const swapText = () => {
      isSwapped.value = !isSwapped.value;
    };
    const antLocales = {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
    };
    const antLocale = computed(() => antLocales[locale.value] || zhTW);
  
    const openNotification = (placement: NotificationPlacement) => {
      notification.open({
        message: t('HomePage.notification.title'),
        description: t('HomePage.notification.description'),
        placement,
      });
    };

    const increment = (type: 'adult' | 'child') => {
      counts.value[type]++;
    };

    const decrement = (type: 'adult' | 'child') => {
      if (counts.value[type] > 0) {
        counts.value[type]--;
      }
    };

    const navigateToConfirmation = async() => {
      if (!isChecked.value) {
        openNotification('bottom'); // 如果未勾選，彈出通知
      } else {
        let user_id = userStore.user_id;
        if(!user_id){
          await userStore.loginWithLINE();
        }
        const form = {
          trip_type: tab.value,
          user_id: 7,
          adult_num: counts.value.adult,
          child_num: counts.value.child,
          contact_phone: phone.value,
          totalprice: totalPrice.value,
          contact_name: contact.value,
          departure_loc: isSwapped.value ? 'Booking.airport' : 'Booking.pier',
          destination_loc: isSwapped.value ? 'Booking.pier' : 'Booking.airport',
          return_departure: isSwapped.value ? 'Booking.pier' : 'Booking.airport',
          return_destination: isSwapped.value ? 'Booking.airport' : 'Booking.pier',
          arrivalpoint_date: DateArrivalShip.value? DateArrivalShip.value.format("YYYY-MM-DD") : undefined, 
          arrivalpoint_time: TimeArrivalShip.value,
          return_arrival_date:DateArrivalShipReturn.value? DateArrivalShipReturn.value.format("YYYY-MM-DD") : undefined, 
          return_arrival_time: TimeArrivalShipReturn.value,
          flight_num: flightNumber.value || undefined,
          ferry_time: ferryTime.value || undefined,
          flight_time: flightTime.value || undefined,
          shuttle_date: DateShuttle.value? DateShuttle.value.format("YYYY-MM-DD") : undefined,
          shuttle_time: TimeArrivalShip.value,
          return_shuttle_date: DateShuttleReturn.value?DateShuttleReturn.value.format("YYYY-MM-DD") : undefined, 
          return_shuttle_time: TimeShuttleReturn.value, 
        }; 
        try{
          const response = await $fetch('/api/POSTbooking', {
            method: 'POST',
            body: form
          });
          console.log(response);
          if (response?.id) {
            const bookingId =  response.id[0].id;
           console.log("id check2:" + bookingId);
          const path = localPath('/confirmationPage/' + bookingId);  
          navigateTo({
            path,
            query: {
              isSwapped: String(isSwapped.value),
              },
          });
        }
      }
        catch{
          alert(t('alertMessage4'));
        }
      }
    };
</script>
