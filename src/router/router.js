import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../components/home/home"
import Index from "../components/index/index"
import Login from "../components/login/login"
import Search from "../components/search/search"
import Detail from "../components/detail/detail"
import Catagory from "../components/catagory/catagory"
import Register from "../components/register/register"
import Mine from "../components/mine/mine"
import Cart from "../components/cart/cart"
import {getCookie} from '../utils/utils'
Vue.use(VueRouter)

let router = new VueRouter({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/index/home'
        },
        {
            path:"/index",
            name:"index",
            component:Index,
            children:[
                {
                    path:"home",
                    name:"home",
                    component:Home,
                },
                {
                    path:"catagory",
                    name:"catagory",
                    component:Catagory,
                },
                {
                    path:"mine",
                    name:"mine",
                    component:Mine,
                },
                {
                    path:"cart",
                    name:"cart",
                    component:Cart,
                }
            ]
        },
        {
            path:"/login",
            name:"login",
            component:Login
        },
        {
            path:"/search",
            name:"search",
            component:Search,
        },
        {
            path:"/detail",
            name:"detail",
            component:Detail,
        },
        {
            path:"/register",
            name:"register",
            component:Register,
        }
    ]
  })

  router.beforeEach((to,from,next)=>{
      if(to.name=="mine" || to.name=='cart'){
        let token = getCookie('token')
        if(!token){
            next({name:"login",query:{from:to.name}})
        }else{
            next()
        }
      }else{
        next()
      }  
  })

export default router