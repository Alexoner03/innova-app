import {RouteRecordRaw} from 'vue-router';

import PedidosIndex from '../pages/Pedidos/Index.vue'
import DeudasIndex from '../pages/Deudas/Index.vue'
import ClientesIndex from '../pages/Clientes/Index.vue'
import VendedorIndex from '../pages/Vendedor/Index.vue'
import VentasIndex from '../pages/Ventas/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('pages/Login/Index.vue'),
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
    path: '/clientes',
    component: () => import('pages/Clientes/layouts/Layout.vue'),
    children: [
      {
        path: "",
        component: ClientesIndex,
        name: "clientes"
      }
    ]
  },

  {
    path: '/vendedores',
    component: () => import('pages/Vendedor/layouts/Layout.vue'),
    children: [
      {
        path: "",
        component: VendedorIndex,
        name: "vendedores"
      }
    ]
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
    path: '/ventas',
    component: () => import('pages/Ventas/layout/Layout.vue'),
    children: [
      {
        path: "",
        component: VentasIndex,
        name: "ventas"
      }
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
