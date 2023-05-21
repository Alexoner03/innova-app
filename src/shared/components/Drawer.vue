<template>
  <q-drawer
    v-model="open"
    :width="200"
    :breakpoint="500"
    bordered
  >
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px;">
      <q-list>

        <template v-for="(menuItem, index) in Menu" :key="index">
          <q-item @click="go(menuItem.url)" clickable exact v-ripple :active="router.currentRoute.value.fullPath.includes(menuItem.url)">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.title }}
            </q-item-section>
          </q-item>
          <q-separator />
        </template>

        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="close" />
          </q-item-section>
          <q-item-section>
            Cerrar sesión
          </q-item-section>
        </q-item>
        <q-separator/>

      </q-list>
    </q-scroll-area>

    <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
      <div class="absolute-bottom bg-transparent">
        <div class="text-weight-bold">{{user?.nombre}}</div>
        <div>{{user?.cargo}}</div>
      </div>
    </q-img>

  </q-drawer>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {useDrawer} from "src/shared/composables/useDrawer";
import {useAuth} from "src/shared/composables/useAuth";

const {open, toggle} = useDrawer();
const router = useRouter();
const {closeSession, user} = useAuth()

const go = (link: string) => {
  router.replace(link)
  toggle()
}

const Menu = [
  {
    title: 'Pedidos',
    url: '/pedidos',
    icon: 'shopping_cart',
    link: 'https://quasar.dev'
  },
  {
    title: 'Deudas',
    url: '/deudas',
    icon: 'payments',
    link: 'https://quasar.dev'
  },
  {
    title: 'Datos cliente',
    url: '/clientes',
    icon: 'people',
    link: 'https://quasar.dev'
  },
  {
    title: 'Reportes',
    url: '/vendedores',
    icon: 'bar_chart',
    link: 'https://quasar.dev'
  },
];


const logout = () => {
  closeSession()
  router.push({name: "login"})
}

</script>

<style scoped>

</style>
