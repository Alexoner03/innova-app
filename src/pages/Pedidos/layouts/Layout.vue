<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <product-search></product-search>

        <q-btn round color="primary" unelevated :ripple="false" icon="mail" @click="sendOrder" />

        <option-button></option-button>
      </q-toolbar>
    </q-header>

    <Drawer></Drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

    <q-footer>
      <div class="bg-yellow flex justify-between items-center q-px-md" style="height: 50px">
        <div class="text-red text-bold" style="font-size: 20px">
          Total:
        </div>
        <div class="text-black text-weight-bold" style="font-size: 20px">
          S/. {{totalOrder.toFixed(2)}}
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import {useDrawer} from "src/shared/composables/useDrawer";
import Drawer from "src/shared/components/Drawer.vue";
import OptionButton from "pages/Pedidos/components/OptionButton.vue";
import ProductSearch from "pages/Pedidos/components/ProductSearch.vue";
import {STATES, useOrder} from "src/shared/composables/useOrder";
import {computed, ref} from "vue";
import {useQuasar} from "quasar";
import {useConfig} from "src/shared/composables/useConfig";


const {toggle} = useDrawer()
const {offline} = useConfig()
const {products, uploadOrder} = useOrder()
const $q = useQuasar();

const totalOrder = computed(() => {
  return products.value.reduce((previousValue, curr) => previousValue + parseFloat((curr.cant * curr.unitPrice).toFixed(2)),0)
})

function toggleLeftDrawer() {
  toggle();
}

async function sendOrder() {

  if (!window.navigator.onLine || offline.value) {
    $q.notify({message: "Está trabajando sin conexion o no tiene datos, por favor guarde el pedido", color: 'negative'});
    return
  }

  $q.loading.show({
    message: "Enviando Pedido"
  })

  const result = await uploadOrder();

  switch (result) {
    case STATES.OK:
      $q.notify({message: "Pedido enviado", color: 'green'});
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
    case STATES.NAME_NOT_VALID:
      $q.notify({message: "El nombre debe tener minimo 8 caracteres", color: 'red'});
      break;
    case STATES.RUC_NOT_VALID:
      $q.notify({message: "El ruc debe ser de 11 digitos", color: 'red'});
      break;
  }

  $q.loading.hide();
}

</script>
