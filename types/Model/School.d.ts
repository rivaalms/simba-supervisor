declare namespace Model {
   type School = {
      id: number
      school_type_id: number
      supervisor_id: number
      principal: string | null
      address: string | null
      created_at?: string | null
      updated_at?: string | null
      user?: Omit <Model.User, 'created_at' | 'updated_at' | 'userable'>
      type?: Omit <Model.School.Type, 'created_at' | 'updated_at'>
      supervisor?: Omit <Model.Supervisor, 'created_at' | 'updated_at'>
   }

   namespace School {
      type Type = {
         id: number
         name: string
         created_at?: string | null
         updated_at?: string | null
      }

      type Student = {
         id: number
         school_id: number
         grade: number
         religion_id: number
         year: string
         count: number
         created_at?: string | null
         updated_at?: string | null
         religion?: Model.Religion
      }

      type Teacher = {
         id: number
         school_id: number
         year: string
         subject_id: number
         count: number
         created_at?: string | null
         updated_at?: string | null
         subject?: Model.Subject
      }
   }
}