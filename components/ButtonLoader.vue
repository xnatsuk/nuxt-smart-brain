<script setup lang="ts">
defineProps({
  loading: Boolean,
})
</script>

<template>
  <button class="btn btn-primary shadow-lg" :class="{ loading }">
    <slot />
  </button>
</template>
