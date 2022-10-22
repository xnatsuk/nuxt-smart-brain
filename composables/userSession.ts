export const isLoggedIn = async (): Promise<boolean> => {
  const client = useSupabaseClient()
  const session = ref()

  const { data } = await client.auth.getSession()
  session.value = data.session

  if (!session.value)
    return false

  return true
}
