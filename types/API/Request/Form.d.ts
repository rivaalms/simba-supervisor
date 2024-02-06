declare namespace API.Request.Form {
   type Login = {
      email: string
      password: string
   }

   type ForgotPassword = {
      email: string | null
   }

   type ResetPassword = {
      email: string | null
      password: string | null
      password_confirmation: string | null
      token: string | null
   }

   type Profile = {
      name: string
      email: string
      password: string
      supervisor_id: number
      school_type_id: number
      principal: string | null
      address: string | null
   }
}