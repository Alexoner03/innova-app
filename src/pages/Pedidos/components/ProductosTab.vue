<template>
  <div style="width: 100%; height:calc(100vh - 190px)" class="scroll">
    <div v-for="(product, index) in products" :key="index">
      <p class="text-bold text-center" style="font-size: 13px">{{ product.name }}</p>

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
          <q-btn class="q-mr-md" icon="close" color="negative" round dense @click="onDelete(product)"></q-btn>
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
            class="q-mr-sm p-cantidad"
          >
          </q-input>
          <q-input v-model="product.unitPrice" outlined class="q-mr-sm"
                   style="font-size: 20px; width: 33.33333%"
          >
          </q-input>
          <q-field outlined style="font-size: 20px; width: 33.33333%">
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
</template>

<script setup lang="ts">
import {useOrder} from "src/shared/composables/useOrder";
import {IProduct} from "src/shared/composables/useProduct";
import {useQuasar} from "quasar";

const {removeProduct, products} = useOrder()
const $q = useQuasar()

const onDelete = (product: IProduct) => {
  removeProduct(product)
  $q.notify({
    color: 'green',
    message: "Producto removido de la orden"
  })
}

const consolelog = () => {
  console.log("ok")
}
</script>

<style scoped>

</style>
