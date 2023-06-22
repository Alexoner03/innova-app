<template>
  <div class="q-pa-md">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="full-width"
      ref="formularioRef"
    >
      <q-input
        filled
        v-model="ruc"
        label="RUC*"
        hint="Escriba su ruc"
        class="q-mb-md upper"
        lazy-rules
        :rules="[ val => val && val.length > 7 && !isNaN(val) || 'Debe ingresar un documento válido']"
      />

      <q-input
        filled
        v-model="cliente"
        label="Cliente*"
        hint="Escriba su Razon social"
        class="q-mb-md upper"
        lazy-rules
        :rules="[ val => val && val.length > 5 || 'Debe ingresar su razón social, minimo 6 carácteres']"
      />

      <q-input
        filled
        v-model="direccion"
        label="Dirección*"
        hint="Escriba su dirección"
        class="q-mb-md upper"
        lazy-rules
        :rules="[ val => val && val.length > 5 || 'Debe ingresar su dirección, minimo 6 carácteres']"
      />

      <q-input
        filled
        v-model="nombre_comercial"
        label="Nombre Comercial*"
        hint="Escriba el nombre comercial"
        class="q-mb-md upper"
        lazy-rules
        :rules="[ val => val && val.length > 5 || 'Debe ingresar su nombre comercial, minimo 6 carácteres']"
      />

      <q-input
        filled
        v-model="zona"
        label="Zona*"
        hint="Indique la zona"
        class="q-mb-md upper"
        lazy-rules
        :rules="[ val => val && val.length > 2 || 'Debe ingresar la zona, mínimo 3 carácteres']"
      />

      <!-- TIPO (NECESITO VER OPCIONES TIENE ESE DESPLEGABLE) -->

      <q-input
        filled
        v-model="telefono"
        label="Celular*"
        hint="Escriba su telefono"
        class="q-mb-md upper"
        lazy-rules
        type="number"
        :rules="[ val => val && val.length === 9 && !isNaN(val) && val[0] === '9' || 'Debe ingresar un numero como 9XXXXXXXX']"
      />

      <q-input
        filled
        v-model="correo"
        label="Correo*"
        hint="Ingrese el correo de la empresa o cliente"
        class="q-mb-md upper"
        type="email"
        lazy-rules
      />

      <q-input
        filled
        v-model="fecha_nacimiento"
        label="Fecha de Nacimiento"
        hint="Seleccione la fecha"
        class="q-mb-md upper"
        type="date"
      />

      <q-input
        filled
        v-model="nombre_cliente"
        label="Nombre de cliente*"
        hint="Escriba el nombre del cliente"
        class="q-mb-md upper"
        lazy-rules
        :rules="[ val => val && val.length > 2 || 'Debe ingresar un nombre minimo 3 caracteres']"
      />

      <q-input
        filled
        v-model="vendedor"
        label="Nombre de vendedor*"
        hint="Escriba el nombre del vendedor"
        class="q-mb-xl upper"
        lazy-rules
        :rules="[ val => val && val.length > 2 || 'Debe ingresar un nombre minimo 3 caracteres']"
      />

      <div class="flex justify-end">
        <q-btn label="Limpiar" type="reset" color="primary" flat class="q-mr-md"/>
        <q-btn label="Enviar" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useQuasar} from "quasar";
import {useClient} from "src/shared/composables/useClient";

const $q = useQuasar()
const {saveClient} = useClient()

const ruc =             ref<string>("")
const cliente =         ref<string>("")
const direccion =       ref<string>("")
const telefono =        ref<string>("")
const vendedor =   ref<string>("")
const nombre_comercial = ref<string>("")
const nombre_cliente = ref<string>("")
const zona = ref<string>("")
const correo = ref<string>("")
const fecha_nacimiento = ref<string>("")
const formularioRef = ref<any>(null);

const onSubmit = async () => {
  $q.loading.show({message: "Guardando cliente..."})

  const response = await saveClient({
    ruc: ruc.value,
    cliente: cliente.value,
    direccion: direccion.value,
    telefono: telefono.value,
    vendedor: vendedor.value,
    nombre_comercial: nombre_comercial.value,
    zona: zona.value,
    correo: correo.value,
    nombre_cliente: nombre_cliente.value,
    fecha_nacimiento: fecha_nacimiento.value
  })

  if(!response.result) {
    $q.notify({message: response.message, color: "negative"})
    $q.loading.hide()
    return
  }

  $q.notify({message: response.message, color: "green"})
  $q.loading.hide()
  onReset()
}

const onReset = () => {
  ruc.value = "";
  cliente.value = "";
  direccion.value = "";
  telefono.value = "";
  vendedor.value = "";
  nombre_comercial.value="";
  zona.value="";
  correo.value="";
  nombre_cliente.value="";
  fecha_nacimiento.value="";

  formularioRef.value.resetValidation();
}

</script>
