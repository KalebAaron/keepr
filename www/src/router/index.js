import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Keep from '@/components/Keep'
import Login from '@/components/Login'
import Register from '@/components/Register'
import MyKeeps from '@/components/MyKeeps'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/keep',
      name: 'Keep',
      component: Keep
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/mykeeps/:id',
      name: 'MyKeeps',
      component: MyKeeps
    }
  ]
})
