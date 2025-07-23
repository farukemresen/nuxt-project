<script setup lang="ts">

</script>

<template>
  <div class="fixed left-0 top-0 w-screen h-dvh flex flex-col overflow-y-auto bg-white dark:bg-neutral-900">
    <div
      class="dark:bg-sky-950 w-full absolute inset-x-0 -top-40 transform-gpu overflow-visible blur-3xl sm:-top-20 opacity-55 z-[-1]"
      aria-hidden="true"
    >
      <div
        class="relative aspect-1155/678 w-[720px] -translate-x-1/2 rotate-30 bg-gradient-to-tr from-neutral-900 to-neutral-900 dark:from-neutral-100 dark:to-neutral-100 opacity-10 sm:right-[calc(50%-60rem)] sm:w-[1403px]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
      <div
        class="bg-violet-950 absolute inset-x-0 -top-40 transform-gpu overflow-visible blur-3xl sm:-top-20"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-1155/678 w-[720px] -translate-x-1/2 rotate-30 bg-gradient-to-tr dark:from-neutral-100 from-neutral-900 dark:to-neutral-100 to-neutral-900 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[1155px]"
          style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
        />
      </div>
    </div>
    <USwitch
      color="secondary"
      checked-icon="i-heroicons-sun"
      unchecked-icon="i-heroicons-moon"
      variant="ghost"
      class="hover:scale-110 transition-all absolute top-4 right-4 z-50 flex items-center gap-2"
      @click="toggleTheme"
    />
    <AppHeader class="sticky top-0 z-40 bg-transparent backdrop-blur-md" />
    <div class="flex-1 w-full flex flex-col z-10">
      <slot />
    </div>
    <AppFooter class="sticky bottom-0 z-40 bg-transparent backdrop-blur-md" />
  </div>
</template>
