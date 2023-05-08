import {RouteRecordRaw} from 'vue-router';

import PedidosIndex from '../pages/Pedidos/Index.vue'
import DeudasIndex from '../pages/Deudas/Index.vue'

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
        component: PedidosIndex,
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
        component: DeudasIndex,
        name: "deudas"
      }
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
