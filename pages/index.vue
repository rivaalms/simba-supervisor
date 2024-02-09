<template>
   <div class="grid gap-4 grid-cols-6 place-items-start justify-items-stretch">
      <u-card class="col-span-4 ring-0 bg-gradient-to-br from-teal-500 from-25% to-sky-600">
         <div class="flex gap-4 items-center">
            <img src="/img/hello.svg" alt="Hello" class="h-96 w-auto">

            <div class="flex flex-col gap-4">
               <p class="text-white font-semibold text-xl">
                  Selamat datang, {{ user?.name }}
               </p>

               <div class="text-white">
                  <p>
                     Selamat datang di Sistem Informasi Manajemen Berkas Administrasi Sekolah.
                  </p>
                  <p>
                     Aplikasi ini dikembangkan oleh <span class="font-semibold">Riva Almero</span>.
                  </p>
               </div>

               <div class="flex items-center gap-4">
                  <u-button
                     color="rose"
                     size="md"
                     icon="i-heroicons-clipboard-document-list-16-solid"
                     to="/data"
                     exact
                  >
                     Lihat daftar data
                  </u-button>
               </div>
            </div>
         </div>
      </u-card>

      <div class="col-span-2 grid gap-4">
         <u-card>
            <div class="grid grid-cols-2 gap-4">
               <div class="col-span-2">
                  <p class="text-gray-700 truncate mb-1">
                     Jumlah Sekolah Binaan
                  </p>
                  <p class="text-xl text-gray-800">
                     {{ schoolsCount?.total }}
                  </p>
               </div>

               <u-card
                  v-for="item in schoolsCount?.by_type"
                  class="ring-0 shadow-md hover:shadow-lg transition-shadow"
               >
                  <p class="text-gray-700 truncate mb-1">
                     {{ item.type }}
                  </p>
                  <p class="text-xl text-gray-800">
                     {{ item.count }}
                  </p>
               </u-card>
            </div>
         </u-card>

         <u-card>
            <div class="grid gap-4">
               <div class="flex items-center gap-2">
                  <vue-date-picker
                     v-model="dataCountFilter.start_year"
                     year-picker
                     auto-apply
                     class="!w-auto shrink grow-0"
                  >
                     <template #trigger>
                        <u-input
                           :value="dataCountFilter.start_year"
                           input-class="cursor-pointer"
                           readonly
                           icon="i-heroicons-calendar-days-16-solid"
                           placeholder="Tahun mulai"
                        ></u-input>
                     </template>
                  </vue-date-picker>

                  <span class="text-sm text-gray-700">
                     sampai
                  </span>

                  <vue-date-picker
                     v-model="dataCountFilter.end_year"
                     year-picker
                     auto-apply
                     class="!w-auto shrink grow-0"
                  >
                     <template #trigger>
                        <u-input
                           :value="dataCountFilter.end_year"
                           input-class="cursor-pointer"
                           readonly
                           icon="i-heroicons-calendar-days-16-solid"
                           placeholder="Tahun selesai"
                        ></u-input>
                     </template>
                  </vue-date-picker>
               </div>

               <div class="">
                  <p class="text-gray-700 truncate mb-1">
                     Jumlah Data
                  </p>
                  <p class="text-xl text-gray-800">
                     {{ dataCount?.total }}
                  </p>
               </div>

               <div class="grid gap-4 grid-cols-2">
                  <p class="col-span-2 text-gray-500 text-sm truncate">
                     Jumlah Data Berdasarkan Status
                  </p>

                  <u-card
                     v-for="item in dataCount?.data_by_status"
                     class="ring-0 shadow-md hover:shadow-lg transition-shadow"
                     :class="[ mapDataStatusColor(item.name) ]"
                  >
                     <p class="truncate mb-1">
                        {{ item.name }}
                     </p>
                     <p class="text-xl">
                        {{ item.count }}
                     </p>
                  </u-card>
               </div>
            </div>
         </u-card>
      </div>
   </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const dayjs = useDayjs()
const store = useAppStore()
store.setPageTitle('Home')
store.setBreadcrumb([
   {
      label: 'Home'
   }
])
const user = computed(() => useAuthStore().getUser)

const { data: schoolsCount, pending: schoolsCountPending, refresh: fetchSchoolsCount } = await useAsyncData('schools-count', () => countSchools())

const dataCountFilter = ref<Wildcard>({
   start_year: dayjs().year(),
   end_year: dayjs().year()
})

const { data: dataCount, pending: dataCountLoading, refresh: fetchDataCount } = await useAsyncData('data-count', () => countData(dataCountFilter.value), { watch: [ () => dataCountFilter.value.start_year, () => dataCountFilter.value.end_year ] })

const mapDataStatusColor = (status: string) => {
   switch (status.toLowerCase()) {
      case 'terverifikasi': return 'bg-emerald-50 text-emerald-500'
      case 'verifikasi revisi': return 'bg-cyan-50 text-cyan-500'
      case 'revisi': return 'bg-amber-50 text-amber-500'
      case 'sedang diverifikasi': return 'bg-gray-50 text-gray-500'
      default: break
   }
}
</script>