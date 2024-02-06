declare namespace Model {
   type User <T = Model.School | Model.Supervisor | Model.Officer | null> = {
      id: number
      name: string
      email: string
      userable_type: string | null
      userable_id: number | null
      created_at?: string | null
      updated_at?: string | null
      userable?: T
      profile_picture: string | null
      status: 'ACTIVE' | 'INACTIVE'
   }
}