import Vue from 'vue'
import moment from 'moment'

Vue.filter('humanDate', date => {
  return moment(date).format('MMMM Do YYYY, h:mm');
})

Vue.filter('price', price => {
  if (isNaN(Number(price))) {
    return ''
  }

  const formatter = new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN'
  });

  return formatter.format(price / 100);
})


Vue.filter('trimLength', (string, length) => {
  return string.length > length ? string.substring(0, length) + "..." : string;
})
