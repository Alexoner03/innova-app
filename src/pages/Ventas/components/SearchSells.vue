<template>
  <q-toolbar-title>
    Ventas
  </q-toolbar-title>

  <q-btn
    color="transparent"
    icon="search"
    unelevated
    dense
    :ripple="false"
    menu-anchor="bottom right" @click="alertModal = true"
  />


  <q-dialog v-model="alertModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Buscar cliente</div>
      </q-card-section>

      <q-card-section class="q-pt-none">


        <q-select
          clearable
          behavior="menu"
          outlined
          v-model="search"
          use-input
          hide-selected
          fill-input
          dense
          options-dense
          input-debounce="500"
          map-options
          option-label="name"
          label="Nombre"
          :options="options"
          @filter="filterName"
          hint="Escriba un nombre"
          class="q-mb-md"
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
          clearable
          behavior="menu"
          outlined
          v-model="search"
          use-input
          dense
          options-dense
          hide-selected
          fill-input
          input-debounce="500"
          map-options
          option-label="ruc"
          label="Ruc"
          :options="options"
          @filter="filterRuc"
          hint="Escriba un ruc"
          class="q-mb-md"
        >
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                No se encontró al cliente
              </q-item-section>
            </q-item>
          </template>

          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>

        </q-select>

        <q-input label="Desde" dense v-model="dateFrom" outlined mask="date" :rules="['date']"
                 hint="Seleccione fecha inicial"
                 class="q-mb-md"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="dateFrom" :options="(_date) => _date <= today"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input label="Hasta" dense v-model="dateTo" outlined mask="date" :rules="['date']"
                 hint="Seleccione fecha fin"
                 class="q-mb-md"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="dateTo" :options="(_date) => _date <= today"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat/>
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>


      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cerrar" color="gray" v-close-popup/>
        <q-btn flat label="Buscar" color="primary" @click="searchSell"/>
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup lang="ts">
import {ref} from "vue";
import {useQuasar} from "quasar";
import {useDebt} from "src/shared/composables/useDebt";
import {IClient, useClient} from "src/shared/composables/useClient";
import dayjs from "dayjs";
import customFormart from "dayjs/plugin/customParseFormat";
import isBeforOrSame from "dayjs/plugin/isSameOrBefore";

dayjs.extend(customFormart)
dayjs.extend(isBeforOrSame)


const search = ref<IClient>()
const dateFrom = ref<string>()
const dateTo = ref<string>()
const options = ref<IClient[]>([])
const alertModal = ref(false)
const $q = useQuasar()
const {sellsRaw, resetSells} = useDebt()
const {clients, filterClients} = useClient()
const today = dayjs().format("YYYY/MM/DD")


function filterName(val: any, update: any, abort: any) {

  if (val.length < 2) {
    abort()
    return
  }

  filterClients("name", val).then(() => {
    update(() => {
      options.value = clients.value;
    })
  });
}

function filterRuc(val: any, update: any, abort: any) {

  if (val.length < 2) {
    abort()
    return
  }

  filterClients("ruc", val).then(() => {
    update(() => {
      options.value = clients.value;
    })
  });
}

function validateRange(from: string, to: string) {
  const _from = dayjs(from, "YYYY/MM/DD")
  const _to = dayjs(from, "YYYY/MM/DD")

  return _from.isSameOrBefore(_to)
}

async function searchSell() {

  if (!search.value) {
    $q.notify({message: "el cliente debe ser un texto de 3 letras", color: 'negative'})
    return
  }

  if (!dateFrom.value || !dateTo.value) {
    $q.notify({message: "Seleccione un rango de fechas", color: 'negative'})
    return
  }

  if (!validateRange(dateFrom.value, dateTo.value)) {
    $q.notify({message: "La fecha inicial debe ser previa a la final", color: 'negative'})
    return
  }

  $q.loading.show({message: "Buscando ventas"});

  await resetSells(search.value?.name, dateFrom.value, dateTo.value)

  if (sellsRaw.value.length === 0) {
    $q.notify({message: "No se encontraron ventas", color: 'negative'})
  }

  alertModal.value = false;
  search.value = undefined;
  dateFrom.value = ""
  dateTo.value = ""

  $q.loading.hide()
}
</script>
