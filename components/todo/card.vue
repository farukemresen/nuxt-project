<script setup lang="ts">
import type { Todo } from '~/types'
import { useToast, useTodoStore } from '#imports'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const todoStore = useTodoStore()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const newTodoText = ref('')

onMounted(() => {
  todoStore.getList()
})

/**
 * toast ekleyince store'dan çağıramadım, fonksiyonları tekrar yazmak zorunda kaldım.
 */
function addTodo() {
  const text = newTodoText.value.trim()
  if (!text)
    return
  todoStore.addTodo(text, route.params.id as string)
  newTodoText.value = ''
  toast.add({ title: 'Todo eklendi.', color: 'warning' })
}

function deleteTodo(id: string) {
  todoStore.deleteTodo(id)
  toast.add({ title: 'Todo silindi.', color: 'error' })
}

function toggleCompleted(id: string) {
  todoStore.toggleCompleted(id)
  const current = todoStore.todos.find(t => t.id === id)
  if (current?.isCompleted)
    toast.add({ title: 'Tamamlandı işaretlendi.', color: 'success' })
  else
    toast.add({ title: 'Yapılmadı işaretlendi.', color: 'info' })
}

function detayaGit(todo: Todo) {
  router.push({
    name: 'users-todo-id',
    params: { id: String(todo.id) },
  })
}
</script>

<template>
  <div class="space-y-4 max-h-screen p-2 sm:p-4 w-full">
    <h2 class="text-3xl sm:text-4xl font-semibold text-indigo-300 mb-4 text-center">
      Todo Listesi
    </h2>

    <div class="flex justify-center mb-4">
      <div class="flex max-w-2xl w-100 space-x-2 items-center">
        <UInput
          v-model="newTodoText"
          placeholder="Yeni todo girin..."
          size="lg"
          rounded
          class="w-full"
          @keyup.enter="addTodo"
        />
        <UButton
          icon="lucide:plus"
          color="primary"
          variant="outline"
          size="md"
          rounded
          class="hover:bg-blue-800 hover:scale-105 hover:rotate-45 transition-all shrink-0 "
          @click="addTodo"
        />
      </div>
    </div>

    <div class="flex flex-col space-y-3 gap-4">
      <div
        v-for="todo in todoStore.filteredTodos"
        :key="todo.id"
        class="w-full max-w-2xl mx-auto flex items-center justify-between hover:scale-105 border border-indigo-600 rounded-lg p-4 bg-slate-800 text-indigo-100 shadow hover:shadow-lg transition"
      >
        <p class="font-medium">
          {{ todo.text }}
        </p>
        <div class="flex flex-wrap gap-2 justify-end">
          <UButton
            :icon="todo.isCompleted ? 'lucide:refresh-ccw' : 'lucide:check'"
            size="md"
            color="success"
            variant="outline"
            rounded
            class="hover:bg-violet-950 transition-all hover:scale-105"
            @click="toggleCompleted(todo.id)"
          />
          <UButton
            icon="lucide:info"
            size="md"
            color="primary"
            variant="outline"
            rounded
            class="hover:bg-violet-950 transition-all hover:scale-105"
            @click="detayaGit(todo)"
          />
          <UButton
            icon="lucide:x"
            size="md"
            color="error"
            variant="outline"
            rounded
            class="hover:bg-violet-950 transition-all hover:scale-105"
            @click="deleteTodo(todo.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
