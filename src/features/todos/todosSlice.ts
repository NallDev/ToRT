import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"

export interface Todo {
  id: string
  title: string
  description: string
}

export interface TodosState {
  todos: Todo[]
}

const initialState: TodosState = {
  todos: JSON.parse(localStorage.getItem("todos") || "[]"),
}

export const todosSlice = createAppSlice({
  name: "todos",
  initialState,
  reducers: create => ({
    addTodo: create.reducer((state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)
      localStorage.setItem("todos", JSON.stringify(state.todos))
    }),
    updateTodo: create.reducer((state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) {
        state.todos[index] = action.payload
        localStorage.setItem("todos", JSON.stringify(state.todos))
      }
    }),
    deleteTodo: create.reducer((state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
      localStorage.setItem("todos", JSON.stringify(state.todos))
    }),
  }),
  selectors: {
    selectTodos: todosState => todosState.todos,
  },
})

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions
export const { selectTodos } = todosSlice.selectors
