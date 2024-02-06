<template>
   <nuxt-layout>
      <nuxt-page/>
   </nuxt-layout>

   <u-notifications>
      <template #title="{ title }">
         <p class="font-semibold">{{ title }}</p>
      </template>
   </u-notifications>
</template>

<script setup lang="ts">
useHead({
   titleTemplate: (title) => {
      return title ? `${title} - SIMBA Supervisor` : 'SIMBA Supervisor'
   }
})
</script>
