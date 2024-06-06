<template>
   <u-form
   :schema="useUpdateProfileSchema"
   :state="state"
   @submit="submit"
   class="grid gap-4"
   >
      <u-form-group
         label="NIP"
         name="employee_number"
      >
         <u-input
            v-model="state.employee_number"
            :disabled="loading"
         ></u-input>
      </u-form-group>

      <div class="flex mt-2 justify-end items-center gap-4">
         <u-button
            color="gray"
            variant="outline"
            icon="i-heroicons-arrow-uturn-left-16-solid"
            :disabled="loading"
            @click.stop="store.clearDialog()"
         >
            Batal
         </u-button>

         <u-popover overlay>
            <u-button
               color="emerald"
               icon="i-heroicons-check-16-solid"
               :loading="loading"
            >
               Simpan
            </u-button>

            <template #panel>
               <div class="p-4 grid gap-4">
                  <u-form-group
                     label="Masukkan kata sandi untuk menyimpan perubahan"
                     name="password"
                  >
                     <u-input
                        v-model="state.password"
                        type="password"
                        autocomplete="password"
                        placeholder="Kata sandi"
                        :disabled="loading"
                        icon="i-heroicons-lock-closed-20-solid"
                     ></u-input>
                  </u-form-group>

                  <u-button
                     block
                     color="emerald"
                     icon="i-heroicons-check-16-solid"
                     type="submit"
                  >
                     Simpan Perubahan
                  </u-button>
               </div>
            </template>
         </u-popover>
      </div>
   </u-form>
</template>

<script setup lang="ts">
const store = useAppStore()
const loading = ref(false)

const user = useAuthStore().getUser as Model.User<Model.Supervisor>
const state = ref<API.Request.Form.Profile>({
   name: user.name,
   email: user.email,
   password: '',
   employee_number: ''
})

const submit = async () => {
   loading.value = true
   await updateProfile(user.id, state.value)
      .then(resp => {
         useAuthStore().user = resp
         store.notify('success', 'Profil berhasil diperbarui', 'update-profile-success')
         store.clearDialog()
      })
      .finally(() => loading.value = false)
}
</script>