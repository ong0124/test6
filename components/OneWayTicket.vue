<template>
    <div class="flex-col p-4">
        <p class="border-l-4 my-3 border-lwm-400 text-justify pl-2">{{ $t('HomePage.oneWay') }}</p>
        <div class="flex justify-around">
                <div class="flex"><Icon name="i-material-symbols-directions-car" class="bg-gray-500 w-6 h-6"/>
                  <p class="flex-1 text-gray-500 ml-2">{{ $t('Booking.departure') }}</p>
                </div>
                <div class="flex"><Icon name="i-mdi-map-marker-radius-outline" class="bg-gray-500 w-6 h-6"/>
                  <p class="flex-1 text-gray-500 ml-2">{{ $t('Booking.arrival') }}</p>
                </div>
        </div>
              <div class="flex justify-evenly">
                  <!-- 根據狀態決定順序 -->
                  <p v-if="isSwapped" class="ml-auto text-2xl">{{ $t('Booking.airport') }}</p>
                  <p v-else class="ml-auto text-2xl">{{ $t('Booking.pier') }}</p>
                  
                  <Icon
                    name="fa6-solid:rotate"
                    class="mx-auto bg-lwm-400 w-7 h-7 cursor-pointer transition-transform duration-500"
                    :class="{'rotate-180': isSwapped}"
                    @click="swapText"
                  />

                  <p v-if="isSwapped" class="mr-auto text-2xl">{{ $t('Booking.pier') }}</p>
                  <p v-else class="mr-auto text-2xl">{{ $t('Booking.airport') }}</p>
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
                    :minute-step="isSwapped ? 5 : 30"
                    :hour-step="1"
                    :disabled-hours="disabledHours"
                    :disabled-minutes="disabledMinutes"
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
                      />
                  </a-space>
                  <a-time-picker
                    v-model:value="TimeShuttle"
                    :minute-step="30"
                    value-format="HH:mm"
                    :disabled="true"
                    format="HH:mm"
                  ></a-time-picker>
                </div>
              </a-config-provider>
              <DashLine/>
              <div class="flex pl-6 pt-2 justify-evenly content-center">
                <div class="flex flex-1 ">
                  <p class="flex-1">{{ $t('Booking.adultTicket') }}</p>
                  <div class="flex-1 flex  ">
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
                <div class="flex flex-1 ">
                  <p class="flex-1">{{ $t('Booking.childTicket') }}</p>
                  <div class="flex-1 flex ">
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
                  type="text"
                  :placeholder="$t('Booking.required')"
                  v-model="contact"
                  class="flex-1 px-2 border-b-2 border-gray-600 bg-inherit focus:outline-none text-sm min-w-0"/>
              </div>

              <div class="flex py-4 px-6 content-center">
                <p class="flex-none pr-2">{{ $t('Booking.phone') }}</p>
                <input
                  type="text"
                  :placeholder="$t('Booking.required')"
                  v-model="phone"
                  class="flex-1 px-2 border-b-2 border-gray-600 bg-inherit focus:outline-none text-sm min-w-0"/>
              </div>
              
              
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
</template>

<script lang="ts" setup>
import { defineComponent,ref,watch } from 'vue';
import type { NotificationPlacement} from 'ant-design-vue';
import { useI18n } from 'vue-i18n';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/zh-tw';
import 'dayjs/locale/en';
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import zhTW from 'ant-design-vue/es/locale/zh_TW';
import enUS from 'ant-design-vue/es/locale/en_US';

    const { locale } = useI18n(); 
    const localPath = useLocalePath();
    const isChecked = ref(false); 
    const DateArrivalShip = ref<Dayjs>();
    const DateShuttle = ref<Dayjs>();
    const TimeArrivalShip = ref<string>('');
    const TimeShuttle = ref<string>(''); 
    const phone = ref('');
    const flightNumber = ref('');
    const flightTime = ref<string>('');
    const ferryTime = ref<string>('');
    const contact = ref(''); 
    const counts = ref({ adult: 1, child: 1 }); 
    const tab = ref<string>('oneWay');
    const totalPrice = computed(() => {
    const adultCount = counts.value.adult;
 
    return (Math.min(adultCount, 2) * 150) + Math.max(adultCount - 2, 0) * 100;
    });
    const isSwapped = ref(false);
    
    const antLocales = {
      'zh-CN': zhCN,
      'zh-TW': zhTW,
      'en-US': enUS,
    };
    const antLocale = computed(() => antLocales[locale.value] || zhTW);
    const { t } = useI18n();
    
    const disabledHours = () => {
      // 只允许 8 到 17 点
      return Array.from({ length: 24 }, (_, i) => i).filter(hour => hour < 8 || hour > 18);
    };
    
    const disabledMinutes = (selectedHour: number | null) => {
      if (selectedHour === 8) {
        return Array.from({ length: 60 }, (_, i) => i).filter(minute => minute < 30); // 8:30 之前禁用
      }
      if (selectedHour === 18) {
        return Array.from({ length: 60 }, (_, i) => i).filter(minute => minute >= 1); // 17:30 之后禁用
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
  
  watch(TimeArrivalShip, (newTimeShuttle) => {
    //   if (!DateArrivalShip.value) {
      // // 如果 DateArrivalShip 沒有選擇，清空 TimeArrivalShip 並提示
      //     TimeArrivalShip.value = '';
      //     alert(t('alertMessage'));
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
        
        const openNotification = (placement: NotificationPlacement) => {
          notification.open({
            message: t('HomePage.notification.title') ,
            description: t('HomePage.notification.description'),
            placement,
          });
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
        const handleMessageOpen = (open : boolean) => {
          if (open) {
            message.info(t('alertMessage'));
          }
    };

    watch(DateArrivalShip, (newValue: Dayjs | undefined) => {
      if (newValue) {
        DateShuttle.value = newValue; // 初始化返回班車時間
        
        // 重置 TimeArrivalShip 的值，防止顯示默認時間
        TimeArrivalShip.value = '';
      } else {
        DateShuttle.value = undefined; // 如果清空返回船只時間，也清空班車時間
        TimeArrivalShip.value = ''; // 清空時間選擇器
      }
    });

    const swapText = () => {
    isSwapped.value = !isSwapped.value;
    };
    
    const disabledDate = (current: Dayjs): boolean => {
       return current && current.isBefore(dayjs().add(1, 'day').startOf('day'))
    };
    const increment = (type: 'adult' | 'child') => {
      counts.value[type]++;
    };

    const decrement = (type: 'adult' | 'child') => {
      if (counts.value[type] > 0) {
        counts.value[type]--;
      }
    };

    // 點擊確認按鈕的邏輯
    const navigateToConfirmation = async () => {
      if (!isChecked.value) {
        openNotification('bottom'); // 如果未勾選，彈出通知
      } else {
        // let user_id = userStore.user_id;
        // if(!user_id){
        //   await userStore.loginWithLINE();
        // }
        const user_id = 8;
        const form = {
          trip_type: tab.value,
          user_id: user_id,
          adult_num: counts.value.adult,
          child_num: counts.value.child,
          contact_phone: phone.value,
          totalprice: totalPrice.value,
          contact_name: contact.value,
          departure_loc: isSwapped.value ? 'Booking.airport' : 'Booking.pier',
          destination_loc: isSwapped.value ? 'Booking.pier' : 'Booking.airport',
          return_departure: undefined,
          return_destination: undefined,
          arrivalpoint_date: DateArrivalShip.value? DateArrivalShip.value.format("YYYY-MM-DD") : undefined, 
          arrivalpoint_time: TimeArrivalShip.value,
          return_arrival_date: undefined, 
          return_arrival_time: undefined,
          flight_num: flightNumber.value || undefined,
          ferry_time: ferryTime.value || undefined,
          flight_time: flightTime.value || undefined,
          shuttle_date: DateShuttle.value? DateShuttle.value.format("YYYY-MM-DD") : undefined,
          shuttle_time: TimeArrivalShip.value,
          return_shuttle_date: undefined , 
          return_shuttle_time: undefined, 
        }; 
        try{
          const response = await $fetch('/api/POSTbooking', {
            method: 'POST',
            body: form
          });
          if (response?.id) {
          navigateTo(localPath('/'));
          }
        }catch{
          alert(t('alertMessage4'));
          }
      }
    };

</script>
