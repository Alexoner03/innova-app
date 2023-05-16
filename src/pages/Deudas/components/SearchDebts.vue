<template>
  <q-toolbar-title>
    <q-input
      v-model="search"
      debounce="1000"
      filled
      bg-color="white"
      dense
      placeholder="Buscar Cliente"
      @focus="changeTab"
      @update:model-value="searchDebt"
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
    menu-anchor="bottom right" @click="loadDebts"
  />
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useTab} from "pages/Deudas/composables/useTab";
import {useQuasar} from "quasar";
import {useDebt} from "src/shared/composables/useDebt";

const search = ref("")
const {tab} = useTab()
const $q = useQuasar()
const {debts, listDebts} = useDebt()

function changeTab() {
  tab.value = 'Pendientes'
}

async function searchDebt(value: string) {
  if (value.length < 2) {
    return
  }

  $q.loading.show({message: "Buscando clientes"});

  const result = await listDebts(value)

  if (result) {
    $q.notify({message: debts.value.length === 0 ? "No se encontraron deudas" : "Deudas cargadas con exito"})
  } else {
    $q.notify({message: "Error cargando deudas", color: 'negative'})
  }

  search.value = ""
  $q.loading.hide()
}

async function loadDebts() {
  $q.loading.show({message: "Buscando clientes"});

  const result = await listDebts()

  if (result) {
    $q.notify({message: "Deudas cargadas con exito"})
  } else {
    $q.notify({message: "Error cargando deudas", color: 'negative'})
  }

  $q.loading.hide()
}

</script>

<style scoped>

</style>
