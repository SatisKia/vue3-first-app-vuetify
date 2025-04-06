<template>
  <v-card-text class="ma-0 pa-0 text-body-1">
    <v-btn style="width:100%" v-on:click="onSet">設定</v-btn>
    <v-card-text class="mt-3 pa-0 text-body-1">
      <span>年月日表記:</span>
    </v-card-text>
    <v-radio-group inline v-model="state.dateType" hide-details>
      <v-radio v-bind:label="state.dateType1String" v-bind:value="1" v-on:change="selectDateType1" />
      <v-radio v-bind:label="state.dateType2String" v-bind:value="2" v-on:change="selectDateType2" />
    </v-radio-group>
    <v-checkbox label="年を表示する" v-model="state.dispYear" v-on:change="changeCheckYear" hide-details />
  </v-card-text>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, reactive } from 'vue'
import MyCookie from '@/plugins/Cookie'
import store from '@/store'
import router from '@/router'

interface State {
  dateType: number
  dispYear: boolean
  dateType1String: string
  dateType2String: string
}

export default defineComponent({
  setup () {
    const state = reactive<State>({
      dateType: store.getters.dateType,
      dispYear: store.getters.dispYear,
      dateType1String: store.getters.dispYear ? 'YYYY年MM月DD日' : 'MM月DD日',
      dateType2String: store.getters.dispYear ? 'YY/MM/DD' : 'MM/DD'
    })

    // methods
    const onSet = () => {
      store.dispatch('setDateType', { dateType: state.dateType })
      store.dispatch('setDispYear', { dispYear: state.dispYear })

      const cookie: MyCookie = new MyCookie()
      cookie.setNumber('dateType', state.dateType)
      cookie.setBool('dispYear', state.dispYear)

      router.back()
    }
    const selectDateType1 = () => {
      console.log('selectDateType1')
    }
    const selectDateType2 = () => {
      console.log('selectDateType2')
    }
    const changeCheckYear = () => {
      console.log('changeCheckYear')
      state.dateType1String = state.dispYear ? 'YYYY年MM月DD日' : 'MM月DD日'
      state.dateType2String = state.dispYear ? 'YY/MM/DD' : 'MM/DD'
    }

    onBeforeMount(() => {
      console.log('MySetting onBeforeMount')
    })
    onMounted(async () => {
      console.log('MySetting onMounted')
    })
    onBeforeUpdate(() => {
      console.log('MySetting onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('MySetting onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('MySetting onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('MySetting onUnmounted')
    })

    // template内で使用するプロパティ
    return {
      state,
      onSet,
      selectDateType1,
      selectDateType2,
      changeCheckYear
    }
  }
})
</script>
