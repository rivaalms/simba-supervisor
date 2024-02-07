<template>
   {{ user }}
</template>

<script setup lang="ts">
const store = useAppStore()
store.setPageTitle('Home')
store.setBreadcrumb([
   {
      label: 'Home'
   }
])
const user = computed(() => useAuthStore().getUser)
</script>