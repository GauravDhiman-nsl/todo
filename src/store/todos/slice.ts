import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Todo } from '@/lib/types'
import type { TodosState } from './type'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './thunks'


const initialState: TodosState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
}
function setAll(state: TodosState, items: Todo[]) {
  state.byId = {}
  state.allIds = []
  for (const t of items) {
    state.byId[t.id] = t
    state.allIds.push(t.id)
  }
}
function upsert(state: TodosState, t: Todo) {
  if (!state.byId[t.id]) state.allIds.unshift(t.id)
  state.byId[t.id] = t
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    toggleLocal(state, action: PayloadAction<{ id: string; completed: boolean }>) {
      const t = state.byId[action.payload.id]
      if (t) t.completed = action.payload.completed
    },
    updateLocal(state, action: PayloadAction<{ id: string; title?: string; priority?: 1|2|3 }>) {
      const t = state.byId[action.payload.id]
      if (t) {
        if (action.payload.title !== undefined) t.title = action.payload.title
        if (action.payload.priority !== undefined) t.priority = action.payload.priority
      }
    },
    removeLocal(state, action: PayloadAction<string>) {
      const id = action.payload
      if (state.byId[id]) {
        delete state.byId[id]
        state.allIds = state.allIds.filter(x => x !== id)
      }
    },

    setAll(state, action: PayloadAction<Todo[]>) {
      setAll(state, action.payload)
    },
  },
  extraReducers: (b) => {
    b.addCase(fetchTodos.pending, (s) => {
      s.loading = true
      s.error = null
    })
    b.addCase(fetchTodos.fulfilled, (s, a) => {
      s.loading = false
      setAll(s, a.payload)
    })
    b.addCase(fetchTodos.rejected, (s, a) => {
      s.loading = false
      s.error = a.error.message ?? 'Failed to load'
    })

    b.addCase(createTodo.fulfilled, (s, a) => {
      upsert(s, a.payload)
    })
    b.addCase(updateTodo.fulfilled, (s, a) => {
      upsert(s, a.payload)
    })
    b.addCase(deleteTodo.fulfilled, (s, a) => {
      const id = a.payload
      if (s.byId[id]) {
        delete s.byId[id]
        s.allIds = s.allIds.filter(x => x !== id)
      }
    })
  },
})

export const { toggleLocal, updateLocal, removeLocal, setAll: setAllTodos } = todosSlice.actions
export default todosSlice.reducer
