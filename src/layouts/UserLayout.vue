<template>
  <div class="min-h-screen pb-14 text-slate-900">
    <AppHeader />

    <div class="flex">
      <main class="min-w-0 flex-1">
        <div class="mx-auto max-w-md p-4 sm:max-w-3xl lg:max-w-7xl lg:p-8">
          <RouterView />
        </div>
      </main>
    </div>
  </div>

  <AppNavigation />
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppNavigation from '@/components/layout/AppNavigation.vue'
</script>

<style scoped></style>
