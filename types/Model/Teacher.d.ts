declare namespace Model {
   type Teacher = {
      id: number
      school_id: number
      year: string
      subject_id: number
      count: number
      subject: Model.Subject
      created_at?: string | null
      updated_at?: string | null
   }
}