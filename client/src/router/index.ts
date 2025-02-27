import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/movie',
      name: 'movie',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/movie/MovieList.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/Login.vue'),
      // 添加 props 配置，允许将路由参数作为组件的 props
      props: (route) => ({
        redirect: route.query.redirect,
      }),
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: () => import('../views/movie/component/MovieDetail.vue'),
      props: true,
    },
  ],
})

export default router
