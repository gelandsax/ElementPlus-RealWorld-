import {  createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../store/user'
import { storeToRefs } from 'pinia'

const routes = [
  {
    name:"articles",
    path:"/articles",
    component: () => import('../views/Home.vue'),
    children:[
      {
        name:'all_article',
        path:'all_article',
        component: () => import('../views/AllArticle.vue')
      },
      {
        name:'my_article',
        path:'my_article',
        component: () => import('../views/MyArticle.vue')
      }
    ]
  },
  { 
    name:'home',
    path: '/', 
    component: () => import('../views/Home.vue')
  },
  { 
    name:'login',
    path: '/login', 
    component: () => import('../views/Login.vue') 
  },
  { 
    name:'settings',
    path: '/settings', 
    component: () => import('../views/Settings.vue'),
    meta: { requiresAuth: true }
  },
  { 
    name:'create',
    path: '/editor', 
    component:  () => import('../views/Create_EditArticle.vue'),
    meta: { requiresAuth: true }
  },
  { 
    name:'editor',
    path: '/editor/:slug', 
    component:  () => import('../views/Create_EditArticle.vue'),
    meta: { requiresAuth: true }
  },
  { 
    name:'register',
    path: '/users', 
    component:  () => import('../views/Register.vue')
  },
  { 
    name:'profile',
    path: '/profiles', 
    component:  () => import('../views/Profile.vue')
  },
  { 
    name:'article',
    path: '/article/:slug', 
    component:  () => import('../views/Article.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
router.beforeEach((to,) => {
  let store = useUserStore();
  const { userinfo } = storeToRefs(store)
  
  if(to.meta.requiresAuth === true && userinfo.value == null){
    return '/login';
  }
})
export default router;