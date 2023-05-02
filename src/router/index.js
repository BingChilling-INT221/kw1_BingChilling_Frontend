import { createRouter, createWebHistory } from 'vue-router'
import Tables from '../components/Tables.vue'
import Tablesdetail from '../components/Tablesdetail.vue'
import Addtables from '../components/Addtables.vue'
import AnnouceDetail from '../views/Announcedetail.vue'
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
      component: AnnouceDetail
    },
    {
      path: '/',
      name: 'Chair',
      redirect: '/admin/announcement'
    },
    {
      path: '/admin/announcement/add',
      name: 'Addtables',
      component: Addtables
    },

  ]
})

export default router
