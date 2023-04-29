import { createRouter, createWebHistory } from 'vue-router'
import Notfound from '../views/Notfound.vue'
import Announcementdetail from '../views/Announcedetail.vue'
import Announcement from '../components/Announcement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'announce',
      component: Announcement
    },
    {
      path: '/:id',
      name: 'Announcementdetail',
      component: Announcementdetail
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'Notfound',
      component: Notfound
    },
  ]
})

export default router
