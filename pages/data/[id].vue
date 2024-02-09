<template>
   <div class="grid grid-cols-3 gap-2">
      <div class="place-self-start grid gap-2 w-full">
         <u-card>
            <template #header>
               Informasi Data
            </template>

            <dialog-placeholder v-if="dataLoading"/>

            <div v-else class="grid gap-4">
               <div class="grid gap-y-2 grid-cols-3 text-sm">
                  <p class="text-gray-500">Tahun Ajaran</p>
                  <p class="col-span-2">{{ data?.year }}</p>
                  <p class="text-gray-500">Tipe</p>
                  <p class="col-span-2">{{ data?.type.name }}</p>
                  <p class="text-gray-500">Kategori</p>
                  <p class="col-span-2">{{ data?.type.category?.name }}</p>
                  <p class="text-gray-500">Status</p>
                  <span class="col-span-2">
                     <u-badge
                        :color="mapStatusColor(data?.data_status_id!)"
                        variant="subtle"
                     >
                        {{ data?.status.name }}
                     </u-badge>
                  </span>
               </div>

               <u-divider></u-divider>

               <div class="grid gap-2">
                  <u-button
                     block
                     color="emerald"
                     :loading="isDownloading"
                     icon="i-heroicons-folder-arrow-down-20-solid"
                     @click.stop="download"
                  >
                     Unduh File
                  </u-button>

                  <u-dropdown
                     v-if="data?.data_status_id === 1 || data?.data_status_id === 4"
                     :items="updateDataStatusItems"
                  >
                     <u-button
                        block
                        class="mt-2"
                        :loading="updateStatusLoading"
                        icon="i-heroicons-clipboard-document-list-16-solid"
                     >
                        Perbarui Status Data
                     </u-button>
                  </u-dropdown>
               </div>
            </div>
         </u-card>

         <u-card>
            <template #header>
               Informasi Sekolah
            </template>

            <dialog-placeholder v-if="dataLoading"/>

            <div v-else class="flex gap-4">
               <u-avatar
                  :src="data?.school.user?.profile_picture || 'https://avatars.githubusercontent.com/u/739984?v=4'"
                  size="md"
               ></u-avatar>

               <div class="text-sm">
                  <p>{{ data?.school.user?.name }}</p>
                  <p class="text-xs text-gray-500">{{ data?.school.user?.email }}</p>
               </div>
            </div>
         </u-card>
      </div>

      <div class="col-span-2 place-self-start grid gap-2 w-full">
         <u-card>
            <template #header>
               <div class="flex items-center justify-between">
                  Komentar

                  <u-select-menu
                     v-model="commentSort"
                     :options="commentSortOptions"
                     value-attribute="value"
                     @update:model-value="fetchComments"
                  ></u-select-menu>
               </div>
            </template>

            <dialog-placeholder v-if="commentLoading"/>

            <template v-else>
               <div v-if="(comments?.length || 0) < 1" class="flex flex-col items-center gap-2 text-gray-500">
                  <u-icon name="i-tabler-message-2-x"></u-icon>

                  <p class="text-sm">
                     Belum ada komentar
                  </p>
               </div>

               <div v-else class="grid divide-y">
                  <comment-block
                     v-for="comment in comments"
                     :comment="comment"
                     :data="data!"
                     @reply="replyToComment"
                  />
               </div>
            </template>
         </u-card>

         <u-card>
            <div class="grid gap-4">
               <u-alert
                  v-if="isReplyingTo"
                  color="cyan"
                  variant="soft"
                  title="Balas ke"
               >
                  <template #title="{ title }">
                     <div class="flex items-center justify-between gap-x-4">
                        <span class="truncate flex-grow">
                           {{ title }} <span class="font-semibold">{{ isReplyingTo.user?.name }}</span>
                        </span>

                        <u-button
                           icon="i-heroicons-x-mark-20-solid"
                           variant="ghost"
                           color="cyan"
                           @click.stop="cancelReplying"
                        ></u-button>
                     </div>
                  </template>
                  <template #description>
                     <p class="truncate">
                        {{ isReplyingTo.message }}
                     </p>
                  </template>
               </u-alert>

               <u-textarea
                  ref="commentTextarea"
                  v-model="(commentState.message as string)"
                  :rows="3"
                  autoresize
                  :disabled="isCommentSending"
                  placeholder="Tulis komentar..."
               ></u-textarea>

               <div class="flex items-center justify-end gap-2">
                  <u-button
                     icon="i-heroicons-paper-airplane-20-solid"
                     :loading="isCommentSending"
                     @click.stop="sendComment"
                  >
                     Kirim
                  </u-button>
               </div>
            </div>
         </u-card>
      </div>
   </div>
</template>

<script setup lang="ts">
const store = useAppStore()
store.setPageTitle('Detail Data')
store.setBreadcrumb([
   { label: 'Home', to: '/' },
   { label: 'Data', to: '/data' },
   { label: 'Detail' }
])

const isDownloading = ref<boolean>(false)
const commentSort = ref<'latest' | 'oldest'>('latest')
const commentSortOptions = computed(() => [
   { label: 'Terbaru', value: 'latest' },
   { label: 'Terlama', value: 'oldest' }
])

const commentTextarea = ref()
const commentState = ref<API.Request.Form.Comment>({
   user_id: useAuthStore().getUser!.id,
   data_id: null,
   message: null,
   reply_to: null
})
const isCommentSending = ref<boolean>(false)
const isReplyingTo = ref<Model.Comment | null>(null)

const { data, pending: dataLoading, refresh: fetchDataDetails } = await useAsyncData('data-details', () => getDataDetails(parseInt(useRoute().params.id as string)))
const { data: comments, pending: commentLoading, refresh: fetchComments } = await useAsyncData('comments', () => getComments(parseInt(useRoute().params.id as string), { sort: commentSort.value }), { watch: [commentSort] })

const updateDataStatusItems = computed(() => [
   [
      {
         label: 'Terverifikasi',
         icon: 'i-heroicons-check-16-solid',
         class: 'text-emerald-500',
         iconClass: 'text-emerald-500',
         click: async () => await updateStatus(true)
      },
      {
         label: 'Revisi',
         icon: 'i-heroicons-x-mark-16-solid',
         class: 'text-amber-500',
         iconClass: 'text-amber-500',
         click: async () => await updateStatus(false)
      },
   ]
])

const mapStatusColor = (id: number) => {
   switch (id) {
      case 1: return 'gray'
      case 2: return 'emerald'
      case 3: return 'amber'
      case 4: return 'cyan'
      default: return 'primary'
   }
}

const replyToComment = (comment: Model.Comment) => {
   if (!comment.reply_to) commentState.value.reply_to = comment.id
   else commentState.value.reply_to = comments.value!.find(item => item.id === comment.reply_to)!.id
   isReplyingTo.value = comment
   commentTextarea.value.$refs.textarea.focus()
}

const cancelReplying = () => {
   commentState.value.reply_to = null
   isReplyingTo.value = null
}

const sendComment = async () => {
   if (!commentState.value.message) return store.notify('error', 'Komentar harus diisi', 'send-comment')
   commentState.value.data_id = data.value!.id

   isCommentSending.value = true
   await createComment(commentState.value)
      .then(async (resp) => {
         commentState.value.message = null
         commentState.value.reply_to = null
         store.notify('success', 'Komentar ditambahkan', 'send-comment')
         isReplyingTo.value = null
         await fetchComments()
      })
      .finally(() => isCommentSending.value = false)
}

const download = async () => {
   isDownloading.value = true
   await downloadDataFile(data.value!)
      .then(() => {
         store.notify('success', 'Data berhasil diunduh', 'download-file-success')
      })
      .finally(() => isDownloading.value = false)
}

const updateStatusLoading = ref<boolean>(false)

const updateStatus = async (verified: boolean) => {
   updateStatusLoading.value = true
   const status: number = verified ? 2 : 3
   await updateDataStatus(data.value!.id, status)
      .then(async (resp) => {
         store.notify('success', resp)
         await fetchDataDetails()
      })
      .finally(() => updateStatusLoading.value = false)
}
</script>