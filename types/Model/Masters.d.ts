declare namespace Model {
   type Religion = {
      id: number
      name: string
      created_at?: string | null
      updated_at?: string | null
   }

   type Subject = {
      id: number
      name: string
      abbreviation: string
      created_at?: string | null
      updated_at?: string | null
   }
}