import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { User, LoginRequest } from '@/types'

import { login } from '@/services/api/auth'

const AUTH_STORAGE_KEY = 'bus-seat-auth'

interface StoredAuth {
  user: User
  accessToken: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => user.value !== null)

  const isAdmin = computed(() => user.value?.role === 'ADMIN')

  const loginUser = async (req: LoginRequest) => {
    isLoading.value = true

    try {
      const res = await login(req)

      user.value = res.user
      accessToken.value = res.accessToken

      persistAuth()
    } finally {
      isLoading.value = false
    }
  }

  const persistAuth = () => {
    if (!user.value || !accessToken.value) {
      return
    }

    const auth: StoredAuth = {
      user: user.value,
      accessToken: accessToken.value,
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
  }

  const restoreAuth = () => {
    const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY)

    if (!storedAuth) {
      return
    }

    try {
      const auth = JSON.parse(storedAuth) as StoredAuth

      user.value = auth.user
      accessToken.value = auth.accessToken
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }

  const logout = () => {
    user.value = null
    accessToken.value = null

    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  return { user, accessToken, isLoading, isAuthenticated, isAdmin, loginUser, restoreAuth, logout }
})
