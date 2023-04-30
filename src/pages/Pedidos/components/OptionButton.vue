<template>
  <q-btn-dropdown
    color="transparent"
    dropdown-icon="more_vert"
    unelevated
    no-icon-animation
    dense
    :ripple="false"
    menu-anchor="bottom right"
  >
    <q-list style="width: 170px">
      <q-item clickable v-close-popup @click="_saveOrder">
        <q-item-section>
          <q-item-label>Guardar Pedido</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup @click="confirmDelete = true">
        <q-item-section>
          <q-item-label>Cancelar Pedido</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup  @click="_showSaveOrders">
        <q-item-section>
          <q-item-label>Pedidos Pendientes</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup>
        <q-item-section>
          <q-item-label>Trabajar Sin Conexion</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>

  <q-dialog v-model="confirmDelete" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <span class="q-ml-sm">¿Estás seguro de que deseas cancelar la orden?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="No" color="gray" v-close-popup class="q-mr-lg" />
        <q-btn flat label="Si" color="negative" @click="_cancelOrder" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showSaveOrders">
    <q-card>

      <q-card-section>
        <div class="flex justify-between">
          <div class="text-h6">Pedidos Guardados:</div>
          <div>
            <q-btn icon="close" rounded unelevated @click="showSaveOrders = false"></q-btn>
          </div>
        </div>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section class="scroll" style="max-height: 80vh; width: 80vw">
        <div @click="_reloadOrder(order)" class="flex column q-mb-md rounded-borders" v-for="(order, index) in saveOrders" :key="index" style="width: 100%; position: relative; border: 1px solid black;" v-ripple>
          <div class="text-center text-bold">
            {{order.client.name}}
          </div>
          <div class="text-center">
            Cantidad de productos:  {{ order.products.length }} <br>
            Fecha: {{order.createdAt}}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>

<script setup lang="ts">

import {STATES, useOrder} from "src/shared/composables/useOrder";
import {useQuasar} from "quasar";
import {ref} from "vue";
import {Order} from "src/shared/db";

const {saveOrder, reset, listAll} = useOrder()
const $q = useQuasar();
const confirmDelete = ref(false)
const showSaveOrders = ref(false)
const saveOrders = ref<Order[]>([])

const _saveOrder = async () => {
  const result = await saveOrder();

  switch (result) {
    case STATES.OK:
      $q.notify({message: "Pedido guardado", color: 'green'});
      break;
    case STATES.EXCEED_ERROR:
      $q.notify({message: "Productos exceden el stock", color: 'red'});
      break;
    case STATES.CLIENT_ERROR:
      $q.notify({message: "Seleccione un cliente", color: 'red'});
      break;
    case STATES.UNKNOWN:
      $q.notify({message: "Error desconocido", color: 'red'});
      break;
    case STATES.TOTAL_MIN_ERROR:
      $q.notify({message: "El total debe ser mayor a 0", color: 'red'});
      break;
    case STATES.PRODUCT_LENGTH_ERROR:
      $q.notify({message: "Seleccione un producto", color: 'red'});
      break;
  }

}

const _cancelOrder = () => {
  reset()
  confirmDelete.value = false;
  $q.notify({
    message: "Formularios limpios",
    color: "green"
  })
}

const _showSaveOrders = async () => {
  $q.loading.show();
  saveOrders.value = await listAll();

  if(saveOrders.value.length === 0) {
    $q.notify({
      message: "No tiene perdidos guardados",
      color: 'primary'
    })
    $q.loading.hide();
    return
  }

  showSaveOrders.value = true;
  $q.loading.hide();
}

const _reloadOrder = (order: Order) => {

}

</script>

<style scoped>

</style>
