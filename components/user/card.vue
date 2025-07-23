<script setup lang="ts">
import type { User } from '~/types'

const _props = defineProps <{ user: User }>()
const router = useRouter()
</script>

<template>
  <li
    class="bg-white dark:bg-slate-900 shadow-md rounded-lg p-4 mb-4 hover:scale-105 transition-all flex items-center justify-between"
  >
    <div>
      <p class="font-mono font-semibold text-lg text-gray-900 dark:text-gray-100">
        {{ user.name }}
      </p>
    </div>
    <UIcon
      name="i-lucide-file-search-2"
      color="secondary"
      class="text-yellow-600 hover:text-yellow-900 text-2xl hover:scale-105 transition-all cursor-pointer"
      @click="() => router.push(`/users/${user.id}`)"
    />
  </li>
</template>
