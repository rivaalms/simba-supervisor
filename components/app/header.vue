<template>
   <header class="py-2 grid divide-y gap-2 border-b isolate backdrop-blur-md shadow transition-all duration-500" :class="[scrollY > 30 ? 'bg-white/50' : 'bg-white']">
      <div class="px-2 flex justify-between">
         <u-link
            to="/"
            class="p-2"
         >
            {{ useRuntimeConfig().public.appName }}
         </u-link>

         <u-dropdown :items="dropdownItems">
            <u-button
               variant="ghost"
               color="gray"
               trailing-icon="i-heroicons-chevron-down-20-solid"
            >
               {{ user?.name }}
            </u-button>

            <template #logout="{ item }">
               <u-icon
                  :name="item.icon"
                  class="text-red-500"
               ></u-icon>

               <span class="truncate text-red-500">
                  {{ item.label }}
               </span>
            </template>
         </u-dropdown>
      </div>

      <div class="px-2 pt-2 flex items-center border-gray-200 gap-4">
         <u-button
            v-for="(item, index) in navbarItems"
            :key="index"
            :variant="isRouteMatch(item.to as string) ? 'soft': 'ghost'"
            :color="isRouteMatch(item.to as string) ? 'primary' : 'gray'"
            :class="[scrollY > 30 ? 'bg-opacity-25 hover:bg-opacity-25' : '']"
            :to="item.to"
         >
            <template #leading>
               <u-icon :name="(item.icon as string)"></u-icon>
            </template>
            {{ item.label }}
         </u-button>
      </div>
   </header>
</template>

<script setup lang="ts">
const store = useAppStore()
const authStore = useAuthStore()
const user = authStore.getUser

const currentRoute = computed(() => useRoute().path)
const isRouteMatch = (route: string) => (currentRoute.value === route)

const navbarItems = computed(() => useNavbarRoutes)

const dropdownItems = computed(() => [
   [
      {
         label: 'Profil',
         avatar: {
            src: user?.profile_picture || 'https://avatars.githubusercontent.com/u/739984?v=4'
         },
         to: '/profile'
      }
   ],
   [
      {
         label: 'Keluar',
         slot: 'logout',
         icon: 'i-heroicons-arrow-left-start-on-rectangle-16-solid',
         click: async () => {
            await authStore.logout()
               .then(() => {
                  store.notify('info', 'Berhasil log out', 'logout')
               })
         }
      }
   ]
])

const scrollY = ref(0)

onBeforeMount(() => {
   document.addEventListener('scroll', (e: any) => {
      scrollY.value = e.target.scrollingElement.scrollTop
   })
})

onBeforeUnmount(() => {
   document.removeEventListener('scroll', (e: any) => {
      scrollY.value = e.target.scrollingElement.scrollTop
   })
})
</script>