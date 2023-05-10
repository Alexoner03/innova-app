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

          <search-debts></search-debts>
      </q-toolbar>
    </q-header>

    <Drawer></Drawer>

    <q-page-container style="position: relative">
      <router-view></router-view>
    </q-page-container>

    <q-footer v-if="tab === 'Adelantos'">
      <footer-content></footer-content>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import Drawer from "src/shared/components/Drawer.vue";
import {useDrawer} from "src/shared/composables/useDrawer";
import {useTab} from "pages/Deudas/composables/useTab";
import {useDebt} from "src/shared/composables/useDebt";
import FooterContent from "pages/Deudas/components/FooterContent.vue";
import SearchDebts from "pages/Deudas/components/SearchDebts.vue";
const {toggle} = useDrawer()
const {tab} = useTab()
function toggleLeftDrawer() {
  toggle();
}
</script>

<style scoped>

</style>
