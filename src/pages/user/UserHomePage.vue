<template>
  <main class="min-h-screen p-8">
    <div class="mx-auto max-w-5xl">
      <p class="text-sm font-semibold text-blue-800">Bus Seat</p>

      <p class="mt-2 text-slate-500">
        <span class="font-medium">{{ authStore.user?.name }}</span
        >님, 안녕하세요.
      </p>

      <button
        class="mt-6 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-950"
        @click="handleLogout"
      >
        로그아웃
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()

  router.push('/login')
}
</script>

<style scoped></style>
