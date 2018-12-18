import Vue from 'vue'
import Router from 'vue-router'
import Workspace from '@/components/Workspace/Workspace'
import HelloPage from '@/components/HelloPage/HelloPage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloPage',
      component: HelloPage
    },
    {
      path: '/workspace',
      name: 'Workspace',
      component: Workspace
    }
  ],
  mode: 'history'
})
