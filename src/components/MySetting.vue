<template>
  <div>
    <button style="width:100%" v-on:click="onSet">設定</button>
    <div style="margin-top:10px">
      <span>年月日表記:</span>
      <div>
        <input type="radio" id="date1" name="date" value="1" v-on:change="selectDateType1" v-bind:checked="state.dateType == 1" />
        <label for="date1">{{ state.dateType1String }}</label>
        <input type="radio" id="date2" name="date" value="2" v-on:change="selectDateType2" v-bind:checked="state.dateType == 2" />
        <label for="date2">{{ state.dateType2String }}</label>
      </div>
    </div>
    <div style="margin-top:10px">
      <input type="checkbox" id="disp-year" v-on:change="changeCheckYear" v-bind:checked="state.dispYear" />
      <label for="disp-year">年を表示する</label>
    </div>
  </div>
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
      state.dateType = 1
    }
    const selectDateType2 = () => {
      state.dateType = 2
    }
    const changeCheckYear = () => {
      state.dispYear = !state.dispYear
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
