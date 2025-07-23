<script setup lang ="ts">
import { useTodoStore, useUserStore } from '#imports'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const todoStore = useTodoStore()
const userStore = useUserStore()

onMounted(async () => {
  await todoStore.getList()
  userStore.getFromLocal()

  const id = route.params.id
  todoStore.todo = todoStore.todos.find(todo => todo.id === id)
})

const user = computed(() => {
  const todo = todoStore.todos.find(todo => todo.id === route.params.id)
  return userStore.users.find(u => String(u.id) === todo?.userId)
})

const missingTodoId = route.params.id as string
todoStore.todo = todoStore.todos.find(todo => todo.id === missingTodoId)
</script>

<template>
  <div class="w-full top-0 mx-auto shadow-sm z-10 opacity-70">
    <h1 class="mt-5 text-center font-mono font-semibold text-5xl text-teal-500 rounded-lg px-6 py-8 ring shadow-xl ring-gray-700/5 transition-all bg-gradient-to-r from-transparent via-fuchsia-950 to-transparent">
      Todo Detayı
    </h1>

    <div class="mt-11 max-w-md space-y-2 mx-auto transition-all ">
      <p class="border-2 hover:border-fuchsia-800 hover:scale-110 text-center font-medium font-mono text-2xl text-indigo-300 mt-10 transition-all bg-slate-900 rounded-md px-4 py-6 ring shadow-lg ring-gray-900/5">
        Kullanıcı: {{ user?.name }}
      </p>

      <p class="border-2 hover:border-fuchsia-800 hover:scale-110 text-center font-medium font-mono text-2xl text-indigo-300 mt-10 transition-all bg-slate-900 rounded-md px-4 py-6 ring shadow-lg ring-gray-900/5">
        Todo ID'si: {{ todoStore.todo?.id }}
      </p>

      <p class="border-2 hover:border-fuchsia-800 hover:scale-110 text-center font-medium font-mono text-2xl text-indigo-300 mt-10 transition-all bg-slate-900 rounded-md px-4 py-6 ring shadow-lg ring-gray-900/5 flex justify-between items-center">
        <span>Açıklama: {{ todoStore.todo?.text }}</span>
      </p>

      <p
        class="border-2 text-center font-medium font-mono text-2xl hover:scale-105 transition-all mt-10 bg-slate-900 rounded-md px-4 py-6 ring shadow-lg ring-gray-900/5"
        :class="{
          'hover:border-green-500 text-green-300': todoStore.todo?.isCompleted,
          'hover:border-red-700 text-red-500': !todoStore.todo?.isCompleted,
        }"
      >
        Durum: {{ todoStore.todo?.isCompleted ? 'Tamamlandı' : 'Tamamlanmadı' }}
      </p>
    </div>
  </div>
</template>
