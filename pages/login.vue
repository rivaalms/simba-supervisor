<template>
   <div class="h-screen grid grid-cols-2 !bg-white">
      <div class="h-full bg-gradient-to-r from-blue-300 to-white"></div>

      <div class="h-full flex justify-center items-center">
         <u-card class="shadow-lg w-1/2 ring-0">
            <p class="text-center text-lg font-medium mb-4">
               Login
            </p>

            <u-form
               :schema="useLoginSchema"
               :state="state"
               class="grid gap-2"
               @submit="submit"
            >
               <u-form-group name="email">
                  <u-input
                     v-model="state.email"
                     name="email"
                     placeholder="Email"
                     autocomplete="on"
                     icon="i-heroicons-at-symbol-16-solid"
                     :disabled="loading"
                  ></u-input>
               </u-form-group>

               <u-form-group name="password">
                  <u-button-group
                     orientation="horizontal"
                     class="w-full"
                  >
                     <u-input
                        v-model="state.password"
                        name="password"
                        placeholder="Kata sandi"
                        class="flex-1"
                        autocomplete="on"
                        icon="i-heroicons-lock-closed-16-solid"
                        :type="showPassword ? 'text' : 'password'"
                        :disabled="loading"
                     ></u-input>

                     <u-button
                        :icon="showPassword ? 'i-heroicons-eye-slash-16-solid' : 'i-heroicons-eye-16-solid'"
                        color="gray"
                        @click.stop="showPassword = !showPassword"
                     ></u-button>
                  </u-button-group>
               </u-form-group>

               <div class="mt-4 grid gap-2">
                  <u-button
                     block
                     :loading="loading"
                     type="submit"
                  >
                     Log In
                  </u-button>
               </div>
            </u-form>
         </u-card>
      </div>
   </div>
</template>

<script setup lang="ts">
definePageMeta({
   layout: false
})

const store = useAppStore()
const authStore = useAuthStore()

const state = ref({
   email: '',
   password: ''
})

const loading = ref<boolean>(false)
const showPassword = ref<boolean>(false)

const submit = async () => {
   loading.value = true

   await authStore.login(state.value)
      .then(async () => {
         store.notify('success', 'Berhasil log in', 'login')
         await navigateTo('/')
      })
      .finally(() => loading.value = false)
}
</script>