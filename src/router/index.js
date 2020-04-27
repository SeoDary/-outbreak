import Vue from 'vue'
import VueRouter from 'vue-router'
import Manage from '../views/manage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Manage,
    redirect: "/login",
  },
  {
    path: '/login',
    component: ()=>import("../views/login/index.vue")
  },
  {
    path: '/manage',
    component: Manage,
  },
  {
    path: '/article',
    component: ()=>import('../views/article/index.vue'),
  },
  {
    path: '/page',
    component: ()=>import('../views/article/page.vue'),
  },
  {
    path: '/help',
    component: ()=>import('../views/help/index.vue'),
  },
  {
    path: '/register',
    component: ()=>import('../views/register/index.vue'),
  }
]


const router = new VueRouter({
  routes
})

//暂时注释，当需要需要再使用
/*router.beforeEach((to, from, next)=>{
  var token = localStorage.getItem("token");
  if(to.path == "/login"){
    next();
  }else{
    if(token){
      next();
    }else{
      next("/login")
    }
  }
})*/

export default router
