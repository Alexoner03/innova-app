<template>
  <q-list bordered separator class="q-pa-none">
    <q-item dense style="border-bottom: 2px solid black;" class="q-pa-none">
      <div class="flex justify-between items-center full-width">
        <div class="text-bold text-center" style="width: 33.3333%;">PENDIENTE</div>
        <div class="text-bold text-center" style="width: 33.3333%;">ACUENTA</div>
        <div class="text-bold text-center" style="width: 33.3333%;">RESTA</div>
      </div>
    </q-item>
    <q-item v-for="item in tempAdvacementes" class="q-px-none">
      <div class="flex column full-width">
        <p class="text-primary q-mb-none">{{item.cliente}}</p>
        <div class="flex justify-between items-center full-width">
          <div class="text-bold text-blue text-center" style="width: 33.3333%;">{{item.pendiente.toFixed(2)}}</div>
          <div class="text-bold text-red text-center" style="width: 33.3333%;">{{item.acuenta.toFixed(2)}}</div>
          <div class="text-bold text-blue text-center" style="width: 33.3333%;">{{(item.pendiente - item.acuenta).toFixed(2)}}</div>
        </div>
      </div>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import {useDebt} from "src/shared/composables/useDebt";

const {tempAdvacementes} = useDebt()
</script>

<style scoped>

</style>
