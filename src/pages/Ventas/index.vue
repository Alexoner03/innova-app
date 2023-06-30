<template>
  <div class="q-pa-md">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <div v-for="(item, index) in sellsRaw" :key="index" class="caption">
        <p>{{item}}</p>
      </div>
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script>
import {useDebt} from 'src/shared/composables/useDebt'


export default {
  setup () {
    const {listSells, sellClient, sellsRaw} = useDebt()

    return {
      sellsRaw,
      onLoad (index, done) {
        listSells(sellClient.value,index).then(() => done())
      }
    }
  }
}
</script>
