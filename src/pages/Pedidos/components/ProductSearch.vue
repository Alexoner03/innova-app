<template>
  <q-toolbar-title>
    <q-input
      v-model="search"
      debounce="1000"
      filled
      bg-color="white"
      dense
      placeholder="Search"
      @update:model-value="searchProduct"
    >
      <template v-slot:append>
        <q-icon name="search"/>
      </template>
    </q-input>
  </q-toolbar-title>

  <q-dialog v-model="fixed">
    <q-card style="position: relative">

      <q-card-section style="position: fixed; z-index: 50; width: 84%; height: 60px; background-color: white; border-bottom: 1px solid black" >
        <div class="flex justify-between">
          <div class="text-h6">Productos:</div>
          <div>
            <q-btn icon="close" rounded unelevated @click="fixed = false"></q-btn>
          </div>
        </div>
      </q-card-section>

      <q-separator></q-separator>

      <q-card-section class="scroll" style="max-height: 80vh; padding-top: 60px">

        <div class="flex column" style="width: 100%; position: relative" v-for="(product, index) in productsList" :key="index" v-ripple @click="addProductToOrder(product)">
          <div class="text-center text-bold" style="font-size: 20px">
            {{ product.name }}
          </div>
          <template v-if="product.url && product.url !== ''">
            <q-img :src="product.url" height="100px" fit="contain">
              <template v-slot:error>
                <div class="absolute-full flex flex-center items-center bg-gray text-white">
                  Sin imagen
                </div>
              </template>
            </q-img>
          </template>
          <div class="flex justify-between q-mb-md q-px-md">
            <div class="flex column text-center">
              <div class="text-bold">Stock</div>
              <div class="text-red text-bold">{{ product.stock }}</div>
            </div>
            <div class="flex column text-center">
              <div class="text-bold">Precio Unit.</div>
              <div class="text-blue text-bold">{{ product.unitPrice }}</div>
            </div>
            <div class="flex column text-center">
              <div class="text-bold">Cant. Caja</div>
              <div>{{ product.cantByBox }}</div>
            </div>
            <div class="flex column text-center">
              <div class="text-bold">Codigo</div>
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
  $q.loading.show();

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
    search.value = ""
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

</style>
