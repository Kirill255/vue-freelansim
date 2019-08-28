import Vue from "vue";
import Router from "vue-router";

import Home from "./views/Home.vue";

// import AuthGuard from "./utils/AuthGuard";
import { store } from "./store";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      // route level code-splitting
      // this generates a separate chunk (profile.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "profile" */ "./views/Profile.vue"),
      // beforeEnter: AuthGuard
      meta: { requiredAuth: true }
    },
    {
      path: "/login",
      name: "login",
      component: () => import(/* webpackChunkName: "login" */ "./views/Auth/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import(/* webpackChunkName: "register" */ "./views/Auth/Register.vue")
    },
    {
      path: "*",
      redirect: { name: "home" }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth) {
    if (store.getters["auth"]) {
      next();
    } else {
      // router.push('/login')
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
