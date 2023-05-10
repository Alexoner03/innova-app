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

    <q-page-container style="position: relative">
      <router-view></router-view>
    </q-page-container>

    <q-footer v-if="tab === 'Adelantos'">
      <div class="bg-yellow flex justify-between items-center q-px-md" style="height: 50px">
        <div class="text-red text-bold" style="font-size: 20px">
          Total: <span class="text-black text-weight-bold" style="font-size: 20px">S/. {{tempAdvacementes.reduce((prev, curr) => prev + curr.acuenta,0).toFixed(2)}}</span>
        </div>
        <div>
          <q-btn color="primary">
            Enviar
          </q-btn>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import Drawer from "src/shared/components/Drawer.vue";
import {useDrawer} from "src/shared/composables/useDrawer";
import {useTab} from "pages/Deudas/composables/useTab";
import {useDebt} from "src/shared/composables/useDebt";
const {toggle} = useDrawer()
const {tab} = useTab()
const {tempAdvacementes} = useDebt()
function toggleLeftDrawer() {
  toggle();
}
</script>

<style scoped>

</style>
