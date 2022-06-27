export default (axios) => ({
  register(form) {
    return axios.post('/api/auth/register', form);
  },
  verify(id, token) {
    return axios.post(`/api/auth/verify/${id}/${token}`);
  },
  forgotten(email) {
    return axios.post(`/api/auth/password/forgotten`, {
      email
    });
  },
  resetPassword(token, email) {
    return axios.post(`/api/auth/password/reset`, {
      token,
      email
    });
  },
})
