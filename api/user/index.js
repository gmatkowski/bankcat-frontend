export default (axios) => ({
  update(form) {
    return axios.patch('/api/user', form);
  },
  changePassword(current_password, password, password_confirmation) {
    return axios.post('/api/user/password', {
      current_password,
      password,
      password_confirmation
    });
  }
})
