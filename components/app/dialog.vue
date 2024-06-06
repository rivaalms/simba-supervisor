<template>
   <u-modal
      v-model="store.dialog.show"
      :ui="ui"
   >
      <u-card :ui="{ base: 'overflow-visible' }">
         <template #header>
            <div class="flex items-center justify-between">
               <p>{{ store.dialog.title }}</p>

               <u-button
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-x-mark-20-solid"
                  @click.stop="store.clearDialog()"
               ></u-button>
            </div>
         </template>

         <component :is="component"></component>
      </u-card>
   </u-modal>
</template>

<script setup lang="ts">
const store = useAppStore()

const component = ref(resolveComponent('DialogPlaceholder'))
const width = ref('sm:max-w-lg')

const componentMap : Wildcard = {
   // 'logout': () => import('@/components/dialog/logout.vue'),
   'profile-update': () => import('@/components/dialog/form/profile.vue')
}

const widthMap : Wildcard = {
   // 'data-create': 'sm:max-w-2xl',
}

const ui = computed(() => ({
   base: 'overflow-visible',
   width: width.value
}))

watch(() => store.dialog.show, async (val) => {
   if (!val) {
      store.clearDialog()
      setTimeout(() => {
         width.value = 'sm:max-w-lg'
         component.value = resolveComponent('DialogPlaceholder')
      }, 300)
   } else {
      const _component = componentMap[store.dialog.id]
      if (_component) component.value = (await _component()).default
      else component.value = resolveComponent('DialogPlaceholder')

      width.value = widthMap[store.dialog.id] || 'sm:max-w-lg'
   }
})
</script>