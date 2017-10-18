import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import UserList from '@/components/user/List'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'home',
    component: Home,
    path: '/home',
    alias: '',
    redirect: {
      name: '/user/list'
    },
    children: [{
      name: '/user/list',
      component: UserList,
      path: '/user/list',
      alias: 'user/list'
    }]
  }]
})
