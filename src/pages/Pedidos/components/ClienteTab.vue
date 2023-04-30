<template>
  <q-select
    behavior="menu"
    outlined
    v-model="model"
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

  <q-select
    behavior="menu"
    outlined
    v-model="model"
    use-input
    hide-selected
    fill-input
    input-debounce="0"
    map-options
    option-label="ruc"
    label="Ruc"
    :options="options"
    @filter="filterRuc"
    hint="Escriba un ruc"
    class="q-mb-lg"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">
          No se encontró al cliente
        </q-item-section>
      </q-item>
    </template>

    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>{{ scope.opt.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>

  </q-select>

  <q-input
    disable
    outlined
    type="text"
    v-model="model.address"
    label="Dirección"
  >
  </q-input>

</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {IClient, useClient} from "src/shared/composables/useClient";
import {useOrder} from "src/shared/composables/useOrder";

const {clients, filterClients} = useClient()
const {setClient} = useOrder()

const model = ref<IClient>({
  name: "",
  ruc: "",
  address: ""
})

watch(model, (value) => setClient(value))

const options = ref<IClient[]>([])

function filterName(val: any, update: any, abort: any) {

  if (val.length < 3) {
    abort()
    return
  }

  filterClients("name", val).then(() => {
    update(() => {
      options.value = clients.value;
    })
  });
}

function filterRuc(val: any, update: any, abort: any) {

  if (val.length < 3) {
    abort()
    return
  }

  filterClients("ruc", val).then(() => {
    update(() => {
      options.value = clients.value;
    })
  });
}

</script>
