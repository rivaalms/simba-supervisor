type Map = {
   subject: string
   value: number
   updated: number | null
}

export const mapTeachers = async (teachers: Model.School.Teacher[]) : Promise <Utility.Map.Teacher[]> => {
   const subjects = await getSubjects() as Model.Subject[]

   // Initialize an empty array to store the map data
   const mapData : Map[] = []

   teachers.forEach(item => {
      // Get the timestamp of the teacher's last update
      const updatedAt = new Date(item.updated_at!).getTime()

      // Find existing data in mapData with the same subject
      const existingData = mapData.find(data => data.subject === item.subject!.name)

      // If no existing data found or the teacher's update is more recent, push the current iteration data to mapData
      if (!existingData || updatedAt > existingData.updated!) {
         mapData.push({
            subject: item.subject?.name!,
            value: item.count,
            updated: updatedAt
         })
      }
   })

   // Iterate through each subject (for including all subjects that has no teacher)
   subjects.forEach(subjectItem => {
      // Find existing data in mapData with the same subject
      const existingData = mapData.find(data => data.subject === subjectItem.name)

      // If no existing data found, push the current iteration data to mapData with a value of 0
      if (!existingData) {
         mapData.push({
            subject: subjectItem.name,
            value: 0,
            updated: null
         })
      }
   })

   // Remove the 'updated' property from the mapData, then sort the data in descending order based on 'value'
   return mapData
      .map(({ updated, ...rest }) => rest)
      .sort((a, b) => b.value - a.value)
}