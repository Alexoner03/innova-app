<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />

          <q-toolbar-title>
          Deudas
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <Drawer></Drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import Drawer from "src/shared/components/Drawer.vue";
import {useDrawer} from "src/shared/composables/useDrawer";
const {toggle} = useDrawer()
function toggleLeftDrawer() {
  toggle();
}
</script>

<style scoped>

</style>
