<template>
   <u-card>
      <data-table
         :data="schools?.data"
         :headers="headers"
         :page="(filter.page as number)"
         :per-page="filter.per_page"
         :total="schools?.total"
         :loading="loading"
         :use-default-filter="false"
         @update="onTableUpdate"
      >
         <template #header>
            <div class="flex gap-4 items-center">
               <u-button-group>
                  <u-input
                     v-model="(filter.search as string)"
                     placeholder="Cari..."
                     input-class="focus:ring-inset"
                     @keydown.enter="fetchSchools"
                  ></u-input>
                  <u-button
                     icon="i-heroicons-magnifying-glass-16-solid"
                     @click.stop="fetchSchools"
                  ></u-button>
               </u-button-group>

               <u-select-menu
                  v-model="(filter.type as number)"
                  :options="schoolTypeOptions || []"
                  value-attribute="value"
                  @update:model-value="fetchSchools"
               >
                  <template #label>
                     {{ displaySelectLabel(schoolTypeOptions || [], (filter.type as number), 'Pilih tipe...') }}
                  </template>
               </u-select-menu>

               <u-tooltip v-if="filter.search || filter.type" text="Atur ulang filter">
                  <u-button
                     color="gray"
                     leading-icon="i-heroicons-arrow-path-16-solid"
                     @click.stop="resetFilter"
                  ></u-button>
               </u-tooltip>
            </div>
         </template>

         <template #actions="{ row }: { row: Model.School }">
            <u-tooltip text="Lihat detail">
               <u-button
                  :ui="{ rounded: 'rounded-full' }"
                  variant="ghost"
                  icon="i-heroicons-eye-16-solid"
                  :to="`/schools/${row.id}`"
                  exact
               ></u-button>
            </u-tooltip>
         </template>
      </data-table>
   </u-card>
</template>

<script setup lang="ts">
const store = useAppStore()
store.setPageTitle('Sekolah')
store.setBreadcrumb([
   { label: 'Home', to: '/' },
   { label: 'Sekolah' }
])

const headers = computed(() => [
   { key: 'user.name', label: 'Nama' },
   { key: 'user.email', label: 'Email' },
   { key: 'type.name', label: 'Tipe' },
   { key: 'principal', label: 'Kepala Sekolah' },
   { key: 'updated_at', label: 'Diperbarui' },
   { key: 'actions' },
])

const filter = ref<API.Request.Query.School>({
   type: null,
   search: null,
   page: 1,
   per_page: 10
})

const { data: schools, pending: loading, refresh: fetchSchools } = await useAsyncData('schools', () => getSchools(filter.value))

const { data: schoolTypeOptions, pending: schoolTypeLoading, refresh: fetchSchoolTypeOptions } = await useAsyncData('school-type-options', () => getSchoolTypeOptions())

const onTableUpdate = async (emit: Wildcard) => {
   filter.value = {
      ...filter.value,
      ...emit
   }

   await fetchSchools()
}

const resetFilter = async () => {
   filter.value = {
      ...filter.value,
      type: null,
      search: null,
   }

   await fetchSchools()
}
</script>