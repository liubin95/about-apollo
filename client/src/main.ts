import './assets/main.css';
import { apolloClient } from '@/apollo-client.ts';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { createPinia } from 'pinia';

import { createApp, provide, h } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App)
});

app.use(createPinia());
app.use(router);

app.mount('#app');
