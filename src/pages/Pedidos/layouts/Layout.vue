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

        <q-btn round color="primary" unelevated :ripple="false" icon="mail" />

        <option-button></option-button>
      </q-toolbar>
    </q-header>

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

    <Drawer></Drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import {useDrawer} from "src/shared/composables/useDrawer";
import Drawer from "src/shared/components/Drawer.vue";
import OptionButton from "pages/Pedidos/components/OptionButton.vue";
import ProductSearch from "pages/Pedidos/components/ProductSearch.vue";
import {useOrder} from "src/shared/composables/useOrder";
import {computed} from "vue";


const {toggle} = useDrawer()
const {products} = useOrder();

const totalOrder = computed(() => {
  return products.value.reduce((previousValue, curr) => previousValue + parseFloat((curr.cant * curr.unitPrice).toFixed(2)),0)
})

function toggleLeftDrawer() {
  toggle();
}
</script>
