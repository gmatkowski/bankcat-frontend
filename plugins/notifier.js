
export default ({ app, store, $axios }, inject) => {
  inject('notifier', {
    showMessage (message) {
      store.dispatch('snackbar/showMessage', message)
    }
  })
}
