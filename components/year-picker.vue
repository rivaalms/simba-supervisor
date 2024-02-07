<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

type Props = {
   placeholder?: string
   callback?: (() => any)
   disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
   placeholder: 'Pilih tahun ajaran...',
   disabled: false
})

const dayjs = useDayjs()

const model = defineModel<string>({
   default: `${(useDayjs())().year()}-${(useDayjs())().add(1, 'year').year()}`,
   required: true
})

const date = ref(
   model.value
   ? dayjs({ year: model.value.split('-')[0] }).year()
   : dayjs().year()
   )

function update(value: string) {
   model.value = `${dayjs({ year: value }).year()}-${dayjs({ year: value }).add(1, 'year').year()}`

   if (props.callback) props.callback()
}

watch(() => date.value, () => {
   update(date.value.toString())
})
</script>

<template>
   <vue-date-picker
      v-model="date"
      year-picker
      auto-apply
      class="!w-auto"
      :disabled="props.disabled"
   >
      <template #trigger>
         <u-input
            :value="model"
            input-class="cursor-pointer"
            readonly
            :disabled="disabled"
            icon="i-heroicons-calendar-days-16-solid"
            :placeholder="props.placeholder"
         ></u-input>
      </template>
   </vue-date-picker>
</template>