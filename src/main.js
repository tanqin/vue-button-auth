import Vue from 'vue'
import App from './App.vue'
import Auth from './components/Auth.vue'
import auth from './directives/auth'
import { getAuthList } from '@/utils/index'

Vue.component('Auth', Auth)

Vue.use(auth)

Vue.prototype.$getAuthList = getAuthList

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
