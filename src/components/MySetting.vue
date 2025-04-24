<template>
  <v-card-text class="ma-0 pa-0 text-body-1">
    <v-btn style="width:100%" v-on:click="onSet">設定</v-btn>
    <v-card-text class="mt-3 pa-0 text-body-1">
      <span>年月日表記:</span>
    </v-card-text>
    <v-radio-group inline v-model="state.dateType" hide-details>
      <v-radio v-bind:label="state.dateType1String" v-bind:value="1" v-on:change="selectDateType1" />
      <v-radio v-bind:label="state.dateType2String" v-bind:value="2" v-on:change="selectDateType2" />
      <v-radio label="非表示" v-bind:value="3" v-on:change="selectDateType3" />
    </v-radio-group>
    <v-checkbox label="年を表示する" v-model="state.dispYear" v-on:change="changeCheckYear" hide-details />
    <v-card-text class="mt-3 pa-0 text-body-1">
      <v-btn v-on:click="onClear">ログの消去</v-btn>
    </v-card-text>
    <v-dialog v-model="state.dialog">
      <v-sheet>
        <v-card-text class="text-center">ログを消去してもよろしいですか？</v-card-text>
        <v-card-text class="text-center">
          <v-btn class="mr-5" v-on:click="onDialogOK()">はい</v-btn>
          <v-btn v-on:click="onDialogCancel()">キャンセル</v-btn>
        </v-card-text>
      </v-sheet>
    </v-dialog>
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
  dialog: boolean
}

export default defineComponent({
  setup () {
    const state = reactive<State>({
      dateType: store.getters.dateType,
      dispYear: store.getters.dispYear,
      dateType1String: store.getters.dispYear ? 'YYYY年MM月DD日' : 'MM月DD日',
      dateType2String: store.getters.dispYear ? 'YY/MM/DD' : 'MM/DD',
      dialog: false
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
    const onClear = () => {
      // ダイアログを開く
      state.dialog = true
    }
    const onDialogOK = () => {
      console.log('onDialogOK')

      store.dispatch('clear')

      // データの書き込み
      store.dispatch('saveData')

      // ダイアログを閉じる
      state.dialog = false
    }
    const onDialogCancel = () => {
      // ダイアログを閉じる
      state.dialog = false
    }
    const selectDateType1 = () => {
      console.log('selectDateType1')
    }
    const selectDateType2 = () => {
      console.log('selectDateType2')
    }
    const selectDateType3 = () => {
      console.log('selectDateType3')
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
      onClear,
      onDialogOK,
      onDialogCancel,
      selectDateType1,
      selectDateType2,
      selectDateType3,
      changeCheckYear
    }
  }
})
</script>

<style>
.v-overlay__scrim {
  width: 320px;
}
.v-overlay__content {
  margin: 12px !important;
  left: 0 !important;
  width: 296px !important; /* margin分を引いた後の値 */
}
</style>
