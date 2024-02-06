declare namespace Model {
   type Comment = {
      id: number
      user_id: number
      data_id: number
      reply_to: number | null
      message: string
      created_at?: string | null
      updated_at?: string | null
      user?: Model.User
      replies?: Model.Comment[]
      replies_visible?: boolean
   }
}