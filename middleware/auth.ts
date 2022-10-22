export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()

  if (user.value) {
    if (to.path === '/login' || to.path === '/register')
      return '/'
  }

  if (!user.value) {
    if (to.path === '/profie/')
      return '/login'
  }
})
