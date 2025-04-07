<template>
  <div v-if="modelValue" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg">
      <h2 class="text-xl font-bold mb-4 text-center">
        {{ isEdit ? '編輯用戶' : '新增用戶' }}
      </h2>

      <div v-if="isEdit" class="mb-4 text-blue-500 font-medium">
        編輯模式：你正在修改用戶資料
      </div>

      <div class="mb-4">
        <div class="mb-1 text-sm text-gray-700">用戶編號</div>
        <input v-model="form.userId" type="text" class="w-full border px-3 py-2 rounded" />
      </div>

      <div class="mb-4">
        <div class="mb-1 text-sm text-gray-700">LINE名字</div>
        <input v-model="form.lineName" type="text" class="w-full border px-3 py-2 rounded" />
      </div>

      <div class="mb-4">
        <div class="mb-1 text-sm text-gray-700">加入時間</div>
        <input v-model="form.joinDate" type="date" class="w-full border px-3 py-2 rounded" />
      </div>

      <div class="mb-4">
        <div class="mb-1 text-sm text-gray-700">生日</div>
        <input v-model="form.birthday" type="date" class="w-full border px-3 py-2 rounded" />
      </div>

      <div class="flex justify-end space-x-2">
        <button @click="$emit('update:modelValue', false)" class="px-4 py-2 bg-gray-300 rounded">取消</button>
        <button @click="submit" class="px-4 py-2 bg-green-500 text-white rounded">
          {{ isEdit ? '更新' : '提交' }}
        </button>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  isEdit?: boolean  
}>()

const emit = defineEmits(['update:modelValue', 'submit'])

const form = ref({
  userId: '',
  lineName: '',
  joinDate: '',
  birthday: ''
})

const submit = () => {
  emit('submit', form.value)
  emit('update:modelValue', false)
}


</script>