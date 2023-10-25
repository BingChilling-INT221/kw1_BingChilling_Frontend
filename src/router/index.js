import {createRouter, createWebHistory} from 'vue-router'
import {useUsersStore} from "@/stores/user";

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


// router.beforeEach((to, from, next) => {
//     const requiredRole = to.meta.requiredRole;
//     const usersStore = useUsersStore();
//     const role = usersStore.role;
//     // console.log(role);
//     const token = localStorage.getItem('token');
//     // console.log(role);
//     // console.log(requiredRole);
//     if (token && to.path === '/login') {
//         next('/admin/announcement');
//     }
//     else if (!token && to.path == '/login') {
//         next('/login');
//     }
//     console.log(Boolean(!token && to.path == '/login'))
//     console.log(Boolean(token ))
//     console.log(Boolean(to.path == '/login'))
//     if (requiredRole === undefined) {
//         console.log(requiredRole, "requiredRole")
//         console.log(role, "role")
//         console.log(to.path, "to.path")
//         console.log("undefined");
//         next();
//     }
//     if (requiredRole.includes(role)) {
//         console.log("includes");
//         next();
//     }
//     else {
//         next('/login');
//     }
// });
router.beforeEach(async (to, from, next) => {
    const requiredRole = to.meta.requiredRole;
    const usersStore = useUsersStore();
    const token = usersStore.token;
    const role = usersStore.role;

    // If the user's token is empty and there are tokens in localStorage, recall the user's data.
    if (!token && (localStorage.getItem('token') || localStorage.getItem('refreshToken'))) {
        await usersStore.recall();
    }

    // If the user is trying to visit the login page and they are already authenticated, redirect them.
    if (to.path === '/login') {
        if (token) {
            next('/admin/announcement');
        } else {
            next();
        }
    } else if (requiredRole === undefined) {
        // If no specific role is required, allow access to the route.
        next();
    } else if (requiredRole.includes(role)) {
        // If the user's role matches the required role, allow access to the route.
        next();
    } else if (to.path.includes('admin')) {
        // If the user is trying to access an admin route, check their token.
        if (token) {
            next();
        } else {
            next('/403');
        }
    } else {
        // If none of the conditions match, allow access to the route.
        next();
    }
});
export default router