type LoginResponse = { user: Model.User<Model.School>, token: string }

export async function verifyCsrfToken () : Promise <void> {
   const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl
   const url = apiBaseUrl.replace('/api', '')

   await $fetch (`${url}/sanctum/csrf-cookie`, {
      method: 'get'
   })

   return
}

export async function login (payload: API.Request.Form.Login) : Promise <LoginResponse> {
   const response = await $api<API.Response<LoginResponse>>(`/login`, {
      method: 'post',
      body: payload
   })

   return response.data
}

export async function logout () : Promise <void> {
   await $api (`/logout`, {
      method: 'post'
   }) as API.Response <null>
}

export async function updateProfile (id: number, payload: API.Request.Form.Profile) : Promise <Model.User<Model.School>> {
   const response = await $api <API.Response <Model.User<Model.School>>> (`/user/${id}`, {
      method: 'put',
      body: payload
   })
   return response.data
}

export async function forgotPassword (payload: API.Request.Form.ForgotPassword) : Promise <string> {
   const response = await $api <API.Response <boolean>> (`/forgot-password`, {
      method: 'post',
      body: payload
   })

   return response.message!
}

export async function resetPassword (payload: API.Request.Form.ResetPassword) : Promise <string> {
   const response = await $api <API.Response <boolean>> (`/reset-password`, {
      method: 'post',
      body: payload
   })

   return response.message!
}

// export async function checkResetPasswordToken (payload: API.Request.Form.CheckResetPasswordToken) : Promise <boolean> {
//    const response = await $api (`/check-reset-password-token`, {
//       method: 'post',
//       body: payload
//    }) as API.Response <boolean>

//    return response.data
// }