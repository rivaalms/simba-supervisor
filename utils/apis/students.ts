export async function getStudents (payload: API.Request.Query.Student) : Promise <Model.Student[]> {
   const response = await $api(`/school-students`, {
      method: 'get',
      query: payload
   }) as API.Response <Model.Student[]>
   return response.data
}

export async function getStudentsGrowth (schoolId: number, payload: API.Request.Query.Growth) : Promise <Utility.Growth[]> {
   const response = await $api(`/school-students/${schoolId}/growth`, {
      method: 'get',
      query: payload
   }) as API.Response<Utility.Growth[]>
   return response.data
}

export async function createStudent (payload: API.Request.Form.Student) : Promise <string> {
   const response = await $api(`/school-students`, {
      method: 'post',
      body: payload
   }) as API.Response <Model.Student>
   return response.message!
}

export async function countStudent (year: string) : Promise <number> {
   const response = await $api (`/school-students/count`, {
      method: 'get',
      query: { year }
   }) as API.Response <number>
   return response.data
}