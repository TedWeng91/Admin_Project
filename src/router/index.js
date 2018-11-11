import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/welcome/Welcome.vue'
import User from '../views/user/User.vue'
import Roles from '../views/right/Roles.vue'
import Rights from '../views/right/Rights.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: {path: '/welcome'},
      children: [
        {
          path: 'welcome',
          name: 'Welcom',
          component: Welcome
        },
        {
          path: 'user',
          name: 'User',
          component: User
        },
        {
          path: 'roles',
          name: 'Roles',
          component: Roles
        },
        {
          path: 'rights',
          name: 'Rights',
          component: Rights
        }
      ]
    }
  ]
})
