import Vue from 'vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate';

const components = { ValidationProvider, ValidationObserver}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
