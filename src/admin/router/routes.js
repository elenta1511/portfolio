export default [
  {
    path: "/",
    component: () => import("../components/pages/about.vue"),
    name: 'about',
    meta: {
      title: "Блок «Обо мне»"
    }
  },
  {
    path: "/works",
    component: () => import("../components/pages/works.vue"),
    name: 'works',
    meta: {
      title: "Блок «Работы»"
    }
  },
  {
    path: "/reviews",
    component: () => import("../components/pages/reviews.vue"),
    name: 'reviews',
    meta: {
      title: "Блок «Отзывы»"
    }
  },
  {
    path: "/login",
    component: () => import("../components/pages/login.vue"),
    name: 'login',
    meta: {
      public: true
    }
  }
];