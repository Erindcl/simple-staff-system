import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '../pages/404.vue'
import Layout from '../layout/index.vue'
import Login from '../pages/login.vue'
import Home from '../pages/home.vue'
import Staff from '../pages/staff.vue'

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
      },
      {
        path: 'staff',
        name: '员工管理',
        component: Staff
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
