import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Rights from '@/components/rights/rights.vue'
import Roles from '@/components/role/roles.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'login',
      path: '/login',
      component:Login
      
    },{
      name:'home',
      path: '/',
      component:Home,
      children:[{
        name:'users',
        path:'/users',
        component:Users
      },
      {
        name:'rights',
        path:'/rights',
        component:Rights
      },{
        name:'roles',
        path:'/roles',
        component:Roles
      }]
      
    }
  ]
})
