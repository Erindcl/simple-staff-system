import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../pages/404.vue'
import Layout from '../layout/index.vue'
import Home from '../pages/home.vue'
import Login from '../pages/login.vue'

const routerConfig = [
  {
    path: '/',
    component: Layout,
    name: '首页',
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: '首页',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routerConfig
})

export default router
