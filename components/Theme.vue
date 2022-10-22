<script setup lang="ts">
const useTheme = useColorMode()
const toggleTheme = () => {
  if (useTheme.value === 'dark')
    return useTheme.value = 'light'

  return useTheme.value = 'dark'
}

const theme = computed(() => {
  if (useTheme.value === 'dark')
    return true

  return false
})
</script>

<template>
  <div>
    <label class="swap swap-rotate">
      <input type="checkbox" @click="toggleTheme()">
      <span v-if="!theme" class="i-carbon:sun text-accent hover:text-accent-focus" />
      <span v-else class="i-carbon:moon text-accent hover:text-accent-focus" />
    </label>
  </div>
</template>
