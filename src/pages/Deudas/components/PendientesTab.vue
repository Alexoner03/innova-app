<template>
  <q-list bordered separator v-if="!isLoading">
    <q-item v-for="item in debts" :class="[item.pendiente > 0 ? 'bg-red-1' : '']">
      <q-item-section>
        <q-item-label class="text-bold text-primary">{{ item.cliente }}</q-item-label>
        <div class="flex full-width justify-between items-center">
          <div style="width: 33.333%" class="flex column justify-center items-center">
            <div class="text-bold">{{item.fecha}}</div>
            <div class="text-blue" @click="showDetails(item)">{{item.total.toFixed(2)}}</div>
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
        <p class="q-mb-none text-bold" style="font-size: 11px">
          TIPO DE DOCUMENTO: {{item.documento}}
        </p>
      </q-item-section>
    </q-item>
  </q-list>

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 85vw">
      <q-card-section>
        <div style="font-size: 16px" class="text-bold">Agregar adelanto</div>
        <div style="font-size: 16px">Cliente: {{selectedItem.cliente}}</div>
        <div style="font-size: 14px">Tipo DOC.: {{selectedItem.documento}}</div>
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

      <q-card-section style="max-height: 50vh; width: 80vw; max-width: 80vw" class="scroll q-pa-none">
        <q-list separator bordered>
          <q-item v-for="item in listAdvacements" dense>
            <div class="flex column full-width">
              <p class="q-mb-none text-primary full-width">{{item.encargado}} <span style="float: right; text-align: right">{{item.fecha}}</span></p>
              <p class="q-mb-none">S/. {{item.adelanto.toFixed(2)}}</p>
            </div>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="cerrar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="detailModal">
    <q-card>
      <q-card-section>
        <div class="text-bold">Detalles del pedido: {{selectedDetail?.serieventas}}</div>
        <div class="text-bold">Cliente: {{selectedDetail?.cliente}}</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 70vh; width: 80vw; max-width: 80vw" class="scroll q-pa-none">
        <q-list separator bordered>
          <q-item v-for="item in detailsProds" dense>
            <div class="flex column full-width">
              <div :class="['text-center text-bold q-my-sm', item.estado === 'devolucion' ? 'text-negative' : 'text-primary']">
                {{ item.estado === 'devolucion' ? 'DEVOLUCIÓN' : '' }}
                <br v-if="item.estado === 'devolucion'">
                {{item.producto}}
              </div>
              <div class="flex justify-between q-mb-sm">
                <div style="width: 33.33%; height: 16px" class="text-center text-bold">
                  CANTIDAD
                </div>
                <div style="width: 33.33%; height: 16px" class="text-center text-bold">
                  P. UNIT
                </div>
                <div style="width: 33.33%; height: 16px" class="text-center text-bold">
                  TOTAL
                </div>
              </div>
              <div class="flex justify-between">
                <div style="width: 33.33%; height: 20px" class="text-center">
                    {{item.cantidad}}
                </div>
                <div style="width: 33.33%; height: 20px" class="text-center">
                    S/. {{item.unitario.toFixed(2)}}
                </div>
                <div style="width: 33.33%; height: 20px" class="text-center">
                    S/. {{item.importe.toFixed(2)}}
                </div>
              </div>
            </div>
          </q-item>
        </q-list>
      </q-card-section>

      <q-separator />

      <q-card-actions align="between">
        <q-btn dense label="descargar pdf" color="primary" @click="downloadPDF()" />
        <q-btn flat label="cerrar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup lang="ts">
import {IDetail, useDebt} from "src/shared/composables/useDebt";
import {ref} from "vue";
import {useQuasar} from "quasar";
import debtService, {IAdvacement, IDebt} from "src/shared/services/online/DebtService";
import DebtService from "src/shared/services/online/DebtService";

const {debts, addAdvacement, listDebts, listDetail} = useDebt()
const $q = useQuasar()
const isLoading = ref(false)
const prompt = ref(false)
const fixed = ref(false)
const detailModal = ref(false)
const advancement = ref("")
const selectedItem = ref<IDebt | null>(null);
const listAdvacements = ref<IAdvacement[]>([])
const detailsProds = ref<IDetail[]>([])
const selectedDetail = ref<IDebt | null>(null)

const load = async () => {

  if(debts.value.length > 0)
  {
    return
  }

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

const loadAdvancements = async (item: IDebt) => {
  $q.loading.show({message: "Cargando Adelantos"})
  listAdvacements.value = [];
  const result = await debtService.listAdvacements(item.serieventas)

  if (result === null) {
    $q.notify({message: "Error cargando adelantos", color: 'negative'})
    $q.loading.hide()
    return
  }

  if(result.length === 0) {
    $q.notify({message: "Esta venta no tiene adelantos", color: 'warning'})
    $q.loading.hide()
    return
  }

  listAdvacements.value = result;
  $q.loading.hide()
  fixed.value = true;
  return
}

const confirmAddAdvacement = () => {
  if(!(/^\d+(\.\d{1,2})?$/.test(advancement.value?.toString() ?? ""))){
    $q.notify({message: "Debe ingresar un numero valido"})
    return
  }

  const value = parseInt(advancement.value)

  if(value && value <= 0) {
    $q.notify({message: "El monto debe ser mayor a 0"})
    return
  }

  addAdvacement({
    serie: selectedItem.value!.serieventas,
    acuenta: value,
    cliente: selectedItem.value!.cliente,
    pendiente: selectedItem.value!.pendiente,
    documento: selectedItem.value!.documento
  })

  advancement.value = "";
  $q.notify({message: "Adelanto guardado"})
  prompt.value = false;
}

const showDetails = async (serie: IDebt) => {
  $q.loading.show({message: "Cargando detalles de la serie: " + serie.serieventas})
  detailsProds.value = await listDetail(serie.serieventas);
  detailModal.value = true;
  selectedDetail.value = serie
  $q.loading.hide()
}

const downloadPDF = () => {
  const a = document.createElement('a')
  a.href = DebtService.getDownloadPDFURL() + `&serieventas=${selectedDetail.value?.serieventas}`
  a.download = `reporte_${selectedDetail.value?.serieventas}.pdf`
  a.target = "_blank"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

load()

</script>

<style scoped>

</style>
