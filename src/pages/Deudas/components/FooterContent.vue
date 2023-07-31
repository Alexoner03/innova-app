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

<script setup lang="ts">
import {useDebt} from "src/shared/composables/useDebt";
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";

const {tempAdvacementes, sendAdvacements} = useDebt()
const $q = useQuasar()
const router = useRouter()

async function send()
{

  const message = tempAdvacementes.value.map(item => {
    return `${item.cliente}  <span style="float: right">S/. ${item.acuenta.toFixed(2)}</span>`
  })

  $q.dialog({
    title: "Confirmar envio",
    message: message.join("<br>"),
    cancel: true,
    html: true
  }).onOk(async () => {
    $q.loading.show({message: "enviando adelantos"})
    const result = await sendAdvacements();
    $q.notify({message: result})
    $q.loading.hide();
    await router.push("/deudas")
  }).onCancel(() => {
    $q.notify({
      message: "Envio cancelado"
    })
  })
}

</script>

<style scoped>

</style>
