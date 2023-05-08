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

    <div class="flex justify-center">
      <q-btn label="Iniciar sesión" type="submit" color="orange-10"         :loading="submitting"
      >
        <template v-slot:loading>
          <q-spinner-facebook />
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
const isPwd = ref(true)
const submitting = ref(false)

async function onSubmit() {
  submitting.value = true;
  const result = await auth.login(user.value!, password.value!)

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
  submitting.value = false;
  router.push({name: "pedidos"})
}

</script>
