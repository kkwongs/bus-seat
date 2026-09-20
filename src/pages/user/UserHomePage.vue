<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md space-y-4">
      <!-- 마음 충전소 -->
      <div class="rounded-xl bg-sky-900 p-4">
        <span class="text-sm">🔋</span
        ><span class="text-xs font-bold text-sky-200">마음 충전소</span>
        <p class="mt-2 text-sm font-medium text-sky-50">
          {{ message }}
        </p>
      </div>

      <!-- 예치금 -->
      <div class="rounded-lg border border-slate-200 px-4 py-3 text-sm max-md:mb-2">
        <div class="flex items-center justify-between">
          <RouterLink to="" class="inline-flex items-center" @click="showUnderDevelopmentAlert">
            <span>예치금</span>
            <AngleRight />
          </RouterLink>
          <div class="space-x-2">
            <span class="font-bold text-sky-900">{{ deposit.toLocaleString('ko-KR') }}원</span>
            <button
              class="rounded-full bg-sky-600 px-3 py-1.5 text-xs text-slate-100"
              @click="showUnderDevelopmentAlert"
            >
              충전
            </button>
          </div>
        </div>
      </div>

      <!-- 공지사항 -->
      <div class="flex items-center gap-x-1 px-2">
        <div class="rounded-full bg-sky-50 p-1">
          <Megaphone :size="16" />
        </div>
        <RouterLink to="" class="text-[13px] text-slate-600" @click="showUnderDevelopmentAlert">
          공지사항
        </RouterLink>
      </div>

      <!-- 즐겨찾기 노선 -->
      <div class="md:p-4">
        <Swiper
          v-if="favoriteStore.favoriteRoutes.length"
          :centered-slides="true"
          :slides-per-view="1.25"
          :effect="'coverflow'"
          :coverflow-effect="{
            depth: 0,
            modifier: 1,
            rotate: 0,
            scale: 0.85,
            slideShadows: false,
            stretch: 0,
          }"
          :modules="modules"
          :pagination="pagination"
          :navigation="navigation"
          :slide-to-clicked-slide="true"
          :observer="true"
          :observe-parents="true"
        >
          <SwiperSlide v-for="route in visibleRoutes" :key="route.routeId">
            <div class="space-y-4 rounded-xl border-2 border-sky-900 bg-white px-5 py-4">
              <div>
                <div class="flex items-center justify-between">
                  <RouterLink
                    :to="`/user/routes/${route.routeId}?favoriteId=${route.favoriteId}`"
                    class="inline-flex items-end text-xl font-medium"
                  >
                    <span>{{ route.busCode }}</span>
                    <strong>{{ route.busNumber }}</strong>
                    <AngleRight :size="24" />
                  </RouterLink>
                  <button
                    class="text-xs font-medium text-slate-600"
                    @click="removeFavorite(route.favoriteId)"
                  >
                    <StarFill class="text-slate-400" :size="18" color="var(--color-sky-600)" />
                  </button>
                </div>

                <div class="text-xs">
                  <p class="font-semibold text-sky-900">기점출발 {{ route.departureTime }}</p>
                </div>
              </div>

              <!-- 예약 -->
              <div>
                <div class="grid grid-cols-[auto_1fr_auto] gap-x-1">
                  <MapMarker class="w-4 text-slate-500" />
                  <div class="text-sm">
                    <p class="text-slate-500">
                      승차 (&plusmn;{{ route.boardingStop.arrivalTime }})
                    </p>
                    <div class="grid grid-cols-[minmax(0,auto)_1fr]">
                      <span class="truncate">{{ route.boardingStop.stopName }}</span>
                      <span>({{ route.boardingStop.stopNumber.trim() }})</span>
                    </div>
                  </div>
                  <button
                    class="inline-flex w-16 items-center justify-center gap-x-0.5 self-baseline rounded-full px-3 py-1.5 text-xs transition"
                    :class="[
                      route.boardingStop.isNotification
                        ? ['border border-sky-500 bg-sky-500 text-slate-100']
                        : ['border border-slate-400 text-slate-400'],
                    ]"
                    @click="
                      toggleNotification(
                        route.favoriteId,
                        'boarding',
                        !route.boardingStop.isNotification,
                      )
                    "
                  >
                    <component
                      :is="route.boardingStop.isNotification ? Bell : BellSlash"
                      class="w-4"
                    />
                    <span :class="{ 'font-medium': route.boardingStop.isNotification }">
                      {{ route.boardingStop.isNotification ? 'ON' : 'OFF' }}
                    </span>
                  </button>
                </div>

                <div class="-mt-6 pl-1.5 text-sm text-slate-500 max-md:-space-y-1">
                  <div>&middot;</div>
                  <div>&middot;</div>
                  <div>&middot;</div>
                </div>

                <div class="grid grid-cols-[auto_1fr_auto] gap-x-1">
                  <MapMarker class="w-4 text-slate-500" />
                  <div class="text-sm">
                    <p class="text-slate-500">
                      하차 (&plusmn;{{ route.alightingStop.arrivalTime }})
                    </p>
                    <div class="grid grid-cols-[minmax(0,auto)_1fr]">
                      <span class="truncate">{{ route.alightingStop.stopName }}</span>
                      <span>({{ route.alightingStop.stopNumber.trim() }})</span>
                    </div>
                  </div>
                  <button
                    class="inline-flex w-16 items-center justify-center gap-x-0.5 self-baseline rounded-full px-3 py-1.5 text-xs transition"
                    :class="[
                      route.alightingStop.isNotification
                        ? ['border border-sky-500 bg-sky-500 text-slate-100']
                        : ['border border-slate-400 text-slate-400'],
                    ]"
                    @click="
                      toggleNotification(
                        route.favoriteId,
                        'alighting',
                        !route.alightingStop.isNotification,
                      )
                    "
                  >
                    <component
                      :is="route.alightingStop.isNotification ? Bell : BellSlash"
                      class="w-4"
                    />
                    <span :class="{ 'font-medium': route.alightingStop.isNotification }">
                      {{ route.alightingStop.isNotification ? 'ON' : 'OFF' }}
                    </span>
                  </button>
                </div>

                <button class="w-full" @click="isOpen = true">
                  <!-- 버튼 영역에서 Swiper 드래그가 동작하도록 내부 요소로 분리 -->
                  <div class="mt-2 rounded-xl border border-sky-900 p-2 text-sm md:p-4">
                    예약하기
                  </div>
                </button>
              </div>

              <!-- 빠른예약  -->
              <div class="space-y-2">
                <div
                  class="grid grid-cols-2 divide-x divide-dashed divide-slate-900 rounded bg-slate-200 text-center *:space-y-1 *:p-2 *:*:first:text-xs *:*:last:text-sm *:*:last:font-semibold"
                >
                  <div>
                    <p>빠른예약일</p>
                    <p>{{ quickReservation.date }}</p>
                  </div>
                  <div>
                    <p>잔여좌석</p>
                    <p>{{ quickReservation.seat }}</p>
                  </div>
                </div>

                <button class="w-full" @click="showUnderDevelopmentAlert">
                  <!-- 버튼 영역에서 Swiper 드래그가 동작하도록 내부 요소로 분리 -->
                  <div class="rounded-xl bg-sky-600 p-2 text-sm text-slate-100 md:p-4">
                    빠른예약
                  </div>
                </button>
              </div>

              <div class="text-center text-xs text-slate-600">
                <p>* 기점 출발 60분 전까지 예약 가능하며,</p>
                <p>매일 오전 10시에 7일 후까지 예약이 오픈됩니다.</p>
              </div>
            </div>

            <ReservationModal
              :open="isOpen"
              :departure-time="route.departureTime"
              @close="isOpen = false"
            />
          </SwiperSlide>

          <!-- Pagination -->
          <div class="flex items-center justify-center gap-x-5 p-4">
            <button class="navigation-prev">
              <AngleLeft :size="24" />
            </button>

            <div class="text-sm select-none">
              <div class="custom-pagination"></div>
              <div v-if="favoriteStore.favoriteRoutes.length === 1">
                <span class="font-bold">01</span>
                <span class="text-slate-400"> / </span>
                <span class="text-slate-400">01</span>
              </div>
            </div>

            <button class="navigation-next">
              <AngleRight :size="24" />
            </button>
          </div>
        </Swiper>
        <div v-else class="flex justify-center">
          <div class="w-83 space-y-4 rounded-xl border-2 border-sky-900 p-5">
            <div
              class="flex min-h-92.5 flex-col items-center justify-center gap-y-4 md:min-h-102.5"
            >
              <Star :size="40" class="text-slate-400" />
              <p class="text-center text-sm font-medium">즐겨찾기 노선이 없습니다</p>
              <div class="text-center text-xs text-slate-600">
                <p>하단 SEARCH 버튼이나 아래 노선 검색 버튼을</p>
                <p>선택하셔서 자주 이용하시는 노선의</p>
                <p>즐겨찾기를 설정해 주세요</p>
              </div>
              <RouterLink
                to="/user/routes"
                class="mt-4 inline-flex items-center gap-x-2 rounded-full bg-sky-600 px-10 py-2.5 text-slate-100"
              >
                <Search />노선 검색
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { addDays, format } from 'date-fns'
import { ko } from 'date-fns/locale'

import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'

import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

import AngleLeft from '@primeicons/vue/angle-left'
import AngleRight from '@primeicons/vue/angle-right'
import Bell from '@primeicons/vue/bell'
import BellSlash from '@primeicons/vue/bell-slash'
import MapMarker from '@primeicons/vue/map-marker'
import Megaphone from '@primeicons/vue/megaphone'
import StarFill from '@primeicons/vue/star-fill'
import Star from '@primeicons/vue/star'
import Search from '@primeicons/vue/search'

import { useFavoriteStore } from '@/stores/favorite'

import { showUnderDevelopmentAlert } from '@/utils/alert'

import ReservationModal from './components/ReservationModal.vue'

import { holidays } from '@/constants/holiday'
import { messages } from '@/constants/messages'

import type { UpdateFavoriteNotification } from '@/types'

const pagination = {
  el: '.custom-pagination',
  type: 'fraction' as const,

  renderFraction: (currentClass: string, totalClass: string) => {
    return `
      <span class="${currentClass} font-bold"></span>
      <span class="text-slate-400">/</span>
      <span class="${totalClass} text-slate-400"></span>
    `
  },

  formatFractionCurrent(number: number) {
    return String(number).padStart(2, '0')
  },

  formatFractionTotal(number: number) {
    return String(number).padStart(2, '0')
  },
}
const navigation = {
  nextEl: '.navigation-next',
  prevEl: '.navigation-prev',
}
const modules = [EffectCoverflow, Pagination, Navigation]

const favoriteStore = useFavoriteStore()

const deposit = ref<number>(3200)
const isOpen = ref<boolean>(false)

const isBusinessDay = (date: Date) => {
  const day = new Date(date).getDay()

  if (day === 0 || day === 6) {
    return true
  }

  const formatDate = format(new Date(date), 'yyyy-MM-dd')

  const isHoliday = holidays.some((holiday) => {
    if (!holiday.isHoliday) {
      return false
    }

    return formatDate >= holiday.start && formatDate <= holiday.endInclusive
  })

  return isHoliday
}

const message = computed<string>(() => {
  const randomIndex = Math.floor(Math.random() * messages.length)
  return messages[randomIndex].message
})

const quickReservation = computed(() => {
  let nextDate = addDays(new Date(), 1)

  while (isBusinessDay(nextDate)) {
    nextDate = addDays(nextDate, 1)
  }

  const date = format(nextDate, `yyyy-MM-dd (EEE)`, {
    locale: ko,
  })

  const seat = 2

  return {
    date,
    seat,
  }
})

const visibleRoutes = computed(() =>
  favoriteStore.favoriteRoutes.map((route) => {
    const [busCode, busNumber, operationType] = route.routeName.split(/(\d+)/)

    return {
      ...route,
      busCode,
      busNumber,
      operationType,
    }
  }),
)

const removeFavorite = (favoriteId: number) => {
  favoriteStore.deleteFavorite(favoriteId)
}

const toggleNotification = (favoriteId: number, target: string, isNotification: boolean) => {
  const data = { target, isNotification } as UpdateFavoriteNotification

  favoriteStore.updateNotification(favoriteId, data)
}

onMounted(favoriteStore.loadFavoriteRoutes)
</script>

<style scoped>
.swiper-slide:not(.swiper-slide-active) {
  opacity: 0.4;
}
</style>
