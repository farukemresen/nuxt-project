<script setup lang="ts">
definePageMeta({
  name: 'users-todo-id',
})

const userStore = useUserStore()
const todoStore = useTodoStore()
const route = useRoute()

onMounted(async () => {
  await todoStore.getList()
  userStore.getFromLocal()

  const id = route.params.id
  todoStore.todo = todoStore.todos.find(todo => todo.id === id)
})
</script>

<template>
  <TodoDetail />
</template>
