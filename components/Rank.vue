<script setup>
import { useUserStore } from '@/store/user.store'

const store = useUserStore()
</script>

<template>
  <div class="stats shadow-lg flex flex-col sm:flex-row">
    <div class="stat place-items-center sm:justify-items-center">
      <div v-show="store.avatar" class="stat-figure">
        <div class="avatar">
          <div class="w-16 rounded-full">
            <img :src="store.avatar">
          </div>
        </div>
      </div>
      <div class="stat-title">
        Name
      </div>
      <div class="stat-value text-accent">
        {{ store.name }}
      </div>
    </div>

    <div class="stat place-items-center">
      <div class="stat-figure text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-8 h-8 stroke-current"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>
      <div class="stat-title">
        Score
      </div>
      <div class="stat-value text-secondary">
        {{ store.score }} Points
      </div>
    </div>
  </div>
</template>
