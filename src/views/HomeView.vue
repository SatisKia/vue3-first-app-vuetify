<template>
  <my-todo />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyTodo from '@/components/MyTodo.vue' // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    MyTodo
  }
})
</script>
