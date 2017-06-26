import Vue from 'vue'
import Router from 'vue-router'
import Action from '../components/Datepicker.vue'


import VueScroller from 'vue-scroller'

Vue.use(VueScroller)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/action',
      name: 'Action',
      component: Action
    }
  ]
})
