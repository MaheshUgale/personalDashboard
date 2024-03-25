import { createRouter, createWebHistory } from 'vue-router'
import Home from "/src/components/Home.vue"
import SignUp from "/src/components/SignUp.vue"
import Login from "/src/components/Login.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

export default router
