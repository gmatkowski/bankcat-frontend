export default (axios) => ({
  available() {
    return axios.get('/api/bank/available');
  }
})
