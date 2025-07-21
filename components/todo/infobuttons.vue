<script setup lang="ts">
import { useTodoStore, useUserStore } from '#imports'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const todoStore = useTodoStore()
const userStore = useUserStore()
const route = useRoute()

const user = computed(() => userStore.users.find(u => u.id === Number(route.params.id)))

onMounted(() => {
  userStore.getFromLocal()
})

const uuid = ref('')
onMounted(async () => {
  uuid.value = await userStore.fetchUuid()
})

function onSearchInput(event: Event) {
  const target = event.target as HTMLInputElement
  todoStore.setSearchText(target.value)
}
</script>

<template>
  <div class="space-y-6 max-h-screen overflow-auto p-3" style="min-width: 280px;">
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
        v-model="todoStore.searchText"
        type="text"
        placeholder="Todo ara."
        size="md"
        rounded
        class="bg-slate-800 text-indigo-200 placeholder-indigo-400 w-full"
        @input="onSearchInput"
      />
    </div>

    <div class="flex gap-10 justify-center">
      <UButton
        size="sm"
        color="secondary"
        variant="outline"
        rounded
        :class="{ 'bg-teal-700 text-white': todoStore.filter === 'all' }"
        @click="todoStore.setFilter('all')"
      >
        Tümü
      </UButton>
      <UButton
        size="sm"
        color="primary"
        variant="outline"
        rounded
        :class="{ 'bg-teal-700 text-white': todoStore.filter === 'completed' }"
        @click="todoStore.setFilter('completed')"
      >
        Yapılanlar
      </UButton>
      <UButton
        size="sm"
        color="error"
        variant="outline"
        rounded
        :class="{ 'bg-teal-700 text-white': todoStore.filter === 'incomplete' }"
        @click="todoStore.setFilter('incomplete')"
      >
        Yapılmayanlar
      </UButton>
    </div>

    <div class="mt-4 text-amber-400 font-mono text-sm">
      UUID: {{ uuid }}
    </div>
  </div>
</template>
