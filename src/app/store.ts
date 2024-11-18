import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { counterSlice } from "../features/counter/counterSlice"
import { quotesApiSlice } from "../features/quotes/quotesApiSlice"
import { todosSlice } from "../features/todos/todosSlice"

// Gabungkan reducers dari semua slice
const rootReducer = combineSlices(counterSlice, quotesApiSlice, todosSlice)

// Infer the `RootState` type dari root reducer
export type RootState = ReturnType<typeof rootReducer>

// Setup store
export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat(quotesApiSlice.middleware)
    },
    preloadedState,
  })
  setupListeners(store.dispatch) // Optional, untuk fitur tambahan RTK Query
  return store
}

export const store = makeStore()

// Tipe Store dan Dispatch
export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
