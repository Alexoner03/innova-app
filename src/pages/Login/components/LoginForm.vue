<template>
  <q-form
    @submit="onSubmit"
    class="q-gutter-md"
    style="width: 100%"
  >
    <q-input
      bg-color="white"
      outlined
      v-model="user"
      label="Usuario"
      hint="Escriba su usuario"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Porfavor escriba algo']"
    />

    <q-input
      filled
      bg-color="white"
      :type="isPwd ? 'password' : 'text'"
      v-model="password"
      label="Contraseña"
      hint="Escriba su contraseña"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Porfavor escriba algo']"
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>

    <q-select
      filled
      bg-color="white"
      v-model="db"
      options-dense
      label="BASE"
      :options='[
        { value: "innovaprincipal", label : "Principal"},
        { value: "castilla", label : "Castilla"},
        { value: "castilla2", label : "Castilla Nuevo"},
        { value: "jauja", label : "Jauja"},
        { value: "almacenayacucho", label : "Ferreboom Ayacucho"},
        { value: "ferreboomlima", label : "Ferreboom Lima"},
        { value: "tingomaria", label : "Tingo Maria"},
        { value: "chupaca", label : "Chupaca"},
        { value: "pichari", label : "Pichari"},
        { value: "recuerdostingomaria", label : "Recuerdos"},
        { value: "vanidositos", label : "Vanidositos"},
        { value: "vanidositosbebom", label : "Vanidositos nuevo ruc"},
        { value: "aquady", label : "Aquady"},
        { value: "ferreboompichanaki", label : "Ferreboom Pichanaqui"},
        { value: "showroom", label : "Show Room"},
        { value: "pichanaki", label : "Full Tools"},
        { value: "jhonsullca", label : "Jhon Sullca"},
        { value: "clienteferreboom01", label : "Huamali Junin"},
        { value: "clientepichari01", label : "Elkin Quispe"},
        { value: "clientepichari02", label : "Huaman Bermudo"},
        { value: "clientepichari03", label : "Grupo Canayre"},
        { value: "clientepichari04", label : "Danielita"},
        { value: "clientepichari05", label : "Inversiones Sonpra"},
        { value: "innovaprincipal_bkp", label : "Prueba"}
      ]'
      :option-value="item => item.value"
      :option-label="item => item.label"
      emit-value
      map-options
    />

    <div class="flex justify-center">
      <q-btn label="Iniciar sesión" type="submit" color="orange-10" :loading="submitting"
      >
        <template v-slot:loading>
          <q-spinner-facebook/>
        </template>
      </q-btn>
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import {useQuasar} from "quasar";
import {useRouter} from "vue-router";
import {useAuth} from "src/shared/composables/useAuth";

const $q = useQuasar()
const router = useRouter()
const auth = useAuth()

const user = ref(null)
const password = ref(null)
const dbval = import.meta.env.MODE === "development" ? "innovaprincipal_bkp" : "innovaprincipal"
const db = ref(dbval)
const isPwd = ref(true)
const submitting = ref(false)

async function onSubmit() {
  submitting.value = true;
  const result = await auth.login(user.value!, password.value!, db.value)

  if (result === null) {
    $q.notify({
      color: 'negative', message: 'Credenciales incorrectas'
    })
    submitting.value = false;
    return
  }

  $q.notify({
    color: 'green', message: 'Sesión iniciada'
  })

  router.replace({name: "pedidos"}).then(() => submitting.value = false)
}

</script>
