export async function getSubjects (payload?: API.Request.Query.Subject) : Promise <Model.Subject[] | Utility.DataTable <Model.Subject[]>> {
   const response = await $api <API.Response <Model.Subject[] | Utility.DataTable <Model.Subject[]>>> ('/subjects', {
      method: 'GET',
      query: payload
   })

   return response.data
}