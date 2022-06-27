export const actions = {
  async nuxtServerInit({commit}, {req}) {
    let auth = null
    if (req.headers.cookie) {
      try {
        const {data} = await this.$axios.get('/auth/me')
        auth = data.data
      } catch (err) {
        auth = null
      }
      this.$auth.setUser(auth)
    }
  },
}
