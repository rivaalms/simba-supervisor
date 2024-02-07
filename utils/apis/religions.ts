export async function getReligions (payload?: API.Request.Query.Religion) : Promise <Model.Religion[] | Utility.DataTable <Model.Religion[]>> {
   const response = await $api <API.Response <Model.Religion[] | Utility.DataTable <Model.Religion[]>>> ('/religions', {
      method: 'GET',
      query: payload
   })

   return response.data
}