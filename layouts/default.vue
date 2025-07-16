<script setup lang="ts">
import { useThemeToggle } from '@/utils/tema'

const { isDark, colorMode } = useThemeToggle()

useHead({
  title: 'User Todo List',
})
</script>

<!---- başlık ve dark theme.
    dark theme utils'den alınacak
    utils kullanımı için appconfig -->

<template>
  <div class="flex left-0 top-0 w-full h-dvh ">
    <div class="fixed top-0 left-0 right-0 shadow-sm z-10">
      <div class="fixed top-0 right-0">
        <ClientOnly v-if="!colorMode?.forced">
          <USwitch
            color="info"
            default-value
            variant="ghost"
            class="py-5 px-5 hover:scale-110 transition-all"
            @click="isDark = !isDark"
          />
        </ClientOnly>
        <UIcon name="i-lucide-lightbulb" class="size-5 px-10 py-2 hover:bg-yellow-500 hover:scale-111 transition-all" />
      </div>
      <h1 class="text-6xl text-emerald-300 py-6 text-center border-0 font-bold">
        Kullanıcı ToDo Uygulaması
      </h1>
      <div class="mt-8 px-4 max-w-md mx-auto space-y-2 relative">
        <div
          class="bg-sky-950 w-full absolute inset-x-8 -top-40  transform-gpu overflow-hidden blur-3xl sm:-top-20 opacity-55"
          aria-hidden="true"
        >
          <div
            class="relative aspect-1155/678 w-188.5 -translate-x-3/2 rotate-30 bg-gradient-to-tr from-neutral-900 to-neutral-900 dark:from-neutral-100 dark:to-neutral-100 opacity-10 sm:right-[calc(50%-60rem)] sm:w-350.75"
            style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          />
        </div>
      </div>
      <div class="dark:bg-violet-950 absolute inset-x-8 -top-40 -z-30 transform-gpu overflow-hidden blur-3xl sm:-top-20" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-1155/678 w-188.5 -translate-x-1/2 rotate-30 bg-linear-to-tr dark:from-neutral-100 from-neutral-900 dark:to-neutral-100 to-neutral-900 opacity-10 sm:left-[calc(50%-30rem)] sm:w-288.75" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
    </div>
  </div>
  <div class="fixed bottom-0 left-0 w-full flex justify-center z-50">
    <a
      href="https://github.com/farukemresen"
      target="_blank"
      class="py-4 text-md font-mono text-purple-400 hover:underline hover:text-lime-300"
    >
      © farukemresen ~ 2025
    </a>
  </div>
</template>
