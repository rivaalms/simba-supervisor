import { defineStore } from 'pinia'
import colors from '#ui-colors'

type State = {
   page: {
      title: string
      backUrl: string | null
   }
   dialog: {
      id: string
      show: boolean
      title: string
      data?: any
      callback?: (() => any)
   }
   breadcrumb: Breadcrumb[]
}

type Breadcrumb = {
   label: string
   to?: string
}

type NotificationColor = 'gray' | typeof colors[number]

export const useAppStore = defineStore('supervisor-app', {
   persist: true,

   state: () : State => ({
      page: {
         title: '',
         backUrl: null
      },

      dialog: {
         id: '',
         show: false,
         title: '',
         data: null,
         callback: () => {}
      },
      breadcrumb: []
   }),

   getters: {
      getPageTitle: (state) => state.page.title,
      getPageBackUrl: (state) => state.page.backUrl,
   },

   actions: {
      showDialog(id: string, title: string, data?: any, callback?: (() => any)) {
         this.dialog = {
            id,
            title,
            data,
            callback,
            show: true
         }
      },

      clearDialog() {
         this.dialog.show = false

         setTimeout(() => {
            this.dialog = {
               id: '',
               show: false,
               title: '',
               data: null,
               callback: () => {}
            }
         }, 300)
      },

      notify(type: 'success' | 'error' | 'info', message: string, id?: string) {
         const typeConfig = {
            success: {
               title: 'Success',
               color: 'emerald',
               icon: 'i-heroicons-check-circle'
            },
            error: {
               title: 'Error',
               color: 'red',
               icon: 'i-heroicons-exclamation-circle'
            },
            info: {
               title: 'Info',
               color: 'cyan',
               icon: 'i-heroicons-information-circle'
            },
         }

         const { title, color, icon } = typeConfig[type] || {}

         if (title) {
            useToast().add({
               id,
               title,
               description: message,
               color: color as NotificationColor,
               icon,
            })
         }
      },

      setPageTitle(title: string, backUrl: string | null = null) {
         this.page.title = title
         this.page.backUrl = backUrl
         useHead({ title })
      },

      setBreadcrumb(items: Breadcrumb[]) {
         this.breadcrumb = items
      },
   }
})