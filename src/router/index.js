import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Notfound',
        component: () => import('@/views/Notfound.vue')
    },
    {
        path: '/admin/announcement',
        name: 'adminhomepage',
        component: () => import('@/views/admin/AdminAnnPage.vue')
    },
    {
        path: '/admin/announcement/:id',
        name: 'adminannouncementdetail',
        component: () => import('@/views/admin/AdminAnnDetailPage.vue')
    },
    {
        path: '/admin/announcement/add',
        name: 'addannouncement',
        component: () => import('@/views/admin/AddAnnPage.vue')
    },
    {
        path: '/admin/announcement/:id/edit',
        name: 'editannouncement',
        component: () => import('@/views/admin/EditAnnPage.vue')
    },
    {
        path: '/announcement',
        name: 'userhomepage',
        component: () => import('@/views/users/AnnPage.vue')
    },
    {
        path: '/announcement/:id',
        name: 'userannouncementdetail',
        component: () => import('@/views/users/AnnDetailPage.vue')
    },
    {
        path: '/admin/user',
        name: 'adminuserpage',
        component: () => import('@/views/admin/UsersPage.vue')
    },
    {
        path: '/admin/user/add',
        name: 'adduser',
        component: () => import('@/views/admin/AddUserPage.vue')
    },
    {
        path: '/admin/user/:id/edit',
        name: 'edituser',
        component: () => import('@/views/admin/EditUserPage.vue')
    },
    {
        path: '/admin/user/match',
        name: 'matchpassword',
        component: () => import('@/views/admin/MatchPassword.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/admin/loginPage.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/Notfound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router