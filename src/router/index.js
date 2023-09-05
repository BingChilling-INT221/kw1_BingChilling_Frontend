import {createRouter, createWebHistory} from 'vue-router'
import AddAnnPage from '../views/admin/AddAnnPage.vue'
import EditAnnPage from '../views/admin/EditAnnPage.vue'
import AnnPage from '../views/users/AnnPage.vue'
import AnnDetailPage from '../views/users/AnnDetailPage.vue'
import AdminAnnPage from '../views/admin/AdminAnnPage.vue'
import AdminAnnDetail from '../views/admin/AdminAnnDetailPage.vue'
import Notfound from "@/views/Notfound.vue";
import UsersPage from "@/views/admin/UsersPage.vue";
import AddUserPage from "@/views/admin/AddUserPage.vue";
import EditUserPage from "@/views/admin/EditUserPage.vue";
import MatchPassword from "@/views/admin/MatchPassword.vue";

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
            component: AdminAnnPage,
        },
        {
            path: '/admin/announcement/:id',
            name: 'adminannouncementdetail',
            component: AdminAnnDetail,
        },
        {
            path: '/admin/announcement/add',
            name: 'addannouncement',
            component: AddAnnPage
        },
        {
            path: '/admin/announcement/:id/edit',
            name: 'editannouncement',
            component: EditAnnPage,
        },
        {
            path: '/announcement',
            name: 'userhomepage',
            component: AnnPage
        },
        {
            path: '/announcement/:id',
            name: 'userannouncementdetail',
            component: AnnDetailPage
        },
        {
            path: '/admin/user',
            name: 'adminuserpage',
            component: UsersPage
        },
        {
            path: '/admin/user/add',
            name: 'adduser',
            component: AddUserPage
        },
        {
            path: '/admin/user/:id/edit',
            name: 'edituser',
            component: EditUserPage,
        },
        {
            path: '/admin/user/match',
            name: 'matchpassword',
            component: MatchPassword,
        },
        {
            path: "/:pathMatch(.*)*",
            component: Notfound,
        }
        

    ]
})

export default router