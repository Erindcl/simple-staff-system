import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../pages/404.vue'
import Home from '../pages/home.vue'
import Login from '../pages/login.vue'

const routerConfig = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/404',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory,
  routes: routerConfig
})

export default router
