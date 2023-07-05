<template>
  <div style="width: 100%; height:calc(100vh - 190px)" class="scroll">
    <div v-for="(product, index) in products" :key="index">
      <p class="text-bold text-center q-mb-md" style="font-size: 13px; vertical-align: center">
        {{ product.name }} {{ product.marca}}

        <q-btn @click="historyProduct(product)" icon="info" class="float-right" color="primary" flat dense size="sm"/>
      </p>

      <div class="flex justify-between no-wrap q-ma-xs">
        <q-btn
          color="primary"
          size="xs"
          :label="`Unitario: ${product.unitarioPrice.toFixed(2)}`"
          @click="product.unitPrice = product.unitarioPrice"
        />
        <q-btn
          color="primary"
          size="xs"
          :label="`Mayor: ${product.promotorPrice.toFixed(2)}`"
          @click="product.unitPrice = product.promotorPrice"
        />
        <q-btn
          color="primary"
          size="xs"
          :label="`Especial: ${product.especialPrice.toFixed(2)}`"
          @click="product.unitPrice = product.especialPrice"
        />
      </div>

      <div class="flex justify-between items-center no-wrap q-my-md">
        <div class="flex justify-between items-center no-wrap q-mr-lg">
          <q-btn class="q-mr-md" icon="close" color="negative" round size="xs" @click="onDelete(product)"></q-btn>
          <div class="text-bold" style="font-size: 20px">
            {{ product.stock }}
          </div>
        </div>
        <div class="flex justify-between items-center no-wrap">
          <q-input
            :color="product.cant > product.stock ? 'negative': 'primary'"
            :style="{fontSize: '20px', width: '33.3333%', backgroundColor: product.cant > product.stock ? 'rgba(255,0,0,0.41)': 'inherit'}"
            v-model="product.cant"
            type="number"
            outlined
            dense
            class="q-mr-sm p-cantidad"
          >
          </q-input>
          <q-input
            v-model="product.unitPrice" outlined class="q-mr-sm"
            dense
            style="font-size: 20px; width: 33.33333%"
            :color="product.unitPrice > product.cost ? 'primary': product.unitPrice == product.cost ? 'positive' : 'negative'"
            :style="{backgroundColor: product.unitPrice > product.cost ? 'inherit': product.unitPrice == product.cost ? 'rgb(33,186,69)' : 'rgba(255,0,0,0.41)'}"
            @blur="() => product.unitPrice < product.cost ? product.unitPrice = product.cost : null"
          >
          </q-input>
          <q-field dense outlined style="font-size: 20px; width: 33.33333%">
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">
                {{ (product.cant * product.unitPrice).toFixed(2) }}
              </div>
            </template>
          </q-field>
        </div>
      </div>
      <q-separator></q-separator>
    </div>
  </div>

  <q-dialog v-model="historyModal">
    <q-card style="width: 90vw">
      <q-card-section>
        <div class="text-h6">Historial</div>
        <small>{{selectedProduct?.name}} {{selectedProduct?.marca}}</small>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p class="q-mx-none q-mb-sm text-center"><strong>Compras</strong></p>
        <table style="width: 100%">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cant</th>
              <th>Prov.</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="compra in historyLoaded?.compras">
              <tr style="text-align: center; font-size: 12px">
                <td>{{compra.fecha}}</td>
                <td>{{compra.cantidad}}</td>
                <td>{{compra.proveedor.slice(0,15)}}</td>
                <td>{{ compra.billete === "SOLES" ? "S/." : "$" }} {{compra.unitario}}</td>
              </tr>
            </template>
          </tbody>
        </table>

        <template v-if="historyLoaded?.ventas.length > 0">
          <hr>
          <p class="q-mx-none q-mb-sm text-center"><strong>Ventas</strong></p>
          <table style="width: 100%">
            <thead>
            <tr>
              <th>Fecha</th>
              <th>Cant</th>
              <th>Precio</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="compra in historyLoaded?.ventas">
              <tr style="text-align: center">
                <td>{{compra.fecha}}</td>
                <td>{{compra.cantidad}}</td>
                <td>S/. {{compra.unitario}}</td>
              </tr>
            </template>
            </tbody>
          </table>
        </template>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {useOrder} from "src/shared/composables/useOrder";
import {IProduct, useProduct} from "src/shared/composables/useProduct";
import {useQuasar} from "quasar";
import {ref} from "vue";
import {History} from "src/shared/services/online/ProductService";

const {removeProduct, products, client} = useOrder()
const {getHistory} = useProduct()
const $q = useQuasar()
const historyModal = ref<boolean>(false)
const historyLoaded = ref<History>()
const selectedProduct = ref<IProduct>()

const onDelete = (product: IProduct) => {
  removeProduct(product)
  $q.notify({
    color: 'green',
    message: "Producto removido de la orden"
  })
}

const historyProduct = async (product: IProduct) => {

  $q.loading.show({message: "Cargando Historia del producto..."})

  const result = await getHistory(product.product_id, client.value?.name ?? "")

  if(!result) {
    $q.loading.hide();
    $q.notify({message: "Error cargando la historia", color: "negative"})
    return
  }

  historyLoaded.value = result
  selectedProduct.value = product
  historyModal.value = true
  $q.loading.hide();
}
</script>
