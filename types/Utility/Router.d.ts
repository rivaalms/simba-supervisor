declare namespace Utility {
   type Router = {
      label: string
      to?: string
      icon?: string
      children?: Utility.Router[]
   }
}