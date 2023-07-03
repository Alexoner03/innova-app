<template>
  <q-toolbar-title>
    Ventas
  </q-toolbar-title>

  <q-btn
    color="transparent"
    icon="search"
    unelevated
    dense
    :ripple="false"
    menu-anchor="bottom right" @click="alertModal = true"
  />


  <q-dialog v-model="alertModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Buscar cliente</div>
      </q-card-section>

      <q-card-section class="q-pt-none">


        <q-select
          clearable
          behavior="menu"
          outlined
          v-model="search"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          map-options
          option-label="name"
          label="Nombre"
          :options="options"
          @filter="filterName"
          hint="Escriba un nombre"
          class="q-mb-lg"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No se encontró al cliente
              </q-item-section>
            </q-item>
          </template>
        </q-select>


        <q-date v-model="dateRange" range mask="YYYY-MM-DD"  minimal/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="gray" v-close-popup />
        <q-btn flat label="Buscar" color="primary" @click="searchSell" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup lang="ts">
import {ref} from "vue";
import {useQuasar} from "quasar";
import {useDebt} from "src/shared/composables/useDebt";
import {IClient, useClient} from "src/shared/composables/useClient";

const search = ref<IClient>()
const dateRange = ref<{from: string, to: string}>()
const options = ref<IClient[]>([])
const alertModal = ref(false)
const $q = useQuasar()
const {sellsRaw, resetSells} = useDebt()
const {clients, filterClients} = useClient()


function filterName(val: any, update: any, abort: any) {

  if (val.length < 2) {
    abort()
    return
  }

  filterClients("name", val).then(() => {
    update(() => {
      options.value = clients.value;
    })
  });
}

async function searchSell() {

  if (!search.value) {
    $q.notify({message: "el cliente debe ser un texto de 3 letras", color: 'negative'})
    return
  }

  if (!dateRange.value) {
    $q.notify({message: "Seleccione un rango de fechas", color: 'negative'})
    return
  }

  $q.loading.show({message: "Buscando ventas"});

  await resetSells(search.value?.name, dateRange.value.from , dateRange.value.to)

  if(sellsRaw.value.length === 0) {
    $q.notify({message: "No se encontraron ventas", color: 'negative'})
  }

  $q.loading.hide()
}
</script>
