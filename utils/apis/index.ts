type Options = {
   method: 'get' | 'post' | 'put' | 'delete' | 'GET' | 'POST' | 'PUT' | 'DELETE',
   headers?: Wildcard,
   params?: Wildcard,
   query?: Wildcard,
   body?: Wildcard
}

export async function $api <T> (url: string, opts?: Options) : Promise<T> {
   const baseUrl = useRuntimeConfig().public.apiBaseUrl
   const authStore = useAuthStore()
   const store = useAppStore()

   const response = await $fetch <T> (url, {
      baseURL: baseUrl,
      ...opts,

      async onRequest({ options }) {
         const headers : { [key: string]: any } = {
            ...options.headers,
            'Accept': 'application/json'
         }

         if (authStore.isAuthenticated) {
            headers.Authorization = `Bearer ${authStore.getToken}`
         }
         options.headers = headers
      },

      async onRequestError({ error }) {
         const { name, message } = error
         store.notify('error', `${name}: ${message}`)
      },

      async onResponse({ response }) {
         return response._data
      },

      async onResponseError({ response }) {
         const { status, _data } = response

         if (status == 403) {
            store.notify('error', `${status}: Akses tidak diizinkan`)
         }

         if (status == 401) {
            authStore.$reset()
            localStorage.removeItem('simba-school-user')
            localStorage.removeItem('simba-school-token')
            navigateTo('/login')
         }

         store.notify('error', `${status}: ${_data.message}`)
      }
   })

   return response
}