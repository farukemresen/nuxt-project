<script setup lang="ts">
import { navigateTo, useToast, useTodoStore } from '#imports'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const todoStore = useTodoStore()
const toast = useToast()
const route = useRoute()
const newTodoText = ref('')
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
</script>

<template>
  <div class="space-y-4 max-h-screen p-1 max-w-xl mx-auto">
    <h2 class="text-3xl font-semibold text-indigo-300 mb-4 text-center">
      Todo Listesi
    </h2>

    <div class="flex space-x-2 mb-4 justify-center w-110 max-w-md mx-auto">
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
        size="lg"
        rounded
        class="hover:bg-blue-800 hover:scale-105 hover:rotate-45 transition-all"
        @click="addTodo"
      />
    </div>

    <div class="flex flex-col space-y-3 w-130">
      <div
        v-for="todo in todoStore.filteredTodos"
        :key="todo.id"
        class="flex justify-between hover:scale-105 border border-indigo-600 rounded-lg p-4 bg-slate-800 text-indigo-100 shadow hover:shadow-lg transition"
      >
        <p class="font-medium">
          {{ todo.text }}
        </p>
        <div class="flex space-x-2">
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
            @click="navigateTo({
              name: 'info', params: { id: todo.id },
            })"
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
