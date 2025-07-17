import type { Todo } from '~/types'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { ref } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todo = ref<Todo>()
  const todos = ref<Todo[]>([])
  const STORAGE_KEY = 'todos'

  const getList = () => {
    const data = localStorage.getItem(STORAGE_KEY)
    todos.value = data ? JSON.parse(data) : []
  }

  const savetoLocal = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
  }

  const addTodo = (text: string, userId: string) => {
    const newId = uuidv4()
    todos.value.push({ id: newId, text, isCompleted: false, userId })
    savetoLocal()
  }

  const deleteTodo = (id: string) => {
    todos.value = todos.value.filter(t => t.id !== id)
    savetoLocal()
  }

  const getTodoById = (id: string) => {
    return todos.value.find(t => t.id === id)
    savetoLocal()
  }

  const toggleCompleted = (id: string) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.isCompleted = !todo.isCompleted
    }
    savetoLocal()
  }

  return {
    todo,
    todos,
    addTodo,
    deleteTodo,
    getTodoById,
    toggleCompleted,
    getList,
    savetoLocal,
  }
})
