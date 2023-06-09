<template>
  <q-toolbar-title>
    <q-input
      v-model="search"
      debounce="1000"
      filled
      clearable
      bg-color="white"
      dense
      placeholder="Buscar Producto"
      @update:model-value="searchProduct"
    >
      <template v-slot:append>
        <q-icon name="search"/>
      </template>
    </q-input>
  </q-toolbar-title>

  <q-dialog v-model="fixed">
    <q-card style="position: relative; width: 100%">

      <q-card-section style="z-index: 50; width: 100%; height: 60px; background-color: white; border-bottom: 1px solid black" >
        <div class="flex justify-between">
          <div class="text-h6">Productos</div>
          <div>
            <q-btn icon="close" rounded unelevated @click="fixed = false"></q-btn>
          </div>
        </div>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section class="scroll q-pa-none" style="max-height: 60vh" >

        <div class="flex column" style="width: 100%; position: relative; font-size: 10.1px;" v-for="(product, index) in productsList" :key="index" v-ripple @click="addProductToOrder(product)">
          <div class="text-center text-bold">
            {{ product.name+' '+product.marca }}
          </div>
          <div class="flex justify-between" style="height: 30px;">
            <div class="thirdSpace flex column text-center">
              <div class="text-bold">P. Unitario</div>
              <div class="text-blue text-bold">{{ product.unitPrice.toFixed(2) }}</div>
            </div>
            <div class="thirdSpace flex column text-center">
              <div class="text-bold">P. Mayor</div>
              <div class="text-blue text-bold">{{ product.promotorPrice.toFixed(2) }}</div>
            </div>
            <div class="thirdSpace flex column text-center">
              <div class="text-bold">P. Especial</div>
              <div class="text-blue text-bold">{{ product.especialPrice.toFixed(2) }}</div>
            </div>
          </div>

          <div class="flex justify-between" style="height: 32px;">
            <div class="thirdSpace flex column text-center">
              <div class="text-bold">Stock</div>
              <div class="text-red text-bold">{{ product.stock }}</div>
            </div>
            <div class="thirdSpace flex column text-center">
              <div class="text-bold">Cant. Caja</div>
              <div>{{ product.cantByBox }}</div>
            </div>
            <div class="thirdSpace flex column text-center">
              <div class="text-bold">Código</div>
              <div>{{ product.codigo }}</div>
            </div>
          </div>

          <q-separator></q-separator>
        </div>
      </q-card-section>

    </q-card>
  </q-dialog>

</template>

<script setup lang="ts">
import {ref} from "vue";
import {IProduct, useProduct} from "src/shared/composables/useProduct";
import {useQuasar} from "quasar";
import {useOrder} from "src/shared/composables/useOrder";

const $q = useQuasar()
const {filterProducts, products} = useProduct()
const {addProduct} = useOrder()

const search = ref("")
const fixed = ref(false)
const productsList = ref<IProduct[]>([])

function searchProduct(value: string) {

  if(value.length < 2) {
    return
  }

  $q.loading.show({message: "Buscando productos"});

  filterProducts(value).then(() => {

    if(products.value.length === 0) {
      $q.notify({
        message: "No se encontraron resultados",
        color: "negative"
      })
      $q.loading.hide();
      search.value = ""
      return
    }

    productsList.value = products.value;
    fixed.value = true
    $q.loading.hide();
  })
}

function addProductToOrder(product: IProduct) {
  fixed.value = false;
  const result = addProduct(product)

  if(result) {
    $q.notify({
      message: "Producto agregado",
      color: "green"
    })
    return
  }

  $q.notify({
    message: "El producto ya estaba agregado",
    color: "negative"
  })

}
</script>

<style scoped>
  .thirdSpace {
    width: 33.333333%;
  }
</style>
