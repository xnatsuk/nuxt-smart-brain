<script setup lang="ts">
import { calculateFaceLocation, displayFaceBox, fetchImageData } from '@/utils/clarifai'
import { useUserStore } from '~~/store/user.store'

const imageUrl = ref('')
const imageRef = ref<HTMLImageElement>()
const listFace = ref([])
const loading = ref(false)

const store = useUserStore()

const onClick = async () => {
  try {
    loading.value = true
    const response = await fetchImageData(imageUrl.value)

    displayFaceBox(calculateFaceLocation(response.data, imageRef.value), listFace)

    if (store.loggedIn)
      return await store.updateScore()
  }
  catch (error) {
    throw new Error(error)
  }
  finally {
    loading.value = false
  }
}

// clears the provided image and it's face boxes everytime the url is changed.
watch(imageUrl, () => {
  listFace.value = []
})
</script>

<template>
  <div class="flex justify-center">
    <img v-if="!imageUrl" class="max-w-xl" src="https://weandai.org/wp-content/uploads/2020/12/148-1-870x570.png">
    <div v-show="imageUrl" style="position: relative">
      <img ref="imageRef" class="max-w-xl" :src="imageUrl">
      <div v-for="(face, i) in listFace" :key="i">
        <div class="bounding-box" :style="face.style" />
      </div>
    </div>
  </div>
  <div class="hero py-12 bg-base-300">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 v-if="store.loggedIn" class="text-5xl font-bold">
          Welcome back {{ store.name }}!
        </h1>
        <h1 v-else class="text-5xl font-bold">
          Hello there!
        </h1>
        <p class="py-6">
          I will detect faces in your pictures. Provide a link below and I'll show you!
        </p>
        <input
          v-model.trim="imageUrl"
          class="input input-bordered input-primary shadow-lg w-full max-w-sm"
          placeholder="Image Url"
          @keyup.enter="onClick"
        >
        <ButtonLoader :loading="loading" class="my-6 px-8" @click="onClick">
          Detect
        </ButtonLoader>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bounding-box {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 0 0 3px hsl(var(--a)) inset;
}
</style>
