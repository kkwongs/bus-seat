<template>
  <div class="fixed right-0 bottom-0 left-0 z-9999 border-t border-slate-100">
    <nav
      class="flex h-14 bg-slate-50 px-6 *:inline-flex *:h-full *:w-full *:items-center *:justify-center *:text-xs *:uppercase"
    >
      <router-link to="/">home</router-link>
      <router-link to="/user/routes">Search</router-link>
      <router-link to="/user/my">my</router-link>
    </nav>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
