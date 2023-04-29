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
      <q-item clickable v-close-popup>
        <q-item-section>
          <q-item-label>Guardar Pedido</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup>
        <q-item-section>
          <q-item-label>Editar Pedido</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup>
        <q-item-section>
          <q-item-label>Cancelar Pedido</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable v-close-popup>
        <q-item-section>
          <q-item-label>Trabajar Sin Conexion</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
export default {
  name: "OptionButton"
}
</script>

<style scoped>

</style>
