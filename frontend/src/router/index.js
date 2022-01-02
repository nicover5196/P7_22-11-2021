import Vue from 'vue'
import VueRouter from 'vue-router'
import Inscription from '../views/Inscription.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inscription',
    component: Inscription
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: () => import('../views/Connexion.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
  path:'/createPublication',
  name: 'CreatePublication',
  component: () => import('../views/CreatePublication.vue')
  },
  {
    path:'/:pathMatch(.*)',
    name:'NotFound',
    component:() => import('../views/NotFound.vue')
  }
  
]

const router = new VueRouter({
  routes
})

export default router
