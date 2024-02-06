declare namespace API {
   type Response <T> = {
      success: boolean
      message: string | null
      data: T
   }
}