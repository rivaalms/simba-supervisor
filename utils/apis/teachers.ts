export async function getTeachers (payload: API.Request.Query.Teacher) : Promise <Model.Teacher[]> {
   const response = await $api <API.Response <Model.Teacher[]>> (`/school-teachers`, {
      method: 'get',
      query: payload
   })
   return response.data
}

export async function getTeachersGrowth (schoolId: number, payload: API.Request.Query.Growth) : Promise <Utility.Growth[]> {
   const response = await $api <API.Response<Utility.Growth[]>> (`/school-teachers/${schoolId}/growth`, {
      method: 'get',
      query: payload
   })
   return response.data
}