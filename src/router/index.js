import Vue from 'vue'
import Router from 'vue-router'
import Logic from '../views/Logic.vue'
import Home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Logic
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
