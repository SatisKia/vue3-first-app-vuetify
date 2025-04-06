<template>
  <v-card-text class="ma-0 pa-0 text-body-1">
    <v-card-actions class="ma-0 pa-0 text-body-1" style="min-height:0">
      <v-card-text class="ma-0 pa-0 text-body-1" style="width:50%">
        <span>TODO:</span>
      </v-card-text>
      <v-card-text class="ma-0 pa-0 text-body-1" style="width:50%; text-align:right">
        <router-link to="/setting">設定</router-link>
      </v-card-text>
    </v-card-actions>
    <v-text-field variant="underlined" style="width:100%" v-model="state.text" placeholder="100文字まで" hide-details />
    <v-radio-group inline v-model="state.colorType" hide-details>
      <v-radio label="シアン" id="color1" value="#80ffff" />
      <v-radio label="マゼンタ" id="color2" value="#ff80ff" />
      <v-radio label="イエロー" id="color3" value="#ffff80" />
    </v-radio-group>
    <v-card-text class="ma-0 pa-0 text-body-1" v-if="!state.isError">
      <v-btn style="width:100%" v-on:click="onAdd" v-bind:disabled="(state.text.length == 0) || state.isError">登録</v-btn>
    </v-card-text>
    <v-card-text class="ma-0 pa-0 text-body-1" v-if="state.isError">
      <span class="error">入力できる文字は100文字までです</span>
    </v-card-text>
  </v-card-text>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, reactive, watchEffect } from 'vue'

interface State {
  text: string
  isError: boolean,
  colorType: string
}

export default defineComponent({
  emits: ['add'],
  setup (_, context) {
    const state = reactive<State>({
      text: '',
      isError: false,
      colorType: '#80ffff'
    })

    const onAdd = () => {
      const input1 = document.getElementById('color1') as HTMLInputElement
      const input2 = document.getElementById('color2') as HTMLInputElement
      const input3 = document.getElementById('color3') as HTMLInputElement
      let color = input1.value
      if (input2.checked) {
        color = input2.value
      } else if (input3.checked) {
        color = input3.value
      }
      context.emit('add', state.text, color)
      state.text = ''
    }

    watchEffect(() => {
      if (state.text.length > 100) {
        state.isError = true
      } else {
        state.isError = false
      }
    })

    onBeforeMount(() => {
      console.log('TodoInput onBeforeMount')
    })
    onMounted(() => {
      console.log('TodoInput onMounted')
    })
    onBeforeUpdate(() => {
      console.log('TodoInput onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('TodoInput onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('TodoInput onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('TodoInput onUnmounted')
    })

    return {
      state,
      onAdd
    }
  }
})
</script>

<style scoped>
.error {
  color: #ff0000;
}
</style>
