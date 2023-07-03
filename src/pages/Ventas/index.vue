<template>
  <div class="q-pa-none" v-if="sellsRaw.length > 0">
    <div class="flex justify-between q-pa-sm" style="border: 1px solid black" v-for="(item, index) in sellsRaw" :key="index">
      <p class="q-mb-none text-bold text-primary ti-underline" style="font-size: 14px">
        NOMBRE: {{item.cliente}}
      </p>
      <div class="flex full-width justify-between items-center">
        <div style="width: 33.333%" class="flex column justify-center items-center">
          <div class="text-bold text-accent" >Fecha</div>
          <div class="text-bold">{{item.fecha}}</div>
        </div>
        <div style="width: 33.333%" class="flex column justify-center items-center">
          <div class="text-bold text-accent" >Serie</div>
          <div class="text-bold">{{item.serieventas}}</div>
        </div>
        <div style="width: 33.333%" class="flex column justify-center items-center">
          <div class="text-bold text-accent" >Total</div>
          <div class="text-bold">S/. {{item.total.toFixed(2)}}</div>
        </div>
      </div>
      <div class="q-mb-none q-mt-sm flex justify-between full-width items-center">
          <span class="text-bold text-primary" style="font-size: 11px">
            TIPO DE DOCUMENTO: {{item.documento}}
          </span>
        <q-btn size="sm" color="primary">
          Descargar PDF
        </q-btn>
      </div>
    </div>
  </div>
  <div class="text-center" v-else>
    No se encontraron comprobantes
  </div>
</template>

<script setup lang="ts">
import {useDebt} from 'src/shared/composables/useDebt'
const {sellsRaw} = useDebt()
</script>
