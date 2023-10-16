import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'mainpage',
        redirect: '/announcement'
    },
    {
        path: '/admin',
        name: 'admin',
        meta: {requiredRole: ['admin', 'announcer']},
        children: [
            {
                path: 'announcement',
                name: 'adminhomepage',
                component: () => import('@/views/admin/AdminAnnPage.vue')
            },
            {
                path: 'announcement/:id',
                name: 'adminannouncementdetail',
                component: () => import('@/views/admin/AdminAnnDetailPage.vue')
            },
            {
                path: 'announcement/add',
                name: 'addannouncement',
                component: () => import('@/views/admin/AddAnnPage.vue')
            },
            {
                path: 'announcement/:id/edit',
                name: 'editannouncement',
                component: () => import('@/views/admin/EditAnnPage.vue')
            },
            {
                path: 'user',
                name: 'adminuserpage',
                component: () => import('@/views/admin/UsersPage.vue')
            },
            {
                path: 'user/add',
                name: 'adduser',
                component: () => import('@/views/admin/AddUserPage.vue')
            },
            {
                path: 'user/:id/edit',
                name: 'edituser',
                component: () => import('@/views/admin/EditUserPage.vue')
            },
            {
                path: 'user/match',
                name: 'matchpassword',
                component: () => import('@/views/admin/MatchPassword.vue')
            },
            {
                path: 'announcement/viewer',
                name: 'viewer',
                component: () => import('@/views/admin/ViewerAnnPage.vue')
            },
            {
                path: 'announcement/viewer/:id',
                name: 'viewerannouncementdetail',
                component: () => import('@/views/users/AnnDetailPage.vue')
            }

        ]
    },
    // {
    //     path: '/admin/announcement',
    //     name: 'adminhomepage',
    //     meta: {requiredRole: ['admin','announcer']},
    //     component: () => import('@/views/admin/AdminAnnPage.vue')
    // },
    // {
    //     path: '/admin/announcement/:id',
    //     name: 'adminannouncementdetail',
    //     component: () => import('@/views/admin/AdminAnnDetailPage.vue')
    // },
    // {
    //     path: '/admin/announcement/add',
    //     name: 'addannouncement',
    //     component: () => import('@/views/admin/AddAnnPage.vue')
    // },
    // {
    //     path: '/admin/announcement/:id/edit',
    //     name: 'editannouncement',
    //     component: () => import('@/views/admin/EditAnnPage.vue')
    // },
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
    // {
    //     path: '/admin/user',
    //     name: 'adminuserpage',
    //     component: () => import('@/views/admin/UsersPage.vue')
    // },
    // {
    //     path: '/admin/user/add',
    //     name: 'adduser',
    //     component: () => import('@/views/admin/AddUserPage.vue')
    // },
    // {
    //     path: '/admin/user/:id/edit',
    //     name: 'edituser',
    //     component: () => import('@/views/admin/EditUserPage.vue')
    // },
    // {
    //     path: '/admin/user/match',
    //     name: 'matchpassword',
    //     component: () => import('@/views/admin/MatchPassword.vue')
    // },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/admin/loginPage.vue')
    }, {
        path: '/register',
        name: 'register',
        component: () => import('@/views/admin/registerView.vue')
    },
    {
        path: '/403',
        name: '403',
        component: () => import('@/views/errorpage/403page.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/errorpage/Notfound.vue')
    }

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    const requiredRole = to.meta.requiredRole;
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    console.log(role);
    console.log(requiredRole);
    if (token && to.path === '/login') {
        next('/admin/announcement');
    }
    if (requiredRole === undefined) {
        next();
    }
    if (requiredRole.includes(role)) {
        next();
    } else {
        next('/login');
    }
});

export default router