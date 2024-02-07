<template>
   <app-header class="fixed inset-x-0 top-0 z-20"></app-header>

   <main class="relative mt-[105px] mb-4 min-h-[calc(100dvh-105px-56px-1rem)]">
      <div class="container mx-auto">
         <app-title></app-title>
         <slot/>
      </div>
   </main>

   <app-footer></app-footer>
</template>

<script setup lang="ts">
onBeforeUnmount(() => {
   useAppStore().clearDialog()
})
</script>