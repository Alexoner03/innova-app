<template>
  <q-page>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
      style="height: 50px"
    >
      <q-tab name="Cliente" label="Cliente"/>
      <q-tab name="Productos" label="Productos"/>
      <q-tab name="Comentarios" label="Comentarios"/>
    </q-tabs>

    <q-separator/>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="Cliente">
        <cliente-tab/>
      </q-tab-panel>

      <q-tab-panel name="Productos" class="q-pa-sm">
        <productos-tab/>
      </q-tab-panel>

      <q-tab-panel name="Comentarios">
        <comentarios-tab/>
      </q-tab-panel>
    </q-tab-panels>

  </q-page>
</template>

<script setup>
import {ref, watch} from 'vue'
import ClienteTab from "pages/Pedidos/components/ClienteTab.vue";
import ProductosTab from "pages/Pedidos/components/ProductosTab.vue";
import ComentariosTab from "pages/Pedidos/components/ComentariosTab.vue";
import {useOrder} from "src/shared/composables/useOrder";

const tab = ref('Cliente')
const {addProductEvent, productTabError} = useOrder()

watch(addProductEvent, () => {
  if(tab.value !== "Productos") {
    tab.value = "Productos"
  }

  setTimeout(_=> {
      // Seleccionar todos los elementos de una clase específica
      var elementos = document.querySelectorAll('.p-cantidad');

      // Obtener el último elemento
      var ultimoElemento = elementos[elementos.length - 1];

      // Obtener el input dentro del último elemento
      var input = ultimoElemento.querySelector('input');

      // Enfocar el input
      input.focus();
  }, 100);
})

watch(productTabError, _=>
{
  tab.value = "Productos"
});

</script>

<style scoped>

</style>
