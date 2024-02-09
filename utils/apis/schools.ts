export async function getSchools (payload: API.Request.Query.School) : Promise <Utility.DataTable<Model.School[]>> {
   const query = { ...payload }
   query.supervisor = useAuthStore().getUser?.userable_id || query.supervisor

   const response = await $api <API.Response <Utility.DataTable<Model.School[]>>>(`/schools`, {
      method: 'get',
      query
   })
   return response.data
}

export async function getSchoolDetails (school_id: number) : Promise <Model.School> {
   const response = await $api <API.Response <Model.School>> (`/school/${school_id}`, {
      method: 'get'
   })
   return response.data
}