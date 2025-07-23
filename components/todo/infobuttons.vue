<script setup lang="ts">
const todoStore = useTodoStore()
const userStore = useUserStore()
const route = useRoute()

const user = computed(() => userStore.users.find(u => u.id === Number(route.params.id)))

function onSearchInput(event: Event) {
  const target = event.target as HTMLInputElement
  todoStore.setSearchText(target.value)
}
</script>

<template>
  <div class="space-y-6 max-h-screen overflow-auto p-3" style="min-width: 280px;">
    <div class="bg-slate-900 rounded-lg shadow-lg p-6 border border-teal-700 text-indigo-200 hover:scale-105 transition-all">
      <h2 class="text-2xl font-bold text-center mb-4">
        Kullanıcı Bilgileri
      </h2>
      <p class="font-semibold text-lg">
        İsim: {{ user?.name }}
      </p>
      <p class="font-semibold text-lg">
        E-mail: {{ user?.email }}
      </p>
      <p class="font-semibold text-lg">
        ID: {{ user?.id }}
      </p>
    </div>
    <div class="bg-slate-900 rounded-lg shadow-lg p-4 border border-teal-700 text-indigo-200 hover:scale-105 transition-all  w-full max-w-screen-md mx-auto">
      <p class="text-lg text-center font-semibold font-sans text-lime-500">
        Todo Filtreleme:
      </p>
      <div class="flex flex-wrap gap-10 justify-center mt-3 items-center">
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
      <div class="flex p-3 mt-5">
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
    </div>
  </div>
</template>
