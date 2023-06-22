<template>
  <q-list separator class="q-pa-none">
    <q-item dense style="border-bottom: 2px solid black;" class="q-pa-none">
      <div class="flex justify-between items-center full-width">
        <div class="text-bold text-center" style="width: 33.3333%;">PENDIENTE</div>
        <div class="text-bold text-center" style="width: 33.3333%;">ACUENTA</div>
        <div class="text-bold text-center" style="width: 33.3333%;">RESTA</div>
      </div>
    </q-item>
    <q-item v-for="item in tempAdvacementes" class="q-px-none">
      <div class="flex column full-width" @click="confirmAction(item)">
        <p class="text-primary q-mb-none">{{item.cliente}}</p>
        <div class="flex justify-between items-center full-width">
          <div class="text-bold text-blue text-center" style="width: 33.3333%;">{{item.pendiente.toFixed(2)}}</div>
          <div class="text-bold text-red text-center" style="width: 33.3333%;">{{item.acuenta.toFixed(2)}}</div>
          <div class="text-bold text-blue text-center" style="width: 33.3333%;">{{(item.pendiente - item.acuenta).toFixed(2)}}</div>
        </div>
      </div>
    </q-item>
    <q-item class="q-px-none" style="border-top: 2px solid black;">
      <div class="flex column full-width">
        <div class="flex justify-between items-center full-width">
          <div class="text-bold text-blue text-center" style="width: 33.3333%;">{{sumaPendientes.toFixed(2)}}</div>
          <div class="text-bold text-red text-center" style="width: 33.3333%;">{{sumaAcuentas.toFixed(2)}}</div>
          <div class="text-bold text-blue text-center" style="width: 33.3333%;">{{sumaRestas.toFixed(2)}}</div>
        </div>
      </div>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {IAdvacementTemp, useDebt} from "src/shared/composables/useDebt"

const {tempAdvacementes, removeAdvacement} = useDebt()

const sumaPendientes = ref<number>(0.0);
const sumaAcuentas = ref<number>(0.0);
const sumaRestas = ref<number>(0.0);

sumaPendientes.value = tempAdvacementes.value.reduce((total, item) => total + parseFloat(item.pendiente.toFixed(2)), 0);
sumaAcuentas.value = tempAdvacementes.value.reduce((total, item) => total + parseFloat(item.acuenta.toFixed(2)), 0);
sumaRestas.value = tempAdvacementes.value.reduce((total, item) => total + parseFloat((item.pendiente - item.acuenta).toFixed(2)), 0);

const confirmAction = (item: IAdvacementTemp) => {
  if(window.confirm("¿Desea eliminar el adelanto?"))
  {
    removeAdvacement(item)
    sumaPendientes.value = tempAdvacementes.value.reduce((total, item) => total + parseFloat(item.pendiente.toFixed(2)), 0);
    sumaAcuentas.value = tempAdvacementes.value.reduce((total, item) => total + parseFloat(item.acuenta.toFixed(2)), 0);
    sumaRestas.value = tempAdvacementes.value.reduce((total, item) => total + parseFloat((item.pendiente - item.acuenta).toFixed(2)), 0);
  }
}
</script>

<style scoped>

</style>
