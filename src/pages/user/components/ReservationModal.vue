<template>
  <BaseModal :open="open" title="예약하기"> </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue'

interface Props {
  open: boolean
}
defineProps<Props>()
</script>

<style scoped></style>
