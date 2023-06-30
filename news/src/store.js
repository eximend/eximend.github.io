import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './newsReciever'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})