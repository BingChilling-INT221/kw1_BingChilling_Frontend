import {createRouter, createWebHistory} from 'vue-router'
import homepage from '../views/homepage.vue'
import announcementdetail from '../views/announcementdetail.vue'
import addannouncement from '../views/addannouncement.vue'
import editannouncement from '../views/editannouncement.vue'

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
            name: 'addannouncement',
            component: addannouncement
        },
        {
            path: '/admin/announcement/:id/edit',
            name: 'editannouncement',
            component: editannouncement,
            props: true
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: {name: 'homepage'}
        }

    ]
})

export default router
