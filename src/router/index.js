import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import download from '@/components/download'
import drawn from '@/components/drawer'
import examcenter from '@/components/examcenter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'drawn',
      component: drawn
    },
    {
      path: '/download',
      name: 'download',
      component: download
    },
    {
      path: '/examcenter',
      name: 'examcenter',
      component: examcenter
    }
  ]
})
