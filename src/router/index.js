import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/welcome/Welcome.vue'
import User from '../views/user/User.vue'
import Roles from '../views/right/Roles.vue'
import Rights from '../views/right/Rights.vue'
import Categories from '../views/categorie/Categories.vue'
import Goods from '../views/good/Goods.vue'
import Addgoods from '../views/good/Addgoods.vue'

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
          path: 'users',
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
        },
        {
          path: 'categories',
          name: 'Categories',
          component: Categories
        },
        {
          path: 'goods',
          name: 'Goods',
          component: Goods
        },
        {
          path: 'addgoods',
          name: 'Addgoods',
          component: Addgoods
        }
      ]
    }
  ]
})
