<template>

  <q-toggle
    v-model="isNewClient"
    label="¿Cliente nuevo?"
    class="q-mb-lg"
  />

  <q-input
    v-if="model && isNewClient"
    outlined
    type="text"
    v-model="model.name"
    class="q-mb-lg"
    label="Nombre"
    hint="Escriba un nombre"
  >
  </q-input>

  <q-select
    v-else
    clearable
    behavior="menu"
    outlined
    v-model="model"
    use-input
    hide-selected
    fill-input
    input-debounce="500"
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



  <q-input
    v-if="model && isNewClient"
    outlined
    type="number"
    v-model="model.ruc"
    class="q-mb-lg"
    label="Ruc"
    mask="###########"
    unmasked-value
    hint="Escriba un ruc"
  >
  </q-input>
  <q-select
    v-else
    clearable
    behavior="menu"
    outlined
    v-model="model"
    use-input
    hide-selected
    fill-input
    input-debounce="500"
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
    :disable="isNewClient"
    outlined
    type="text"
    label="Dirección"
    :hint="isNewClient ? 'Escriba una Dirección' : ''"
  >
  </q-input>


</template>

<script setup lang="ts">
import {ref, watch} from 'vue'
import {IClient, useClient} from "src/shared/composables/useClient";
import {useOrder} from "src/shared/composables/useOrder";

const {clients, filterClients} = useClient()
const {setClient, reloadOrderEvent, client, clearEvent} = useOrder()
const isNewClient = ref(false)


const model = ref<IClient>({
  client_id: client.value ? client.value.client_id : -1,
  name: client.value ? client.value.name : "",
  ruc: client.value ? client.value.ruc : "",
  address: client.value ? client.value.address : "",
})

watch(model, (value) => setClient(value))

watch(reloadOrderEvent, () => {
  options.value = [client.value!]
  model.value = options.value[0];
})

watch(clearEvent, () => {
  model.value = {
    client_id: -1,
    name: "",
    ruc: "",
    address: ""
  }
})

watch(isNewClient, () => {
  model.value = {
    client_id: -1,
    name: "",
    ruc: "",
    address: ""
  }
})

const options = ref<IClient[]>([])

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
