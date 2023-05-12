import {createRouter, createWebHistory} from 'vue-router'
import addannouncement from '../views/addannouncement.vue'
import editannouncement from '../views/editannouncement.vue'
import userhomepage from '../views/userhomepage.vue'
import userannouncementdetail from '../views/userannouncementdetail.vue'
import adminannouncementdetail from '../views/adminannouncementdetail.vue'
import Notfound from "@/views/Notfound.vue";
import adminhomepage from "@/views/adminhomepage.vue";

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
            path: "/:pathMatch(.*)*",
            component: Notfound,
        }

    ]
})

export default router
