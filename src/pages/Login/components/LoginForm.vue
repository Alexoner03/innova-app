<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-md"
    style="width: 100%"
  >
    <q-input
      color="white"
      bg-color="white"
      outlined
      v-model="name"
      label="Usuario"
      hint="Escriba su usuario"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Porfavor escriba algo']"
    />

    <q-input
      filled
      color="white"
      bg-color="white"
      type="password"
      v-model="age"
      label="Contraseña"
      hint="Escriba su contraseña"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Porfavor escriba algo']"
    />

    <q-select bg-color="white" outlined v-model="model" :options="options" label="Ciudad" hint="Seleccione Ciudad"/>


    <div>
      <q-btn label="Submit" type="submit" color="orange-10"/>
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";

const $q = useQuasar()
const router = useRouter()

const name = ref(null)
const age = ref(null)
const model = ref("Lima")
const options = ref<string[]>(["Lima", "Huancayo"])


function onSubmit() {
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Submitted'
  })

  router.push({name: "pedidos"})
}

</script>
