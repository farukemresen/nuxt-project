<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  await userStore.fetchUsers()
})
</script>

<template>
  <div class="w-full mt-8 px-4 max-w-md mx-auto space-y-4 pb-24">
    <ul>
      <li
        v-for="user in userStore.users"
        :key="user.id"
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
    </ul>
  </div>
</template>
