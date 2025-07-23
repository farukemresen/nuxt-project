<script setup lang="ts">
definePageMeta({
  name: 'details',
})

const todoStore = useTodoStore()
onMounted(async () => {
  await todoStore.getList()
})
</script>

<template>
  <div class="p-5 ">
    <h1 class="text-center font-mono font-semibold text-5xl text-cyan-700 mb-12  bg-gradient-to-r from-transparent via-indigo-800 to-transparent py-6 rounded-lg opacity-90">
      Kullanıcı Detayı
    </h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 ">
      <TodoInfobuttons />
      <TodoCard class="md:col-span-2" />
    </div>
  </div>
</template>
