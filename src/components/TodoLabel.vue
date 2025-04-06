<template>
  <v-card class="mt-1 pa-0 text-body-1" v-bind:style="{ 'background-color': (todo.done ? '#808080' : todo.color) }">
    <v-card-text class="ma-0 pa-0 text-body-1" style="width:100%">
      <table class="table">
        <tbody>
          <tr>
            <td class="td" style="width:5%">
              <v-checkbox class="d-flex" v-model="state.todoDone" v-on:change="done" hide-details />
            </td>
            <td class="td" style="width:20%">
              <span>{{ date }}</span>
            </td>
            <td class="td" style="width:65%">
              <span>{{ todo.text }}</span>
            </td>
            <td class="td" style="width:10%">
              <v-btn v-if="todo.done" variant="plain" style="width:100%" v-bind:style="{ 'background-color': (todo.done ? '#808080' : todo.color) }" v-on:click="remove">消</v-btn>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, PropType, reactive } from 'vue'
import { Todo } from '@/types/todo'
import store from '@/store'

function keta (value: number): string {
  if (value >= 100) {
    return '' + (value % 100)
  }
  return ((value < 10) ? '0' : '') + value
}

interface State {
  todoDone: boolean
}

export default defineComponent({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },
  emits: ['done', 'remove'],
  setup (props, context) {
    const state = reactive<State>({
      todoDone: props.todo.done
    })

    const done = () => {
      if (props.todo) {
        context.emit('done', props.todo.id)
      }
    }

    const remove = () => {
      if (props.todo) {
        context.emit('remove', props.todo.id)
      }
    }

    const date = computed(() => {
      if (!props.todo) return ''
      const { date } = props.todo
      if (store.getters.dispYear) {
        if (store.getters.dateType === 1) {
          return '' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
        } else {
          return '' + keta(date.getFullYear()) + '/' + keta(date.getMonth() + 1) + '/' + keta(date.getDate())
        }
      } else {
        if (store.getters.dateType === 1) {
          return '' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
        } else {
          return '' + keta(date.getMonth() + 1) + '/' + keta(date.getDate())
        }
      }
    })

    onBeforeMount(() => {
      console.log('TodoLabel onBeforeMount')
    })
    onMounted(() => {
      console.log('TodoLabel onMounted')
    })
    onBeforeUpdate(() => {
      console.log('TodoLabel onBeforeUpdate')
    })
    onUpdated(() => {
      console.log('TodoLabel onUpdated')
    })
    onBeforeUnmount(() => {
      console.log('TodoLabel onBeforeUnmount')
    })
    onUnmounted(() => {
      console.log('TodoLabel onUnmounted')
    })

    return {
      state,
      done,
      remove,
      date
    }
  }
})
</script>

<style scoped>
.table {
  border: 0;
}
.td {
  text-align: left;
  vertical-align: middle;
  word-break: break-all;
}
</style>
