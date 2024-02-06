declare namespace Utility {
   namespace Map {
      type Student = {
         grade: number
         islam: number
         katolik: number
         kristen: number
         hindu: number
         buddha: number
         konghucu: number
         total: number
         year: string
      }

      type Teacher = {
         subject: string
         value: string | number
      }

      type DataCount = {
         total: number
         data_by_status: Array<{ name: string, count: number }>
         data_by_category: Array<{ name: string, total: number, data_by_type: Pick <DataCount, 'data_by_status'> }>
         start_year: string | null
         end_year: string | null
      }
   }
}