export const mapStudents = async (students: Model.School.Student[]) : Promise<Utility.Map.Student[]> => {
   const religions = await getReligions() as Model.Religion[]

   // Create a map to store the mapped data
   const mapData = new Map()

   // Iterate through each student
   students.forEach(item => {
      // Get the grade, religion name, and updated timestamp from the student's data
      const grade = item.grade
      const religionName = item.religion!.name.toLowerCase().replaceAll(' ', '_')
      const count = item.count
      const updatedAt = new Date(item.updated_at!).getTime()

      // Check if the grade already exists in the map
      let gradeData = mapData.get(grade)

      // If the grade doesn't exist, initialize the data for the grade
      if (!gradeData) {
         gradeData = {
            total: 0,
            latestUpdate: 0,
            religionData: {}
         }
         mapData.set(grade, gradeData)
      }

      // Get the religion data from the grade
      const religionData = gradeData.religionData

      // Check if the religion already exists in the religion data, or the updated timestamp is more recent
      if (!religionData[religionName] || updatedAt > religionData[religionName].latestUpdate)
      {
         // Update the religion data for the religion name with the count and updated timestamp
         religionData[religionName] = {
         count: count,
         latestUpdate: updatedAt,
         }

         // Update the data total count for the grade
         gradeData.total += count
      }
   })

   // Create an array to store the final mapped data
   const result : Utility.Map.Student[] = []

   // Iterate through each mapped data
   mapData.forEach((gradeData, grade) => {
      // Get the year from the first student (assuming all students have the same year)
      const year = students[0].year

      // Create an object to store the mapped data for the grade
      const gradeResult : any = {
         grade: parseInt(grade),
         year: year,
         total: gradeData.total
      }

      // Iterate through each religion
      religions.forEach(religion => {
         // Get the religion name and 'count' from the religion data of the mapped grade
         const religionName = religion.name.toLowerCase().replaceAll(' ', '_')
         gradeResult[religionName] = gradeData.religionData[religionName]?.count || 0
      })

      // Add the grade result to the final result array
      result.push(gradeResult)
   })

   // Sort the result array by grade in ascending order
   return result.sort((a, b) => a.grade - b.grade)
}