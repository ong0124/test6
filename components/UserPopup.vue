<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg">
      <h2 class="text-xl font-bold mb-4 text-center">
        {{ isEdit ? '編輯用戶' : '新增用戶' }}
      </h2>
      <div class="mb-4">
        <div class="mb-1 text-sm text-gray-700">用戶編號：</div>
        <div v-if="isEdit" class="w-full border px-3 py-2 rounded bg-gray-100">
          {{ form.id }}
        </div>
        
        <!-- 新增模式：輸入框 -->
        <input
          v-else
          v-model="form.id"
          type="number"
          class="w-full border px-3 py-2 rounded"
        />
      </div>

      <div class="mb-4">
        <div class="mb-1 text-sm text-gray-700">LINE名字：</div>
        <input v-model="form.lineName" type="text" class="w-full border px-3 py-2 rounded" />
      </div>

      

      <div class="mb-4 flex items-center">
        <div class="mb-1 text-sm text-gray-700 pr-6">生日：</div>
        <a-config-provider :locale="zhTW">
        <a-date-picker
          v-model:value="form.birthday"/>
        </a-config-provider>
      </div>

      <div class="flex justify-end space-x-2">
        <button @click="$emit('update:modelValue', false)" class="px-4 py-2 bg-gray-300 rounded">取消</button>
        <button @click="submit" class="px-4 py-2 bg-amber-500 text-white rounded">
          {{ isEdit ? '更新' : '提交' }}
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import zhTW from 'ant-design-vue/es/locale/zh_TW';
import 'dayjs/locale/zh-tw';
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { reactive, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
  isEdit?: boolean  
}>()

const emit = defineEmits(['update:modelValue', 'submit', 'submitted'])

const form = reactive({
  id: '',
  lineName: '',
  birthday: undefined as Dayjs | undefined
});

const setFormData = (data: any) => {
  console.log('Incoming data:', data)
  form.id = data.id ?? '';
  form.lineName = data.full_name ?? '';
  form.birthday = data.birthday ? dayjs(data.birthday) : undefined; // 如果没有日期，使用 undefined
};

watch(() => props.modelValue, (visible) => {
  if (visible && !props.isEdit) {
    resetForm()
  }
});

const resetForm = () => {
  form.id = '';
  form.lineName = '';
  form.birthday = undefined;
};

const submit = async () => {
  try {
    if (props.isEdit) {
      // 如果是编辑模式，则调用更新 API
      await updateUser();
      console.log("id", form.id);
    } else {
      // 如果是创建模式，则调用创建 API
      await createUser();
      console.log("id", form.id);
    }
    // 提交后关闭弹窗
    emit('update:modelValue', false);
    emit('submitted');  
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};

const updateUser = async () => {
  try {
    await $fetch('/api/EditUser', {
      method: 'PUT',
      body: { 
        id:form.id,
        full_name:form.lineName, 
        birthday: form.birthday ? dayjs(form.birthday).format('YYYY-MM-DD') : null
      }
    });
  } catch {
    alert('Edit blog error');
    console.log("form", form);
  }
};

const createUser = async () => {
  try {
    const response = await $fetch('/api/POSTUser', {
      method: 'POST',
      body: { 
        id:form.id,
        full_name:form.lineName, 
        birthday: form.birthday ? dayjs(form.birthday).format('YYYY-MM-DD') : null
      } 
    });
    if (response) {
      alert("添加成功")
    } else {
      alert("Post Failed: No valid response");
    }
  } catch (error) {
    console.error("PostData 失败:", error);
    alert("提交失败");
    console.log("form", form); 
  }
};

defineExpose({
  setFormData
});
</script>

