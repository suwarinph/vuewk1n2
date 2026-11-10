import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GradeCalculator from '../views/GradeCalculator.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/grade-calculator', name: 'grade-calculator', component: GradeCalculator },
    { path: '*', redirect: { name: 'home' } }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash === '#likes') return false
    if (to.hash) return { selector: to.hash, offset: { x: 0, y: 88 } }
    return { x: 0, y: 0 }
  }
})
