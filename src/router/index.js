import {createRouter, createWebHistory} from 'vue-router'
import addannouncement from '../views/addannouncement.vue'
import editannouncement from '../views/editannouncement.vue'
import userhomepage from '../views/userhomepage.vue'
import userannouncementdetail from '../views/userannouncementdetail.vue'
import adminhomepage from '../views/adminhomepage.vue'
import adminannouncementdetail from '../views/adminannouncementdetail.vue'
import Notfound from "@/views/Notfound.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/admin/announcement',
            name: 'adminhomepage',
            component: adminhomepage
        },
        {
            path: '/admin/announcement/:id',
            name: 'adminannouncementdetail',
            component: adminannouncementdetail,
        },
        // {
        //     path: '/',
        //     name: 'Chair',
        //     redirect: '/admin/announcement'
        // },
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
            path: '/user/announcement',
            name: 'userhomepage',
            component: userhomepage
        },
        {
            path: '/user/announcement/:id',
            name: 'userannouncementdetail',
            component: userannouncementdetail
        },
        {
            path: "/:pathMatch(.*)*",
            component: Notfound,
        }

    ]
})

export default router
