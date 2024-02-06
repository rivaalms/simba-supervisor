declare namespace Model {
   type Student = {
      id: number
      school_id: number
      year: string
      grade: number
      religion_id: number
      count: number
      religion: Model.Religion
      created_at?: string | null
      updated_at?: string | null
   }
}