import { createRouter, createWebHistory } from 'vue-router'
import userLogin from '../views/userLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: userLogin
    },
    {
      path: '/memo1',
      name: 'memo1',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/memo1.vue')
    },
    {
      path: '/memo2',
      name: 'memo2',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/memo2.vue')
    },
    {
      path: '/memo3',
      name: 'memo3',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/memo3.vue')
    },
    {
      path: '/fullCalendar',
      name: 'fullCalendar',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/fullCalendarPrint.vue')
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/userLogin.vue')
    },
  ]
})

export default router
