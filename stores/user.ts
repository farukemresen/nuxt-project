import type { User } from '~/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const runtimeConfig = useRuntimeConfig()
  const STORAGE_KEY = runtimeConfig.public.userKey as string

  const getFromLocal = () => {
    const data = localStorage.getItem(STORAGE_KEY)
    users.value = data ? JSON.parse(data) : []
  }

  const saveToLocal = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users.value))
  }

  async function fetchUsers() {
    const res = await fetch('https://mockly.atlaxt.me/api/users')
    if (!res.ok)
      throw new Error('Network error')
    const data = await res.json()
    users.value = data
    saveToLocal()
  }

  async function fetchUuid() {
    const res = await fetch('https://mockly.atlaxt.me/api/uuid')
    const data = await res.json()
    return data.uuid
  }

  return {
    users,
    fetchUsers,
    getFromLocal,
    saveToLocal,
    fetchUuid,
  }
})
