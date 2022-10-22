<script setup lang="ts">
import { useUserStore } from '~~/store/user.store'

const store = useUserStore()

definePageMeta({
  middleware: ['auth'],
  keepalive: false,
})

useHead({
  title: 'Home',
})

onMounted(async () => {
  const loggedIn = await isLoggedIn()
  if (!loggedIn)
    store.loggedIn = false

  await store.fetchProfile()
  store.loggedIn = true
})
</script>

<template>
  <div>
    <FaceRecognition />
    <Rank v-show="store.loggedIn" />
  </div>
</template>
