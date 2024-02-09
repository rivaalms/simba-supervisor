export async function getDataCategoryOptions () : Promise <Utility.SelectOption[]> {
   const response = await $api <API.Response <Utility.SelectOption[]>> ('/options/data-categories', {
      method: 'get'
   })
   return response.data
}

export async function getDataTypeOptions (categoryId: number) : Promise <Utility.SelectOption[]> {
   const response = await $api <API.Response <Utility.SelectOption[]>> ('/options/data-types', {
      method: 'get',
      query: {
         category: categoryId
      }
   })
   return response.data
}

export async function getDataStatusOptions () : Promise <Utility.SelectOption[]> {
   const response = await $api <API.Response <Utility.SelectOption[]>> ('/options/data-status', {
      method: 'get'
   })
   return response.data
}

export async function getReligionOptions () : Promise <Utility.SelectOption[]> {
   const response = await $api <API.Response <Utility.SelectOption[]>>('/options/religions', {
      method: 'get'
   })
   return response.data
}

export async function getSubjectOptions () : Promise <Utility.SelectOption[]> {
   const response = await $api <API.Response <Utility.SelectOption[]>>('/options/subjects', {
      method: 'get'
   })
   return response.data
}

export async function getSchoolOptions () : Promise <Utility.SelectOption[]> {
   const response = await $api <API.Response <Utility.SelectOption[]>>(`/options/schools`, {
      method: 'get',
      query: {
         supervisor: useAuthStore().getUser?.userable_id
      }
   })
   return response.data
}

export async function getSchoolTypeOptions () : Promise <Utility.SelectOption[]> {
   const response = await $api <API.Response <Utility.SelectOption[]>> (`/options/school-types`, {
      method: 'get',
   })
   return response.data
}