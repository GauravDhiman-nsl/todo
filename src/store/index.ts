import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './todos/slice'

export function makeStore(){
    return configureStore({
        reducer:{
            todos: todosReducer,
        },
        devTools: process.env.NODE_ENV !== 'production',
    })  
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<AppStore['getState']>
