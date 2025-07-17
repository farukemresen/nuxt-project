<script setup lang="ts">
import type { Todo, User } from '@/types'
import { useTodoStore, useUserStore } from '#imports'

definePageMeta({
  name: 'details',
})

const route = useRoute()
const _todoStore = useTodoStore()
const userStore = useUserStore()

const user = computed(() =>
  userStore.users.find(u => u.id === Number(route.params.id)),
)
</script>

<!---- kullanıcıadı, todo'ları stordan çek.
  todo arama inputu ve yapılanları listele butonu.
  altta todo'ları listele.
  her biri için yapıldı_yapılmadı, delete, todo detayı butonu.
  işlem sonrası sağ altta toast bildirim. -->

<template>
  <div class=" px-4 py-8">
    <div v-if="user" class="mb-10 pb-4">
      <p class="text-lg">
        Kullanıcı adı: {{ user.name }}
      </p>
      <p class="text-md">
        Kullanıcı ID: {{ user.id }}
      </p>
      <p class="text-md">
        Kullanıcı E-mail: {{ user.email }}
      </p>
    </div>
  </div>
</template>
