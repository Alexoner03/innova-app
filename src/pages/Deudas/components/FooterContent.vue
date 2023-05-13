<template>
  <div class="bg-yellow flex justify-between items-center q-px-md" style="height: 50px">
    <div class="text-red text-bold" style="font-size: 20px">
      Total: <span class="text-black text-weight-bold" style="font-size: 20px">S/. {{tempAdvacementes.reduce((prev, curr) => prev + curr.acuenta,0).toFixed(2)}}</span>
    </div>
    <div>
      <q-btn color="primary" @click="send">
        Enviar
      </q-btn>
    </div>
  </div>
</template>

<script setup>
import {useDebt} from "src/shared/composables/useDebt";
import {useQuasar} from "quasar";

const {tempAdvacementes, sendAdvacements} = useDebt()
const $q = useQuasar()

async function send()
{
  $q.loading.show({message: "enviando adelantos"})
  const result = await sendAdvacements();
  $q.notify({message: result})
  $q.loading.hide();
}

</script>

<style scoped>

</style>
