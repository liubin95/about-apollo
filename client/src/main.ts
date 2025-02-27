import './assets/main.css'
import { apolloClient } from '@/apollo-client.ts'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp, provide, h } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.mount('#app')
