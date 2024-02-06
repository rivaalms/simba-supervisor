import { defineStore } from 'pinia'
import { login as $login, logout as $logout, verifyCsrfToken } from '@/utils/apis/auth'

type State = {
   user: Model.User<Model.School> | null
   token: string | null
}

export const useAuthStore = defineStore('auth', {
   persist: true,

   state: () : State => ({
      user: null,
      token: null
   }),

   getters: {
      getUser: (state) => state.user,
      getToken: (state) => state.token,
      isAuthenticated: (state) => !!state.token
   },

   actions: {
      async login(payload: API.Request.Form.Login) {
         await verifyCsrfToken()
            .then(async () => {
               await $login(payload)
                  .then(resp => {
                     this.user = resp.user
                     this.token = resp.token
                  })
            })
      },

      async logout() {
         await $logout()
            .then(() => {
               this.user = null
               this.token = null
               navigateTo('/login')
            })
      }
   }
})