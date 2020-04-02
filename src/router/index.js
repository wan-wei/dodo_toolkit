import Vue from 'vue'
import Router from 'vue-router'
import TimeToAnimal from '@/components/TimeToAnimal'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TimeToAnimal',
      component: TimeToAnimal
    }
  ]
})
