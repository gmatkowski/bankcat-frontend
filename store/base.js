export const state = () => ({
  title: process.env.APP_NAME
})

export const getters = {
  title(state) {
    return state.title
  }
}
