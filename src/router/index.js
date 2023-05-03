import { createRouter, createWebHistory } from 'vue-router'
import homepage from '../views/Homeview.vue'
import Addtables from '../components/Addtables.vue'
import announcementdetail from '../views/Announcementdetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin/announcement',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/admin/announcement/:id',
      name: 'announcementdetail',
      component: announcementdetail
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
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: 'homepage' }
    }

  ]
})

export default router
