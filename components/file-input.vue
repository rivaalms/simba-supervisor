<script setup lang="ts">
type Props = {
   disabled?: boolean
   placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
   disabled: false,
   placeholder: 'Tidak ada file terpilih'
})

const model = defineModel({
   required: true,
})

const fileName = ref<string | null>(null)
const filePicker = ref()

function update(value: File) {
   if (value) {
      model.value = value
      fileName.value = value.name
   }
}

</script>

<template>
   <input
      type="file"
      class="hidden"
      ref="filePicker"
      @input="(e: any) => update(e.target.files[0])"
   />

   <u-button-group
      class="w-full"
   >
      <u-button
         icon="i-heroicons-document-arrow-up-20-solid"
         color="gray"
         @click.stop="filePicker.click()"
      ></u-button>
      <u-input
         :value="fileName"
         class="flex-1"
         input-class="cursor-pointer"
         readonly
         :disabled="disabled"
         :placeholder="placeholder"
         @click.stop="filePicker.click()"
      ></u-input>
   </u-button-group>
</template>