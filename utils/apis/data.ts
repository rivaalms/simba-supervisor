export async function getData (payload: API.Request.Query.Data) : Promise <Utility.DataTable<Model.Data[]>> {
   const query = { ...payload }
   query.supervisor = useAuthStore().getUser?.userable_id || query.supervisor

   const response = await $api (`/data`, {
      method: 'get',
      query
   }) as API.Response <Utility.DataTable<Model.Data[]>>

   return response.data
}

export async function updateData (dataId: number, payload: Omit <API.Request.Form.Data, 'file'>) : Promise <string> {
   const response = await $api (`/data/${dataId}`, {
      method: 'put',
      body: payload
   }) as API.Response <boolean>

   return response.message!
}

export async function downloadDataFile (data: Model.Data) : Promise <boolean> {
   try {
      const response = await $api (`/data/download`, {
         method: 'post',
         body: {
            id: data.id
         }
      }) as Blob | API.Response<null>

      const url = window.URL.createObjectURL(response as Blob)
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