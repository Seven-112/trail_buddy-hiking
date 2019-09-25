import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import TrailFinder from './views/trail_finder.vue'
import TrailInfo from './views/trail_info.vue'
import EventFinder from './views/event_finder.vue'
import EventInfo from './views/event_info.vue'
import Private from './views/private.vue'
import Login from './views/login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/trail-finder',
      component: TrailFinder,
    },
    {
      path: '/trail-info',
      component: TrailInfo
    },
    {
      path: '/event-finder',
      component: EventFinder
    },
    {
      path: '/event-info',
      component: EventInfo
    },
    {
      path: '/private',
      component: Private
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
