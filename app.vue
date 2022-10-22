<script setup lang="ts">
useHead({
  charset: 'utf-8',
  titleTemplate: title => `${title} | Smart Brain`,
  link: [{ rel: 'icon', href: '/favicon.ico' }],
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
