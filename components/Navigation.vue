<script setup>
import { useUserStore } from '~~/store/user.store'

const store = useUserStore()

const onLogout = async () => {
  try {
    return await store.logout()
  }
  catch (error) {
    throw new Error(error.message)
  }
}
</script>

<template>
  <div class="navbar bg-neutral px-5">
    <div class="navbar-start">
      <label class="btn btn-ghost btn-circle avatar">
        <div class="rounded-full">
          <a>
            <NuxtLink to="/">
              <img src="../assets/brain.png" alt="logo">
            </NuxtLink>
          </a>
        </div>
      </label>
    </div>

    <div class="navbar-center hidden sm:flex">
      <h1 class="text-2xl text-accent">
        Smart Brain
      </h1>
    </div>

    <div class="navbar-end">
      <label>
        <div v-if="store.name">
          <a class="link link-hover link-accent" @click="onLogout">Logout</a>
        </div>
        <div v-else>
          <NuxtLink
            v-if="$route.path === '/login'"
            to="/register"
            class="link link-hover link-accent"
          >Register
          </NuxtLink>
          <NuxtLink
            v-if="$route.path !== '/login'"
            to="/login"
            class="link link-hover link-accent"
          >Login
          </NuxtLink>
        </div>
      </label>

      <label>
        <div class="ml-4">
          <Theme />
        </div>
      </label>
    </div>
  </div>
</template>
