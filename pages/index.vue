<script setup lang="ts">
import type { User } from '@/types'

const { data: _users } = await useFetch('https://my-json-server.typicode.com/farukemresen/user-server/users')
</script>

 <!---- listeyi apı'dan çek, buraya yazdır.
  foto, isim ve user detay butonu bulunsun
  başlık ve dark buton defaulttan gelecek.
  tasarımı burada yap -->
<template>
  <div class="w-full">
    <div class="fixed top-0 left-0 right-0 shadow-sm z-10" />
  </div>
</template>
