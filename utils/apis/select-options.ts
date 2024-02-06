export async function getDataCategoryOptions () : Promise <Utility.SelectOption[]> {
   const response = await $api ('/options/data-categories', {
      method: 'get'
   }) as API.Response <Utility.SelectOption[]>
   return response.data
}

export async function getDataTypeOptions (categoryId: number) : Promise <Utility.SelectOption[]> {
   const response = await $api ('/options/data-types', {
      method: 'get',
      query: {
         category: categoryId
      }
   }) as API.Response <Utility.SelectOption[]>
   return response.data
}

export async function getDataStatusOptions () : Promise <Utility.SelectOption[]> {
   const response = await $api ('/options/data-status', {
      method: 'get'
   }) as API.Response <Utility.SelectOption[]>
   return response.data
}

export async function getReligionOptions () : Promise <Utility.SelectOption[]> {
   const response = await $api('/options/religions', {
      method: 'get'
   }) as API.Response <Utility.SelectOption[]>
   return response.data
}

export async function getSubjectOptions () : Promise <Utility.SelectOption[]> {
   const response = await $api('/options/subjects', {
      method: 'get'
   }) as API.Response <Utility.SelectOption[]>
   return response.data
}