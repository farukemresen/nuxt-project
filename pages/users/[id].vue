<script setup lang="ts">
import { TodoCard, TodoInfobuttons } from '#components'
import { useTodoStore, useUserStore } from '#imports'
import { onMounted } from 'vue'

definePageMeta({
  name: 'details',
})

const todoStore = useTodoStore()
const userStore = useUserStore()

onMounted(() => {
  todoStore.getList()
  userStore.getFromLocal()
  todoStore.fetchTodos()
})
</script>

<template>
  <div class="p-5 ">
    <h1
      class="text-center font-mono font-semibold text-5xl text-teal-500 mb-12 bg-teal-900 py-6 rounded-lg opacity-90"
    >
      Kullanıcı Detayı
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10 ">
      <TodoInfobuttons />
      <TodoCard class="md:col-span-2" />
    </div>
  </div>
</template>
