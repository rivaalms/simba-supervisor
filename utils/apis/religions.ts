export async function getReligions (payload?: API.Request.Query.Religion) : Promise <Model.Religion[] | Utility.DataTable <Model.Religion[]>> {
   const response = await $api('/religions', {
      method: 'GET',
      query: payload
   }) as API.Response <Model.Religion[] | Utility.DataTable <Model.Religion[]>>

   return response.data
}