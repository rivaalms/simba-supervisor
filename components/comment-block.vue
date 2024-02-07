<script setup lang="ts">
type Comment = Model.Comment & {
   replies_visible: boolean
}

type Props = {
   comment: Model.Comment
   data: Model.Data
}

type Emits = {
   (
      e: 'reply',
      value: Model.Comment
   ): void
}

const dayjs = useDayjs()
const user = useAuthStore().getUser

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const comment = computed(() => props.comment as Comment)
</script>

<template>
   <div class="py-4 first:pt-0 last:pb-0 grid gap-4">
      <div class="flex items-center gap-4">
         <u-avatar
            src="https://avatars.githubusercontent.com/u/739984?v=4"
         ></u-avatar>

         <div class="text-sm">
            <p class="tracking-wide">
               {{ comment.user?.name }}

               <u-badge
                  v-if="comment.user?.id === user?.id"
                  variant="subtle"
                  color="emerald"
                  size="xs"
                  class="ms-1"
               >
                  Anda
               </u-badge>

               <u-badge
                  v-if="comment.user?.userable_type === 'supervisor'"
                  variant="subtle"
                  color="cyan"
                  size="xs"
                  class="ms-1"
               >
                  Pengawas
               </u-badge>

               <u-badge
                  v-if="comment.user?.userable_type === 'officer'"
                  variant="subtle"
                  color="gray"
                  size="xs"
                  class="ms-1"
               >
                  Pengawas
               </u-badge>

               <u-badge
                  v-if="!comment.user?.userable_type"
                  variant="subtle"
                  color="amber"
                  size="xs"
                  class="ms-1"
               >
                  Admin
               </u-badge>
            </p>
            <p class="text-gray-500">
               {{ comment.user?.email }}
            </p>
         </div>

         <div class="flex-grow self-start flex justify-end">
            <p class="text-gray-500 text-sm">
               {{ dayjs(comment.created_at).fromNow() }}
            </p>
         </div>
      </div>

      <p class="text-sm">
         {{ comment.message }}
      </p>

      <div class="flex divide-x">
         <template v-if="(comment.replies ?? []).length > 0">
            <u-button
               v-if="!comment.replies_visible"
               class="px-2 first:px-0 first:pe-2"
               color="gray"
               variant="link"
               size="xs"
               @click.stop="comment.replies_visible = true"
            >
               Lihat balasan ({{ comment.replies?.length }})
            </u-button>

            <u-button
               v-else
               class="px-2 first:px-0 first:pe-2"
               color="gray"
               variant="link"
               size="xs"
               @click.stop="comment.replies_visible = false"
            >
               Sembunyikan balasan
            </u-button>
         </template>

         <u-button
            class="px-2 first:px-0 first:pe-2"
            color="gray"
            variant="link"
            size="xs"
            @click.stop="emit('reply', comment)"
         >
            Balas
         </u-button>
      </div>

      <template v-if="comment.replies_visible && (comment.replies ?? []).length > 0">
         <div class="flex">
            <div class="border border-gray-300 border-dashed h-full mx-6"></div>
            <div class="flex-grow grid">
               <template v-for="reply in comment.replies">
                  <lazy-comment-block
                     :comment="reply"
                     :data="props.data"
                     @reply="emit('reply', reply)"
                  />
               </template>
            </div>
         </div>
      </template>
   </div>
</template>