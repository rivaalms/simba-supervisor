<template>
   <div class="grid gap-4 grid-cols-12 place-items-start justify-items-stretch">
      <div class="col-span-3">
         <u-card>
            <dialog-placeholder v-if="loading"></dialog-placeholder>

            <div v-else class="grid gap-4">
               <div class="flex flex-col items-center gap-4">
                  <img
                     :src="school?.user?.profile_picture || 'https://avatars.githubusercontent.com/u/739984?v=4'"
                     class="rounded-full h-40 w-40 object-cover"
                  >

                  <div class="flex flex-col items-center justify-center">
                     <p class="text-gray-700">
                        {{ school?.user?.name }}
                     </p>
                     <span class="text-gray-400 text-sm">
                        {{ school?.user?.email }}
                     </span>
                  </div>
               </div>

               <u-divider></u-divider>

               <div class="grid gap-y-2 grid-cols-3 text-sm">
                  <p class="text-gray-500">Kepala Sekolah</p>
                  <p class="col-span-2">{{ school?.principal }}</p>
                  <p class="text-gray-500">Alamat</p>
                  <p class="col-span-2">{{ school?.address }}</p>
                  <p class="text-gray-500">Status</p>
                  <span class="col-span-2">
                     <u-badge
                        :color="school?.user?.status === 'ACTIVE' ? 'emerald' : 'red'"
                        variant="subtle"
                     >
                        {{ school?.user?.status }}
                     </u-badge>
                  </span>
               </div>
            </div>
         </u-card>
      </div>

      <div class="col-span-9 grid gap-4">
         <u-card>
            <div class="grid grid-cols-2 gap-4 place-items-start justify-items-stretch">
               <div class="col-span-2 flex justify-between items-center">
                  <p>Informasi Siswa & Guru</p>

                  <year-picker
                     v-model="filter.year"
                  ></year-picker>
               </div>

               <u-card class="ring-0 shadow hover:shadow-lg transition-all">
                  <div class="grid gap-4">
                     <div>
                        <p class="mb-1 text-gray-600">Jumlah Siswa</p>
                        <p class="text-xl font-semibold">{{ studentCount }}</p>
                     </div>

                     <u-table
                        class="min-h-[210px] max-h-[210px] overflow-y-auto"
                        :columns="studentsTableHeader"
                        :rows="students || []"
                        :loading="studentsLoading"
                     ></u-table>
                  </div>
               </u-card>

               <u-card class="ring-0 shadow hover:shadow-lg transition-all">
                  <div class="grid gap-4">
                     <div>
                        <p class="mb-1 text-gray-600">Jumlah Guru</p>
                        <p class="text-xl font-semibold">{{ teacherCount }}</p>
                     </div>

                     <u-table
                        class="min-h-[210px] max-h-[210px] overflow-y-auto"
                        :columns="teacherTableHeader"
                        :rows="teachers || []"
                        :loading="teachersLoading"
                     ></u-table>
                  </div>
               </u-card>
            </div>
         </u-card>

         <u-card>
            <div class="grid grid-cols-2 gap-4 place-items-start justify-items-stretch">
               <div class="col-span-2 flex justify-between items-center">
                  <p>Informasi Pertumbuhan</p>

                  <div class="flex items-center gap-2">
                     <vue-date-picker
                        v-model="growthFilter.start_year"
                        year-picker
                        auto-apply
                        class="!w-auto"
                     >
                        <template #trigger>
                           <u-input
                              :value="growthFilter.start_year"
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
                        v-model="growthFilter.end_year"
                        year-picker
                        auto-apply
                        class="!w-auto"
                     >
                        <template #trigger>
                           <u-input
                              :value="growthFilter.end_year"
                              input-class="cursor-pointer"
                              readonly
                              icon="i-heroicons-calendar-days-16-solid"
                              placeholder="Tahun selesai"
                           ></u-input>
                        </template>
                     </vue-date-picker>
                  </div>
               </div>

               <u-card class="ring-0 shadow hover:shadow-lg transition-all">
                  <div class="grid gap-4">
                     <p class="text-gray-600">Pertumbuhan Siswa</p>

                     <apexchart
                        :options="chartOptions"
                        :series="studentsChartData"
                     ></apexchart>
                  </div>
               </u-card>

               <u-card class="ring-0 shadow hover:shadow-lg transition-all">
                  <div class="grid gap-4">
                     <p class="text-gray-600">Pertumbuhan Guru</p>

                     <apexchart
                        :options="chartOptions"
                        :series="teachersChartData"
                     ></apexchart>
                  </div>
               </u-card>
            </div>
         </u-card>
      </div>
   </div>
</template>

<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const schoolId = computed(() => parseInt(useRoute().params.id as string))

const store = useAppStore()
store.setPageTitle('Detail Sekolah')
store.setBreadcrumb([
   { label: 'Home', to: '/' },
   { label: 'Sekolah', to: '/schools' },
   { label: 'Detail' }
])

const dayjs = useDayjs()

const filter = ref<Wildcard>({
   year: `${dayjs().year()}-${dayjs().add(1, 'year').year()}`,
   school_id: schoolId.value
})

const growthFilter = ref<API.Request.Query.Growth>({
   start_year: dayjs().subtract(5, 'years').year(),
   end_year: dayjs().year()
})

const studentsTableHeader = computed(() => [
   { key: 'grade', label: 'Kelas' },
   { key: 'islam', label: 'Islam' },
   { key: 'kristen', label: 'Kristen' },
   { key: 'katolik', label: 'Katolik' },
   { key: 'hindu', label: 'Hindu' },
   { key: 'buddha', label: 'Buddha' },
   { key: 'konghucu', label: 'Konghucu' },
   { key: 'total', label: 'Jumlah' },
])

const teacherTableHeader = computed(() => [
   { key: 'subject', label: 'Mata Pelajaran' },
   { key: 'value', label: 'Jumlah' }
])

const { data: school, pending: loading, refresh } = await useAsyncData('school', () => getSchoolDetails(schoolId.value))

const { data: students, pending: studentsLoading, refresh: fetchStudents } = await useAsyncData('students', () => getStudents(filter.value as API.Request.Query.Student).then(resp => mapStudents(resp)), { watch: [ () => filter.value.year ] })

const { data: teachers, pending: teachersLoading, refresh: fetchTeachers } = await useAsyncData('teachers', () => getTeachers(filter.value as API.Request.Query.Teacher).then(resp => mapTeachers(resp)), { watch: [ () => filter.value.year ] })

const studentCount = computed(() => {
   if (!students.value) return 0
   return students.value.map(student => student.total).reduce((sum, current) => sum + current, 0)
})

const teacherCount = computed(() => {
   if (!teachers.value) return 0
   return teachers.value.map(teacher => teacher.value as number).reduce((sum, current) => sum + current, 0)
})

const { data: studentsGrowth, pending: studentsGrowthLoading, refresh: fetchStudentsGrowth } = await useAsyncData('students-growth', () => getStudentsGrowth(schoolId.value, growthFilter.value), { watch: [ () => growthFilter.value.start_year, () => growthFilter.value.end_year ] })

const { data: teachersGrowth, pending: teachersGrowthLoading, refresh: fetchTeachersGrowth } = await useAsyncData('teachers-growth', () => getTeachersGrowth(schoolId.value, growthFilter.value), { watch: [ () => growthFilter.value.start_year, () => growthFilter.value.end_year ] })

const studentsChartData = computed(() => {
   const value: any = []

   studentsGrowth.value?.forEach((item, index) => {
      value[index] = {
         x: item.year,
         y: item.total
      }
   })

   return [{
      name: 'Jumlah Siswa',
      data: value,
   }]
})

const teachersChartData = computed(() => {
   const value: any = []

   teachersGrowth.value?.forEach((item, index) => {
      value[index] = {
         x: item.year,
         y: item.total
      }
   })

   return [{
      name: 'Jumlah Guru',
      data: value
   }]
})

const chartOptions = computed(() => ({
   chart: {
      id: 'studentGrowth',
      type: 'line'
   },
   colors: ['#14b8a6'],
   dataLabels: {
      style: {
         fontSize: '12px',
         fontFamily: 'Lato'
      },
   },
   markers: {
      size: 4,
      hover: { sizeOffset: 2 }
   },
   stroke: { curve: 'smooth' }
}))
</script>