import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Rights from '@/components/rights/rights.vue'
import Roles from '@/components/role/roles.vue'
import Categories from '@/components/goods/categories.vue'
import Goods from '@/components/goods/goodslist.vue'
import Goodsadd from '@/components/goods/goodsadd.vue'
import Goodscate from '@/components/goods/goodscate.vue'


import { Message } from 'element-ui';
Vue.use(Router)

const router= new Router({
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
      },{
        name:'params',
        path:'/params',
        component:Categories
      },{
        name:'goods',
        path:'/goods',
        component:Goods,
        
      },{
        name:'goodsadd',
        path:'/goodsadd',
        component:Goodsadd,
        
      },{
        name:'goodscate',
        path:'/categories',
        component:Goodscate,
        
      }]
      
    }
  ]
})
// 路由守卫 在路由配置生效之前先进性筛选
router.beforeEach((to,from,next)=>{
  // console.log(to);
  if (to.path == '/login') {
    next()
  }else{
    const token = localStorage.getItem('token')
    if (!token) {
      Message.warning('回到登录'),
      router.push({
        
        name:'login'
      })
      return
    }
    next()
    // config.headers.common['Authorization'] = localStorage.getItem('token')
  }
  // next()
  // console.log(from);
  
})
export default router
