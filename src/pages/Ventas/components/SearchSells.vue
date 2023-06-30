<template>
  <q-toolbar-title>
    <q-input
      v-model="search"
      debounce="1000"
      filled
      bg-color="white"
      dense
      placeholder="Buscar Cliente"
      @update:model-value="searchSell"
    >
      <template v-slot:append>
        <q-icon name="search"/>
      </template>
    </q-input>
  </q-toolbar-title>

  <q-btn
    color="transparent"
    icon="autorenew"
    unelevated
    dense
    :ripple="false"
    menu-anchor="bottom right" @click="loadSells"
  />
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useQuasar} from "quasar";
import {useDebt} from "src/shared/composables/useDebt";

const search = ref("")
const $q = useQuasar()
const {sellsRaw, resetSells} = useDebt()
async function searchSell(value: string) {
  if (value.length < 3) {
    return
  }

  $q.loading.show({message: "Buscando clientes"});

  const result = await resetSells(value)

  if (result) {
    $q.notify({message: sellsRaw.value.length === 0 ? "No se encontraron ventas" : "Ventas cargadas con exito"})
  } else {
    $q.notify({message: "Error cargando ventas", color: 'negative'})
  }

  $q.loading.hide()
}

async function loadSells() {
  $q.loading.show({message: "Buscando clientes"});

  const result = await resetSells()

  if (result) {
    $q.notify({message: "Ventas cargadas con exito"})
  } else {
    $q.notify({message: "Error cargando ventas", color: 'negative'})
  }

  $q.loading.hide()
}

</script>

<style scoped>

</style>
