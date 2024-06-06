<template>
   <div class="grid gap-4 place-items-start justify-items-stretch">
      <u-card class="w-[33%] place-self-center">
         <div class="grid gap-4">
            <div class="flex flex-col items-center gap-4">
               <img
                  :src="user?.profile_picture || 'https://avatars.githubusercontent.com/u/739984?v=4'"
                  class="rounded-full h-40 w-40 object-cover"
               />

               <div class="flex flex-col items-center justify-center">
                  <p class="text-gray-700">
                     {{ user?.name }}
                  </p>
                  <span class="text-gray-400 text-sm">
                     {{ user?.email }}
                  </span>
               </div>
            </div>

            <u-divider></u-divider>

            <dl class="grid grid-cols-3 gap-4 text-sm mb-4">
               <dt class="font-medium truncate">
                  NIP
               </dt>
               <dd class="before:content-[':'] before:me-4 col-span-2 truncate">
                  {{ user?.userable?.employee_number || '-' }}
               </dd>
               <dt class="font-medium truncate">
                  Status Akun
               </dt>
               <dd class="before:content-[':'] before:me-4 col-span-2 truncate">
                  <u-badge
                     :color="user?.status === 'ACTIVE' ? 'emerald' : 'red'"
                     class="capitalize"
                     variant="subtle"
                  >
                     {{ user?.status.toLowerCase() }}
                  </u-badge>
               </dd>
            </dl>

            <div class="flex flex-col gap-2">
               <u-button
                  block
                  variant="outline"
                  icon="i-heroicons-pencil-square-20-solid"
                  @click.stop="store.showDialog('profile-update', 'Sunting Informasi Akun')"
               >
                  Sunting Informasi Akun
               </u-button>

               <u-button
                  block
                  variant="outline"
                  icon="i-ph-password"
               >
                  Ubah Kata Sandi
               </u-button>

               <u-button
                  block
                  color="red"
                  icon="i-heroicons-arrow-left-start-on-rectangle-20-solid"
                  @click.stop="store.showDialog('logout', 'Keluar')"
               >
                  Keluar
               </u-button>
            </div>
         </div>
      </u-card>
   </div>
</template>

<script setup lang="ts">
const store = useAppStore()
store.setPageTitle('Home')
store.setBreadcrumb([
   {
      label: 'Home',
      to: '/'
   },
   {
      label: 'Profile'
   }
])

const authStore = useAuthStore()
const user = computed(() => authStore.getUser as Model.User<Model.Supervisor>)
</script>