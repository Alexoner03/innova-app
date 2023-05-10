<template>
  <q-list v-if="isLoading">
    Cargando...
  </q-list>
  <q-list bordered separator v-else>
    <q-item v-for="item in debts" :class="[item.pendiente > 0 ? 'bg-red-1' : '']">
      <q-item-section>
        <q-item-label class="text-bold text-primary">{{ item.cliente }}</q-item-label>
        <div class="flex full-width justify-between items-center">
          <div style="width: 33.333%" class="flex column justify-center items-center">
            <div class="text-bold">{{item.fecha}}</div>
            <div class="text-blue">{{item.total}}</div>
          </div>
          <div style="width: 33.333%" class="flex column justify-center items-center">
            <div class="text-bold">{{item.serieventas}}</div>
            <div class="text-red">{{item.pendiente}}</div>
          </div>
          <div style="width: 33.333%" class="flex column justify-center items-center">
            <div class="text-bold">{{item.vendedor}}</div>
            <div class="text-blue">{{item.acuenta ?? "--"}}</div>
          </div>
        </div>
      </q-item-section>
    </q-item>

  </q-list>
</template>

<script setup lang="ts">
import {useDebt} from "src/shared/composables/useDebt";
import {ref} from "vue";
import {useQuasar} from "quasar";

const {debts, listDebts} = useDebt()
const $q = useQuasar()
const isLoading = ref(false)

const load = async () => {
  isLoading.value = true
  const result = await listDebts()

  if(!result) {
    $q.notify({message: "Deudas cargadas con exito"})
  }

  isLoading.value = false
}

load()

</script>

<style scoped>

</style>
