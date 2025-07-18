<script setup lang="ts">
import { useToast, useTodoStore, useUserStore } from '#imports'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const todoStore = useTodoStore()
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const toast = useToast()

definePageMeta({
  name: 'user-details',
})

onMounted(() => {
  todoStore.getList()
  userStore.getFromLocal()
})

const user = computed(() =>
  userStore.users.find(u => u.id === Number(route.params.id),
  ),
)

const missingTodoId = route.params.id as string
todoStore.todo = todoStore.todos.find(todo => todo.id === missingTodoId)

const searchText = ref('')
const filter = ref<'all' | 'completed' | 'incomplete'>('all')
const newTodoText = ref('')
const uuid = ref('')

onMounted(async () => {
  uuid.value = await userStore.fetchUuid()
})

const filteredTodos = computed(() => {
  const userId = String(route.params.id)
  const search = (searchText.value ?? '').toLowerCase()
  const currentFilter = filter.value

  let result = todoStore.todos.filter(todo => todo.userId === userId)

  if (search)
    result = result.filter(todo => todo.text.toLowerCase().includes(search))

  if (currentFilter === 'completed')
    result = result.filter(todo => todo.isCompleted)
  else if (currentFilter === 'incomplete')
    result = result.filter(todo => !todo.isCompleted)

  return result
})

function addTodo() {
  const text = newTodoText.value.trim()
  if (!text)
    return

  todoStore.addTodo(text, route.params.id as string)
  toast.add({ title: 'Todo eklendi.', color: 'success' })
  newTodoText.value = ''
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
  <div class="p-5">
    <h1 class="text-center font-mono font-semibold text-5xl text-teal-500 mb-12 bg-teal-900  py-6 rounded-lg opacity-90 ">
      Kullanıcı Detayı
    </h1>

    <!-- sol taraf -->
    <div class="grid grid-cols-3 gap-10">
      <div class="space-y-6">
        <div class="bg-slate-900 rounded-lg shadow-lg p-6 border border-teal-700 text-indigo-200">
          <h2 class="text-2xl font-bold text-center mb-4">
            Kullanıcı Bilgileri
          </h2>
          <p class="font-semibold text-lg">
            İsim: {{ user?.name }}
          </p>
          <p class="font-semibold text-lg">
            Email: {{ user?.email }}
          </p>
          <p class="font-semibold text-lg">
            ID: {{ user?.id }}
          </p>
        </div>
        <div class="flex p-3">
          <UInput
            v-model="searchText"
            type="text"
            placeholder="Todo ara."
            size="md"
            rounded
            class="bg-slate-800 text-indigo-200 placeholder-indigo-400"
          />
        </div>
        <div class="flex gap-10">
          <UButton
            size="sm"
            color="secondary"
            variant="outline"
            rounded
            @click="filter = 'all'"
          >
            Tümü
          </UButton>
          <UButton
            size="sm"
            color="primary"
            variant="outline"
            rounded
            @click="filter = 'completed'"
          >
            Yapılanlar
          </UButton>
          <UButton
            size="sm"
            color="error"
            variant="outline"
            rounded
            @click="filter = 'incomplete'"
          >
            Yapılmayanlar
          </UButton>
        </div>
        <div class="mt-4 text-amber-400 font-mono text-sm">
          UUID: {{ uuid }}
        </div>
      </div>
      <!-- sağ taraf -->
      <div class="md:col-span-2 space-y-4">
        <h2 class="text-3xl font-semibold text-indigo-300 mb-2 text-center">
          Todo Listesi
        </h2>
        <div class="flex space-x-2 mb-4 justify-center p-3">
          <UInput
            v-model="newTodoText"
            placeholder="Yeni todo girin..."
            size="lg"
            rounded
            class="w-100"
            @keyup.enter="addTodo"
          />
          <UButton icon="lucide:plus" color="primary" rounded class="hover:bg-blue-800 hover:scale-105 hover:rotate-45 transition-all" @click="addTodo" />
        </div>
        <div class="flex flex-col items-center space-y-3">
          <div
            v-for="todo in filteredTodos"
            :key="todo.id"
            class="flex justify-between w-130 hover:scale-108 border border-indigo-600 rounded-lg p-4 bg-slate-800 text-indigo-100 shadow hover:shadow-lg transition"
          >
            <div>
              <p class="font-medium">
                {{ todo.text }}
              </p>
            </div>
            <div class="flex space-x-2 gap-1">
              <UButton
                :icon="todo.isCompleted ? 'lucide:refresh-ccw' : 'lucide:check'"
                size="md"
                color="success"
                variant="outline"
                class="hover:bg-violet-950 transition-all hover:scale-105"
                rounded
                @click="toggleCompleted(todo.id)"
              />
              <UButton
                icon="lucide:info"
                size="md"
                color="primary"
                variant="outline"
                rounded
                class="hover:bg-violet-950 transition-all hover:scale-105"
                @click="() => {
                  todoStore.todo = todo
                  router.push(`/todo/detay/${todo.id}`)
                }"
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
    </div>
  </div>
</template>
