import type { UserInput, UserProfile } from '~~/utils/types/user'

export const useUserStore = defineStore('user', {
  state: () => <UserProfile>({
    name: undefined,
    score: 0,
    avatar: undefined,
    loggedIn: false,
  }),

  getters: {
    getName: state => state.name,
    getScore: state => state.score,
    getAvatar: state => state.avatar,
  },

  actions: {
    async login(user: UserInput) {
      try {
        const client = useSupabaseClient()

        return await client.auth.signInWithPassword({
          email: user.email,
          password: user.password,
        })
      }
      catch (error) {
        throw new Error('Login failed')
      }
      finally {
        this.loggedIn = true
      }
    },

    async register(user: UserInput) {
      try {
        const client = useSupabaseClient()

        return await client.auth.signUp({
          email: user.email,
          password: user.password,
          options: {
            data: {
              name: user.name,
            },
          },
        })
      }
      catch (error) {
        throw new Error('Registration failed')
      }
      finally {
        this.loggedIn = true
      }
    },

    async logout() {
      try {
        const client = useSupabaseClient()

        await client.auth.signOut()
      }
      catch (error) {
        throw new Error('Logout failed')
      }
      finally {
        this.name = undefined
        this.score = 0
        this.avatar = undefined
        this.loggedIn = false
      }
    },

    async fetchProfile() {
      try {
        const client = useSupabaseClient()
        const user = useSupabaseUser()
        const { data, error } = await client
          .from('profiles')
          .select('name, entries, avatar_url')
          .eq('id', user.value?.id)

        if (error)
          throw new Error(error.message)

        this.name = data[0].name
        this.score = data[0].entries
        this.avatar = data[0].avatar_url
      }
      catch (error) {
        throw new Error('Error fetching profile')
      }
    },

    async updateScore() {
      try {
        const client = useSupabaseClient()
        const user = useSupabaseUser()
        const { error } = await client.rpc('increment', { row_id: user.value?.id })

        if (error)
          throw new Error(error.message)
      }
      catch (error) {
        throw new Error('Error updating score')
      }
      finally {
        this.score += 1
      }
    },

    async updateAvatar(avatar: string) {
      try {
        const client = useSupabaseClient()
        const user = useSupabaseUser()
        const { error } = await client
          .from('profiles')
          .upsert({ avatar_url: avatar })
          .eq('id', user.value?.id)

        if (error)
          throw new Error(error.message)
      }
      catch (error) {
        throw new Error('Error updating avatar')
      }
    },
  },
})
