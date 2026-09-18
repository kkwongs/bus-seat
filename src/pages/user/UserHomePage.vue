<template>
  <div class="flex justify-center">
    <div class="w-full max-w-md space-y-4">
      <!-- 예치금 -->
      <div class="rounded-lg border border-slate-200 px-4 py-3 text-sm">
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
      <div class="p-4">
        <Swiper
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
            <div class="space-y-4 rounded-xl border-2 border-sky-900 bg-white p-5">
              <div>
                <div class="flex items-center justify-between">
                  <RouterLink
                    :to="`/user/routes/${route.routeId}`"
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
                    <p>
                      {{ route.boardingStop.stopName }}({{ route.boardingStop.stopNumber.trim() }})
                    </p>
                  </div>
                  <button
                    class="inline-flex w-16 items-center justify-center gap-x-0.5 self-baseline rounded-full px-3 py-1.5 text-xs transition"
                    :class="[
                      route.boardingStop.isNotification
                        ? ['border border-sky-500 bg-sky-500 text-slate-100']
                        : ['border border-slate-400 text-slate-400'],
                    ]"
                    @click="toggleNotification(route.boardingStop)"
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

                <div class="-mt-6 pl-1.5 text-sm text-slate-500">
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
                    <p>
                      {{ route.alightingStop.stopName }}({{
                        route.alightingStop.stopNumber.trim()
                      }})
                    </p>
                  </div>
                  <button
                    class="inline-flex w-16 items-center justify-center gap-x-0.5 self-baseline rounded-full px-3 py-1.5 text-xs transition"
                    :class="[
                      route.alightingStop.isNotification
                        ? ['border border-sky-500 bg-sky-500 text-slate-100']
                        : ['border border-slate-400 text-slate-400'],
                    ]"
                    @click="toggleNotification(route.alightingStop)"
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
                  <div class="mt-2 rounded-xl border border-sky-900 p-4 text-sm">예약하기</div>
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
                  <div class="rounded-xl bg-sky-600 p-4 text-sm text-slate-100">빠른예약</div>
                </button>
              </div>

              <div class="text-center text-xs text-slate-600">
                <p>* 기점 출발 60분 전까지 예약 가능하며,</p>
                <p>매일 오전 10시에 7일 후까지 예약이 오픈됩니다.</p>
              </div>
            </div>
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
      </div>
    </div>
  </div>

  <ReservationModal :open="isOpen" @close="isOpen = false" />
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

import { useFavoriteStore } from '@/stores/favorite'

import { showUnderDevelopmentAlert } from '@/utils/alert'

import ReservationModal from './components/ReservationModal.vue'

import { holidays } from '@/constants/holiday.ts'

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

const toggleNotification = (target: { isNotification: boolean }) => {
  target.isNotification = !target.isNotification
}

onMounted(favoriteStore.loadFavoriteRoutes)
</script>

<style scoped>
.swiper-slide:not(.swiper-slide-active) {
  opacity: 0.4;
}
</style>
