export default (axios) => ({
  store(form) {
    return axios.post('/api/expense', form);
  },
  my(page, perPage, from, to) {
    return axios.get('/api/expense/user', {
      params: {
        page,
        perPage,
        from,
        to
      }
    });
  },
  donut(from, to) {
    return axios.get('/api/expense/chart/donut', {
      params: {
        from,
        to
      }
    });
  }
})
