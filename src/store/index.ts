import { createStore } from 'vuex'
import { Todo } from '@/types/todo'
import MyCookie from '@/plugins/Cookie'
import store from '@/store'

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
      for (const todo of state.todoList) {
        if (todo.id === payload.id) {
          todo.removed = true
        }
      }
    },
    done (state, payload: { id: string }) {
      const todo = state.todoList.find(todo => todo.id === payload.id)
      if (todo) {
        todo.done = !todo.done
      }
    },
    clear (state) {
      state.todoList = state.todoList.filter(todo => todo.removed !== true)
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
    clear (context) {
      context.commit('clear')
    },
    setDateType (context, payload: { dateType: number }) {
      context.commit('setDateType', payload)
    },
    setDispYear (context, payload: { dispYear: boolean }) {
      context.commit('setDispYear', payload)
    },
    loadData () {
      // データの読み込み処理
      store.dispatch('initialize')
      const cookie: MyCookie = new MyCookie()
      for (let i = 0; ; i++) {
        const id = cookie.getValue('id' + i, '')
        if (id.length === 0) {
          break
        }
        const done = cookie.getBool('done' + i, false)
        const removed = cookie.getBool('removed' + i, false)
        const date = new Date(cookie.getNumber('date' + i, 0))
        const text = cookie.getValue('text' + i, '')
        const color = cookie.getValue('color' + i, '')
        store.dispatch('push', {
          todo: {
            id: id,
            done: done,
            removed: removed,
            date: date,
            text: text,
            color: color
          }
        })
      }
      store.dispatch('setDateType', { dateType: cookie.getNumber('dateType', 1) })
      store.dispatch('setDispYear', { dispYear: cookie.getBool('dispYear', true) })
    },
    saveData () {
      // データの書き込み処理
      const todoList = store.getters.todoList
      const cookie: MyCookie = new MyCookie()
      let i = 0
      for (; i < todoList.length; i++) {
        const todo = todoList[i]
        cookie.setValue('id' + i, todo.id)
        cookie.setBool('done' + i, todo.done)
        cookie.setBool('removed' + i, todo.removed)
        cookie.setNumber('date' + i, todo.date.getTime())
        cookie.setValue('text' + i, todo.text)
        cookie.setValue('color' + i, todo.color)
      }
      cookie.setValue('id' + i, '')
    }
  }
})
