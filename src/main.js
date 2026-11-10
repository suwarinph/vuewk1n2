import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './styles/main.css'

Vue.use(Vuetify)
Vue.config.productionTip = false

new Vue({
  router,
  vuetify: new Vuetify(),
  render: (createElement) => createElement(App)
}).$mount('#app')
