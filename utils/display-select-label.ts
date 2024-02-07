export function displaySelectLabel(options: Utility.SelectOption[], value: string | number, fallback: string) {
   const label = options.find(item => item.value === value)?.label || fallback

   return label
}