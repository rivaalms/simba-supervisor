declare namespace Utility {
   type DataTable <T> = {
      current_page: number
      data: T
      first_page_url: string | null
      from: number | null
      last_page: number | null
      last_page_url: string | null
      links: Array<{
         url: string | null
         label: string
         active: boolean
      }>
      next_page_url: string | null
      path: string
      per_page: number
      prev_page_url: string | null
      to: number | null
      total: number
   }

   type TableColumn = {
      key: string
      label: string
      class?: string
   }

   type SelectOption = {
      label: string
      value: string | number | null
   }
}