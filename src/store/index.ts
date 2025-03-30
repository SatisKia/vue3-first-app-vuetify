import { createStore } from 'vuex'
import { Todo } from '@/types/todo'

export default createStore({
  state: {
    todoList: [] as Todo[],
    dateType: 1,
    dispYear: true
  },
  getters: {
    todoList (state) {
      return state.todoList
    },
    dateType (state) {
      return state.dateType
    },
    dispYear (state) {
      return state.dispYear
    }
  },
  mutations: {
    initialize (state) {
      state.todoList = [] as Todo[]
    },
    push (state, payload: { todo: Todo }) {
      state.todoList.push(payload.todo)
    },
    add (state, payload: { todo: Todo }) {
      state.todoList = [...state.todoList, payload.todo]
    },
    remove (state, payload: { id: string }) {
      state.todoList = state.todoList.filter(todo => todo.id !== payload.id)
    },
    done (state, payload: { id: string }) {
      const todo = state.todoList.find(todo => todo.id === payload.id)
      if (todo) {
        todo.done = !todo.done
      }
    },
    setDateType (state, payload: { dateType: number }) {
      state.dateType = payload.dateType
    },
    setDispYear (state, payload: { dispYear: boolean }) {
      state.dispYear = payload.dispYear
    }
  },
  actions: {
    initialize (context) {
      context.commit('initialize')
    },
    push (context, payload: { todo: Todo }) {
      context.commit('push', payload)
    },
    add (context, payload: { todo: Todo }) {
      context.commit('add', payload)
    },
    remove (context, payload: { id: string }) {
      context.commit('remove', payload)
    },
    done (context, payload: { id: string }) {
      context.commit('done', payload)
    },
    setDateType (context, payload: { dateType: number }) {
      context.commit('setDateType', payload)
    },
    setDispYear (context, payload: { dispYear: boolean }) {
      context.commit('setDispYear', payload)
    }
  }
})
