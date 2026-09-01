<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md">
      <h1 class="text-2xl font-bold">마이 페이지</h1>

      <div>
        <p class="mt-2">
          <strong>{{ authStore.user?.name }}</strong
          >님 안녕하세요
        </p>
        <p class="text-xs text-slate-400">
          {{ authStore.user?.email }}
        </p>
      </div>

      <SectionSpace />

      <div>
        <RouterLink to="/user/reservations"><strong>예약 내역</strong></RouterLink>
        <div class="mt-2 rounded-xl bg-gray-50 px-4 py-5">
          <div v-if="false"></div>
          <div v-else class="flex flex-col gap-y-2 text-center">
            <div class="text-[13px] text-slate-600">예약 내역이 없습니다.</div>
            <RouterLink
              to="/user/routes"
              class="block rounded-lg border border-slate-100 bg-white px-3 py-1.5 text-sm text-slate-800"
            >
              예약하기
            </RouterLink>
          </div>
        </div>
      </div>

      <SectionSpace />

      <div>
        <strong>즐겨 찾기</strong>
        <div class="mt-2 rounded-xl bg-gray-50 px-4 py-5">
          <div v-if="false"></div>
          <div v-else class="flex flex-col gap-y-2 text-center">
            <div class="text-[13px] text-slate-600">즐겨 찾기 노선이 없습니다.</div>
            <RouterLink
              to="/user/routes"
              class="block rounded-lg border border-slate-100 bg-white px-3 py-1.5 text-sm text-slate-800"
            >
              추가하기
            </RouterLink>
          </div>
        </div>
      </div>

      <SectionSpace />

      <nav>
        <div class="mb-2">
          <strong>내 정보</strong>
        </div>
        <ul class="*:border-b *:border-slate-100 *:*:first:block *:*:first:py-4 *:*:first:text-sm">
          <li>
            <RouterLink to="" @click="showUnderDevelopmentAlert">회원정보 수정</RouterLink>
            <!-- <RouterLink to="/user/my/edit">회원정보 수정</RouterLink> -->
          </li>
          <li>
            <RouterLink to="" @click="showUnderDevelopmentAlert">카드 관리</RouterLink>
          </li>
        </ul>
      </nav>

      <button
        class="w-full border-b border-slate-100 py-4 text-start text-sm text-red-500"
        @click="handleLogout"
      >
        로그아웃
      </button>

      <SectionSpace />

      <div class="border-b border-slate-100 pb-4">
        <strong class="text-sm">고객센터 <a href="tel:0000-0000">0000-0000</a></strong>
        <div class="mt-2 text-xs text-gray-600">
          <p>운영시간 평일 09:00 - 18:00 (토∙일, 공휴일 휴무)</p>
          <p>점심시간 평일 12:00 - 13:00</p>
        </div>
      </div>

      <SectionSpace />

      <div class="flex flex-col text-sm *:py-2 *:text-start">
        <button>이용약관</button>
        <button><strong>개인정보처리방침</strong></button>
      </div>

      <div class="py-2 text-xs text-gray-600">
        <p>(주)Project95 · 대표 홍길동</p>
        <p>사업자등록번호 : 123-45-67890</p>
        <p>통신판매업 : 제 2026-경기-0000호</p>
        <p>주소 : 경기도 화성시 동탄구</p>
        <p>전화 : 0000-0000</p>
        <p>고객센터: help@busseat.com</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

import SectionSpace from '@/components/common/SectionSpace.vue'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()

  router.push('/login')
}

const showUnderDevelopmentAlert = () => {
  alert('해당 기능은 현재 개발 중입니다.')
}
</script>

<style scoped></style>
