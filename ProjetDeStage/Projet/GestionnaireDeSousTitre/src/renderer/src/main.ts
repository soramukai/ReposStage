import { createApp } from 'vue'
import App from './App.vue'
import routes from './class/routes'
import { createRouter, createWebHashHistory } from 'vue-router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.mount('#app')
