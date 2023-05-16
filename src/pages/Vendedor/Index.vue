<template>
  <div class="q-pa-md">
    <p style="font-size: 20px">Record Mensual Cliente</p>
    <hr>
    <div class="flex justify-between">

      <q-select
        clearable
        behavior="menu"
        filled
        dense
        v-model="client"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        map-options
        option-label="name"
        label="Cliente"
        :options="options"
        @filter="filterName"
        @update:model-value="loadClienteReport"
        style="width: 60%"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No se encontró al cliente
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-select
        :options="years"
        v-model="selectedYear"
        @update:model-value="loadClienteReport"
        label="Año"
        behavior="menu"
        filled
        dense
        style="width: 38%"
      >
      </q-select>
    </div>

    <div class="q-mb-xl">
      <div style="font-size: 16px" class="q-pa-md text-center full-width" v-if="reporteCliente === null">
        Seleccione un cliente
      </div>
      <div style="font-size: 16px" class="q-pa-md text-center full-width" v-else-if="reporteCliente && reporteCliente.length === 0">
        No se encontraron datos
      </div>
      <chart v-else :data="reporteCliente" :source="reload" :key="reload" />
    </div>

    <p style="font-size: 20px">Record Mensual Vendedor</p>
    <hr>
    <div class="flex justify-end">
      <q-select
        :options="years"
        v-model="selectedSellerYear"
        label="Año"
        behavior="menu"
        filled
        dense
        style="width: 38%;"
        @update:model-value="loadVendedorReport"
      >
      </q-select>
    </div>

    <div>
      <div style="font-size: 16px" class="q-pa-md text-center full-width" v-if="reporteVendedor === null || reporteVendedor.length === 0">
        No se encontraron datos
      </div>
      <chart v-else :source="reload_2" :data="reporteVendedor" :key="reload_2" />
    </div>

  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {IClient, useClient} from "src/shared/composables/useClient";
import {useQuasar} from "quasar";
import ReportService from "src/shared/services/online/ReportService";
import Chart from "pages/Vendedor/components/Chart.vue";
import {useAuth} from "src/shared/composables/useAuth";

const $q = useQuasar()
const {clients, filterClients} = useClient()
const {user} = useAuth()
const selectedYear = ref<number>(new Date().getFullYear())
const selectedSellerYear = ref<number>(new Date().getFullYear())
const years = ref<number[]>(getYears())
const client = ref<IClient | null>(null);
const options = ref<IClient[]>([])
const reporteCliente = ref<{total: number, month: string}[] | null>(null);
const reporteVendedor = ref<{total: number, month: string}[] | null>(null);
const reload = ref(1);
const reload_2 = ref(9000);

function filterName(val: any, update: any, abort: any) {

  if (val.length < 3) {
    abort()
    return
  }

  filterClients("name", val).then(() => {
    update(() => {
      options.value = clients.value;
    })
  });
}

function getYears() {
  let yearMin = 2015;
  const yearMax = new Date().getFullYear()

  const years = [];

  while (yearMin <= yearMax) {
    years.push(yearMin)
    yearMin++;
  }

  return years
}

async function loadClienteReport() {

  if(client.value === null || client.value.ruc === "") {
    $q.notify({message: "Seleccione un cliente"})
    reload.value++
    reporteCliente.value = null
    return
  }

  $q.loading.show({message: "Cargando reporte de usuario"})

  const result = await ReportService.reportCliente(client.value.ruc, selectedYear.value)

  if(result === null || result.length === 0) {
    reporteCliente.value = [];
    $q.loading.hide();
    reload.value++
    return
  }

  reporteCliente.value = result;
  $q.loading.hide();
  $q.notify({message: "Reporte cliente cargado"})

  reload.value++
}
async function loadVendedorReport() {

  $q.loading.show({message: "Cargando reporte de Vendedor"})

  const result = await ReportService.reportVendedor(user.value!.nombre, selectedSellerYear.value)

  if(result === null || result.length === 0) {
    reporteVendedor.value = [];
    $q.loading.hide();
    reload_2.value++
    return
  }

  reporteVendedor.value = result;
  $q.loading.hide();
  $q.notify({message: "Reporte vendedor cargado"})

  reload_2.value++
}

onMounted(() => {
  loadVendedorReport()
})

</script>
