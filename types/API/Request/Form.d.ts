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

   type CheckResetPasswordToken = {
      email: string | null
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

   type Data = {
      school_id: number | string | null
      year: string | null
      data_type_id: number | string | null
      data_status_id: number | string | null
      file?: File | Blob
   }

   type Comment = {
      user_id: number | null
      data_id: number | null
      message: string | null
      reply_to: number | null
   }
}