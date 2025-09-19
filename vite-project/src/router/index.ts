import {  createRouter, createWebHashHistory } from 'vue-router'
import { useUserStore } from '../store/user'
import { storeToRefs } from 'pinia'

const routes = [
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
    path: '/articles/:slug', 
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