export async function getSubjects (payload?: API.Request.Query.Subject) : Promise <Model.Subject[] | Utility.DataTable <Model.Subject[]>> {
   const response = await $api('/subjects', {
      method: 'GET',
      query: payload
   }) as API.Response <Model.Subject[] | Utility.DataTable <Model.Subject[]>>

   return response.data
}