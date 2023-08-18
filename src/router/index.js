import {createRouter, createWebHistory} from 'vue-router'
import addannouncement from '../views/admin/AddAnnPage.vue'
import editannouncement from '../views/admin/EditAnnPage.vue'
import userhomepage from '../views/users/AnnPage.vue'
import userannouncementdetail from '../views/users/AnnDetail.vue'
import adminannouncementdetail from '../views/admin/AnnDetail.vue'
import Notfound from "@/views/Notfound.vue";
import adminhomepage from "@/views/admin/AnnPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Notfound',
            component: Notfound
        },
        {
            path: '/admin/announcement',
            name: 'adminhomepage',
            component: adminhomepage,
        },
        {
            path: '/admin/announcement/:id',
            name: 'adminannouncementdetail',
            component: adminannouncementdetail,
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
            path: '/announcement',
            name: 'userhomepage',
            component: userhomepage
        },
        {
            path: '/announcement/:id',
            name: 'userannouncementdetail',
            component: userannouncementdetail
        },
        {
            path: '/admin/users',
            name: 'adminusers',
            component: () => import('../views/admin/UsersPage.vue')
        },
        {
            path: "/:pathMatch(.*)*",
            component: Notfound,
        }

    ]
})

export default router
