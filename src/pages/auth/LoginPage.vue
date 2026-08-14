<template>
  <main class="flex min-h-screen flex-col items-center justify-center space-y-10 px-4">
    <header class="text-blue-800">
      <h1 class="text-center text-2xl">안녕하세요</h1>
      <h1 class="text-center text-2xl"><span class="font-bold">Bus Seat</span>입니다.</h1>
    </header>

    <section class="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
      <form class="space-y-5" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="mb-2 block text-sm font-medium text-slate-700">
            아이디(이메일)
          </label>

          <input
            id="email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="user@busseat.co.kr"
            class="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm transition outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label for="password" class="mb-2 block text-sm font-medium text-slate-700">
            비밀번호
          </label>

          <input
            id="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            placeholder="8자 이상의 비밀번호"
            class="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm transition outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <p v-if="errorMessage" class="text-sm font-medium text-red-500">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          :disabled="authStore.isLoading"
          class="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ authStore.isLoading ? '로그인 중...' : '로그인' }}
        </button>
      </form>

      <div class="mt-6 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
        <p>테스트 계정</p>

        <p class="mt-1">user@example.com / password123!</p>

        <p>admin@example.com / admin1234@</p>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  errorMessage.value = ''

  if (!email.value || !password.value) {
    errorMessage.value = '이메일과 비밀번호를 입력해주세요.'

    return
  }

  try {
    await authStore.loginUser({
      email: email.value,
      password: password.value,
    })

    await router.push('/')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : '로그인에 실패했습니다.'
  }
}
</script>

<style scoped></style>
