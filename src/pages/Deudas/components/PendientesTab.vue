<template>
  <q-list bordered separator v-if="!isLoading">
    <q-item v-for="item in debts" :class="[item.pendiente > 0 ? 'bg-red-1' : '']">
      <q-item-section>
        <q-item-label class="text-bold text-primary">{{ item.cliente }}</q-item-label>
        <div class="flex full-width justify-between items-center">
          <div style="width: 33.333%" class="flex column justify-center items-center">
            <div class="text-bold">{{item.fecha}}</div>
            <div class="text-blue">{{item.total.toFixed(2)}}</div>
          </div>
          <div style="width: 33.333%" class="flex column justify-center items-center">
            <div class="text-bold">{{item.serieventas}}</div>
            <div class="text-red" @click="showAdvancementModal(item)">{{item.pendiente.toFixed(2)}}</div>
          </div>
          <div style="width: 33.333%" class="flex column justify-center items-center">
            <div class="text-bold" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%">{{item.vendedor}}</div>
            <div class="text-blue full-width text-center" @click="loadAdvancements(item)">{{item.acuenta?.toFixed(2) ?? "00.00"}}</div>
          </div>
        </div>
      </q-item-section>
    </q-item>
  </q-list>
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Agregar adelanto</div>
        <div class="text-h6">Cliente: {{selectedItem.cliente}}</div>
        <div>Total: {{selectedItem.total}}</div>
        <div>Pendiente: {{selectedItem.pendiente}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined label="Monto" type="number" dense v-model="advancement" autofocus @keyup.enter="confirmAddAdvacement" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn flat label="Guardar" @click="confirmAddAdvacement" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="fixed">
    <q-card>
      <q-card-section>
        <div class="text-h6">Adelantos</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh; width: 80vw; max-width: 80vw" class="scroll">
        <div v-for="n in 15" :key="n">
          <p>Nombre</p>
          <p>fecha</p>
          <p>monto</p>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="cerrar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup lang="ts">
import {useDebt} from "src/shared/composables/useDebt";
import {ref} from "vue";
import {useQuasar} from "quasar";
import {IDebt} from "src/shared/services/online/DebtService";

const {debts, listDebts} = useDebt()
const $q = useQuasar()
const isLoading = ref(false)
const prompt = ref(false)
const fixed = ref(false)
const advancement = ref(0)
const selectedItem = ref<IDebt | null>(null)

const load = async () => {
  $q.loading.show({message: "Cargando deudas"})
  isLoading.value = true

  const result = await listDebts()

  if(result) {
    $q.notify({message: "Deudas cargadas con exito"})
  } else{
    $q.notify({message: "Error cargando deudas", color: 'negative'})
  }

  isLoading.value = false
  $q.loading.hide()
}

const showAdvancementModal = (item: IDebt) => {

  if(item.pendiente <= 0)
  {
    $q.notify({message: "Esta venta ya está pagada"})
    return
  }

  selectedItem.value = item;
  prompt.value = true;
}

const loadAdvancements = (item: IDebt) => {
  $q.loading.show({message: "Cargando Adelantos"})
  setTimeout(() => {
    fixed.value = true
    $q.loading.hide()
  }, 1000)
}

const confirmAddAdvacement = () => {
  if(!(/^\d+(\.\d{1,2})?$/.test(advancement.value.toString()))){
    $q.notify({message: "Debe ingresar un numero valido"})
    return
  }

  if(advancement.value <= 0) {
    $q.notify({message: "El monto debe ser mayor a 0"})
    return
  }
}

load()

</script>

<style scoped>

</style>
