export const validateNumber = (event: any): void => {
   const isNumberKey = /^[0-9.-]+$/.test(event.key)
   const hasDecimalPoint = event.key === '.' && event.target!.value.includes('.')
   const hasNegativeSign = event.key === '-' && event.target!.value.includes('-')

   if (!isNumberKey || hasDecimalPoint || hasNegativeSign) {
      event.preventDefault()
   }
}