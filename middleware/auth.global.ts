export default defineNuxtRouteMiddleware((to, from) => {
   const authStore = useAuthStore()
   const excludedRoutes = [
      'login'
   ]

   const shouldRedirectToLogin = !excludedRoutes.includes(to.name as string) && !authStore.isAuthenticated
   const shouldRedirectToHome = excludedRoutes.includes(to.name as string) && authStore.isAuthenticated

   if (shouldRedirectToLogin) {
      authStore.$reset()
      return navigateTo('/login')
   }

   else if (shouldRedirectToHome) {
      return navigateTo('/')
   }
})