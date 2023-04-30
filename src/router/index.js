import { createRouter, createWebHistory } from 'vue-router'
import Notfound from '../views/Notfound.vue'
import Tables from '../components/Tables.vue'
import Tablesdetail from '../components/Tablesdetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin/announcement',
      name: 'tables',
      component: Tables
    },
    {
      path: '/admin/announcement/:id',
      name: 'Tablesdetail',
      component: Tablesdetail
    
      
    },
  ]
})

export default router
