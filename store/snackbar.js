export const state = () => ({
  content: '',
  color: '',
  timeout: 2000,
  centered: false
})

export const mutations = {
  SHOW_MESSAGE(state, payload) {
    state.content = payload.content
    state.color = payload.color ?? 'red'
    state.timeout = payload.timeout ?? 2000
    state.centered = payload.centered ?? false
  }
}

export const actions = {
  async showMessage({commit}, payload) {
    commit('SHOW_MESSAGE', payload)
  }
}
