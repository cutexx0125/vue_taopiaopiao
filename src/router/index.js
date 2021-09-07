import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/mv',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/movie/detail/:id',
    name: 'MovieDetail',
    component: () => import('../views/MovieDetail.vue')
  },
  {
    path: '/cinema',
    name: 'Cinema',
    component: () => import('../views/Cinema.vue')
  },
  {
    path: '/cinema/detail/:id',
    name: 'CinemaDetail',
    component: () => import('../views/CinemaDetail.vue')
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('../views/Me.vue')
  },
  {
    path: '/no',
    name: 'NoData',
    component: () => import('../views/NoData.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
