<template>
  <v-card-text class="ma-0 pa-0 text-body-1">
    <todo-input
      v-on:add="addTodo"
    />
    <v-tabs align-tabs="center" v-model="tab">
      <v-tab width="50%" value="active">ACTIVE</v-tab>
      <v-tab width="50%" value="log">LOG</v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item class="pb-1" value="active">
        <todo-label
          v-for="todo in sortedTodo"
          v-bind:key="todo.id"
          v-bind:todo="todo"
          v-on:done="doneTodo"
          v-on:remove="removeTodo"
        />
      </v-tabs-window-item>
      <v-tabs-window-item class="pb-1" value="log">
        <todo-label
          v-for="todo in removedTodo"
          v-bind:key="todo.id"
          v-bind:todo="todo"
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card-text>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, ref, watch } from 'vue'
import { Todo } from '@/types/todo'
import TodoInput from '@/components/TodoInput.vue'
import TodoLabel from '@/components/TodoLabel.vue'
import store from '@/store'

export default defineComponent({
  components: {
    TodoInput,
    TodoLabel
  },
  setup () {
    const tab = ref('sctive')
    watch([tab], ([newVal]) => {
      console.log(newVal)
    })

    // methods
    const loadData = async () => {
      console.log('loadData')

      // データの読み込み
      store.dispatch('loadData')
    }
    const saveData = () => {
      console.log('saveData')

      // データの書き込み
      store.dispatch('saveData')
    }
    const addTodo = (text: string, color: string) => {
      store.dispatch('add', {
        todo: {
          id: (new Date()).getTime().toString(),
          done: false,
          removed: false,
          date: new Date(),
          text: text,
          color: color
        }
      })
      saveData()
    }
    const removeTodo = (id: string) => {
      store.dispatch('remove', { id: id })
      saveData()
    }
    const doneTodo = (id: string) => {
      store.dispatch('done', { id: id })
      saveData()
    }

    // computed
    const sortedTodo = computed(() => {
      // 算出プロパティではデータを直接変更することができないため、sliceで配列をコピー
      let todoList = store.getters.todoList.slice()
      todoList = todoList.filter((todo: { removed: boolean }) => todo.removed !== true)
      return todoList.sort((a: Todo, b: Todo) => {
        return b.date.getTime() - a.date.getTime()
      })
    })
    const removedTodo = computed(() => {
      // 算出プロパティではデータを直接変更することができないため、sliceで配列をコピー
      const todoList = store.getters.todoList.slice()
      return todoList.filter((todo: { removed: boolean }) => todo.removed === true)
    })

    onBeforeMount(() => {
      console.log('MyTodo onBeforeMount')
    })
    onMounted(async () => {
      console.log('MyTodo onMounted')

      // データの読み込み
      await loadData()
    })
    onBeforeUpdate(() => {
      console.log('MyTodo onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('MyTodo onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('MyTodo onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('MyTodo onUnmounted')
    })

    // template内で使用するプロパティ
    return {
      tab,
      addTodo,
      removeTodo,
      doneTodo,
      sortedTodo,
      removedTodo
    }
  }
})
</script>
