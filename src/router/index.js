import { createRouter, createWebHistory } from "vue-router";
import { useUsersStore } from "@/stores/user";

const routes = [
  {
    path: "/",
    name: "mainpage",
    redirect: "/announcement",
  },
  {
    path: "/unsubscribe/email",
    name: "unsubscribe",
    component: () => import("@/views/users/Unsubscribe.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    meta: { requiredRole: ["admin", "announcer"] },
    children: [
      {
        path: "announcement",
        name: "adminhomepage",
        component: () => import("@/views/admin/AdminAnnPage.vue"),
      },
      {
        path: "announcement/:id",
        name: "adminannouncementdetail",
        component: () => import("@/views/admin/AdminAnnDetailPage.vue"),
      },
      {
        path: "announcement/add",
        name: "addannouncement",
        component: () => import("@/views/admin/AddAnnPage.vue"),
      },
      {
        path: "announcement/:id/edit",
        name: "editannouncement",
        component: () => import("@/views/admin/EditAnnPage.vue"),
      },
    ],
  },
  {
    path: "/admin/announcement/viewer",
    name: "viewer",
    meta: { requiredRole: ["admin", "announcer"] },
    component: () => import("@/views/admin/ViewerAnnPage.vue"),
  },
  {
    path: "/admin/announcement/viewer/:id",
    name: "viewerannouncementdetail",
    meta: { requiredRole: ["admin", "announcer", "visitor"] },
    component: () => import("@/views/users/AnnDetailPage.vue"),
  },
  {
    path: "/admin/user",
    name: "adminuser",
    meta: { requiredRole: ["admin"] },
    children: [
      {
        path: "",
        name: "adminuserpage",
        component: () => import("@/views/admin/UsersPage.vue"),
      },
      {
        path: "add",
        name: "adduser",
        component: () => import("@/views/admin/AddUserPage.vue"),
      },
      {
        path: ":id/edit",
        name: "edituser",
        component: () => import("@/views/admin/EditUserPage.vue"),
      },
      {
        path: "match",
        name: "matchpassword",
        component: () => import("@/views/admin/MatchPassword.vue"),
      },
    ],
  },
  {
    path: "/announcement",
    name: "userhomepage",
    component: () => import("@/views/users/AnnPage.vue"),
  },
  {
    path: "/announcement/:id",
    name: "userannouncementdetail",
    component: () => import("@/views/users/AnnDetailPage.vue"),
  },
  {
    path: "/verify",
    name: "verify",
    component: () => import("@/views/otpverified/otpverificationView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/admin/loginPage.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/admin/registerView.vue"),
  },
  {
    path: "/403",
    name: "403",
    component: () => import("@/views/errorpage/403page.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/views/errorpage/Notfound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiredRole = to.meta.requiredRole;
  const usersStore = useUsersStore();
  let token = usersStore.token;

  // If the user's token is empty and there are tokens in localStorage, recall the user's data.
  if (!usersStore.refreshToken) {
    // console.log("1");
    usersStore.refreshToken = localStorage.getItem("refreshToken");
  }
  if (!token) {
    // console.log("2");
    if (await usersStore.recall()) {
      token = usersStore.token;
      // console.log(token, "token");
    }
  }
  // console.log(token, "token");
  // console.log(usersStore.role, "role");
  // If the user is trying to visit the login page and they are already authenticated, redirect them.
  if (to.path === "/login") {
    if (token) {
      if (usersStore.role === "admin") {
        next("/admin/announcement");
      } else {
        next("/admin/announcement/viewer");
      }
    } else {
      next();
    }
  } else if (requiredRole === undefined) {
    // If no specific role is required, allow access to the route.
    next();
  } else if (token && requiredRole.includes(usersStore.role)) {
    // If the user's role matches the required role, allow access to the route.
    // console.log("3");
    next();
  } else if (token && !requiredRole.includes(usersStore.role)) {
    // If the user's role does not match the required role, redirect them to the 403 page.
    next("/403");
  } else {
    next("/login");
  }
});

export default router;
