<template>
   <div class="py-6 flex items-center justify-between gap-2">
      <h1 class="font-medium text-lg">
         {{ store.getPageTitle }}
      </h1>

      <u-breadcrumb :links="store.breadcrumb">
         <template #divider>
            <u-icon name="i-heroicons-chevron-right-20-solid"></u-icon>
         </template>
      </u-breadcrumb>
   </div>
</template>

<script setup lang="ts">
const store = useAppStore()
</script>