<template>
  <p class="text-bold" style="font-size: 20px">
    Agregar comentario
  </p>

  <q-input type="textarea" v-model="comment" outlined>

  </q-input>
</template>

<script setup lang="ts">
  import {useOrder} from "src/shared/composables/useOrder";

  const { comment } = useOrder()
</script>

<style scoped>

</style>
