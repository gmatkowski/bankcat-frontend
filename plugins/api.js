import auth from '@/api/auth'
import user from '@/api/user'
import bank from '@/api/bank'
import expense from '@/api/expense'

export default ({ app, $axios }, inject) => {
  inject('apiAuth', auth($axios))
  inject('apiUser', user($axios))
  inject('apiBank', bank($axios))
  inject('apiExpense', expense($axios))
}
