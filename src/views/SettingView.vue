<template>
  <my-setting />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MySetting from '@/components/MySetting.vue' // @ is an alias to /src

export default defineComponent({
  name: 'SettingView',
  components: {
    MySetting
  }
})
</script>
