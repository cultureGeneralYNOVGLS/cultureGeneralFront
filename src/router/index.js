import Vue from 'vue'
import VueRouter from 'vue-router'
import ListGame from '../views/ListGame'
import Game from '../views/Game'
import CreateGame from '../views/CreateGame'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: ListGame
  },
  {
    path: '/game/:_id',
    name: 'game',
    component: Game
  },
  {
    path: '/create',
    name: 'create',
    component: CreateGame
  },
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
