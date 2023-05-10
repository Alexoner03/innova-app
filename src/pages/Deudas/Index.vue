<template>
  <q-tabs
    v-model="tab"
    dense
    class="text-grey"
    active-color="primary"
    indicator-color="primary"
    align="justify"
    narrow-indicator
    style="height: 50px;"
  >
    <q-tab name="Pendientes" label="Pendientes"/>
    <q-tab name="Adelantos" label="Adelantos"/>
  </q-tabs>

  <q-separator/>

  <q-tab-panels v-model="tab" animated class="full-height">
    <q-tab-panel name="Pendientes" class="q-pa-none">
      <pendientes-tab />
    </q-tab-panel>

    <q-tab-panel name="Adelantos" class="q-pa-none">
      <adelantos-tab></adelantos-tab>
    </q-tab-panel>

  </q-tab-panels>

</template>

<script setup lang="ts">
import PendientesTab from "pages/Deudas/components/PendientesTab.vue";
import AdelantosTab from "pages/Deudas/components/AdelantosTab.vue";
import {useTab} from "pages/Deudas/composables/useTab";

const {tab} = useTab()
</script>

<style scoped>

</style>
