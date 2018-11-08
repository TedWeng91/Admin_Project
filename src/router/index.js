import Vue from 'vue'
import Router from 'vue-router'
import Logic from '../views/Logic.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/logic',
      name: 'logic',
      component: Logic
    }
  ]
})
