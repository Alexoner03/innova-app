import {RouteRecordRaw} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/Login/IndexPage.vue'),
    name: "login"
  },

  {
    path: '/pedidos',
    component: () => import('pages/Pedidos/layouts/Layout.vue'),
    children: [
      {
        path: "",
        component: () => import('pages/Pedidos/Index.vue'),
        name: "pedidos"
      }
    ],
  },

  {
    path: '/deudas',
    component: () => import('pages/Deudas/layouts/Layout.vue'),
    children: [
      {
        path: "",
        component: () => import('pages/Deudas/Index.vue'),
        name: "pedidos"
      }
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
