import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TrailFinder from './views/trail_finder.vue'
import TrailInfo from './views/trail_info.vue'
import EventFinder from './views/event_finder.vue'
import EventInfo from './views/event_info.vue'
import Private from './views/private.vue'
import chatlogin from './views/chat.vue'

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
      path: '/trail_finder',
      component: TrailFinder,
    },
    {
      path: '/trail_finder/:detail/:itemID',
      component: TrailInfo,
      props: true
    },
    {
      path: '/event_finder',
      component: EventFinder,
    },
    {
      path: '/event_finder/:detail/:itemID',
      component: EventInfo,
      props: true
    },
    {
      path: '/private',
      component: Private
    }
  ]
})
