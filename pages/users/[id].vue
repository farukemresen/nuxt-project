<script setup lang="ts">
import { useTodoStore, useUserStore } from '#imports'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const todoStore = useTodoStore()
const userStore = useUserStore()
const route = useRoute()

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
          >
            Tümü
          </UButton>
          <UButton
            size="sm"
            color="primary"
            variant="outline"
            rounded
          >
            Yapılanlar
          </UButton>
          <UButton
            size="sm"
            color="warning"
            variant="outline"
            rounded
          >
            Yapılmayanlar
          </UButton>
        </div>
      </div>
      <!-- sağ taraf -->
      <div class="md:col-span-2 space-y-4">
        <h2 class="text-3xl font-semibold text-indigo-300 mb-2 text-center">
          Todo Listesi
        </h2>
      </div>
    </div>
  </div>
</template>
