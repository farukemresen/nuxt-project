import type { User } from '~/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const STORAGE_KEY = 'users'

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

  return {
    users,
    fetchUsers,
    getFromLocal,
    saveToLocal,
  }
})
