import Vuex from 'vuex'
import Vue from 'vue'
import base from './base'

Vue.use(Vuex)

export default () => new Vuex.Store({
  modules: {
    base
  }
})
