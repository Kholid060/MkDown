import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VuePrismEditor from 'vue-prism-editor'
import 'vue-prism-editor/dist/VuePrismEditor.css'
Vue.component('prism-editor', VuePrismEditor)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
