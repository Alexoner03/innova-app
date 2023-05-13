<template>
  <router-view />
</template>

<script setup lang="ts">
import {useAuth} from "src/shared/composables/useAuth";
import {useRouter} from "vue-router";

const { reload } = useAuth()
const router = useRouter()
const result = reload()

if(result) {
  router.replace({name: "pedidos"})
}else {
  router.replace({name: "login"})
}
</script>
