declare namespace Model {
   type Supervisor = {
      id: number
      employee_number: string
      created_at?: string | null
      updated_at?: string | null
      user?: Model.User
      schools?: Omit <Model.School, 'supervisor'>[]
   }
}