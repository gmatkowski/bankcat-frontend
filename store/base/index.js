export default {
  namespaced: true,
  state: () => {
    return {
      title: process.env.APP_NAME
    }
  },
  getters: {
    title: (state) => state.title
  },
  mutations: {},
  actions: {}
}
