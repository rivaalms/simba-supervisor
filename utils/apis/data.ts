export async function getData (payload: API.Request.Query.Data) : Promise <Utility.DataTable<Model.Data[]>> {
   const query = { ...payload }
   query.supervisor = useAuthStore().getUser?.userable_id || query.supervisor

   const response = await $api <API.Response <Utility.DataTable<Model.Data[]>>> (`/data`, {
      method: 'get',
      query
   })

   return response.data
}

export async function updateData (dataId: number, payload: Omit <API.Request.Form.Data, 'file'>) : Promise <string> {
   const response = await $api <API.Response <boolean>> (`/data/${dataId}`, {
      method: 'put',
      body: payload
   })

   return response.message!
}

export async function downloadDataFile (data: Model.Data) : Promise <boolean> {
   try {
      const response = await $api <Blob> (`/data/download`, {
         method: 'post',
         body: {
            id: data.id
         }
      })

      const url = window.URL.createObjectURL(response)
      const a = document.createElement('a')
      const fileName = `${data.school.user!.name}_${data.type.category!.name}_${data.type.name}_${data.year}`

      a.href = url
      a.setAttribute('download', fileName)
      a.click()
      a.remove()
      return true
   } catch (e: any) {
      throw e
   }
}