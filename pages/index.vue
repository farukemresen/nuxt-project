<script setup lang="ts">
definePageMeta({
  name: 'home',
})

const userStore = useUserStore()

onMounted(async () => {
  await userStore.fetchUsers()
})
</script>

<template>
  <div class="w-full mt-8 px-4 max-w-md mx-auto space-y-4 pb-24">
    <UserCard
      v-for="user in userStore.users"
      :key="user.id"
      :user="user"
    />
  </div>
</template>
