export async function getStudents (payload: API.Request.Query.Student) : Promise <Model.Student[]> {
   const response = await $api <API.Response <Model.Student[]>> (`/school-students`, {
      method: 'get',
      query: payload
   })
   return response.data
}

export async function getStudentsGrowth (schoolId: number, payload: API.Request.Query.Growth) : Promise <Utility.Growth[]> {
   const response = await $api <API.Response<Utility.Growth[]>> (`/school-students/${schoolId}/growth`, {
      method: 'get',
      query: payload
   })
   return response.data
}