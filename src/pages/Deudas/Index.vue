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

    <q-tab-panel name="Adelantos">
      Adelantos
    </q-tab-panel>

  </q-tab-panels>

</template>

<script setup lang="ts">
import {ref} from "vue";
import PendientesTab from "pages/Deudas/components/PendientesTab.vue";

const tab = ref("Pendientes");
</script>

<style scoped>

</style>
