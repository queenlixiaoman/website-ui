import { configureStore } from '@reduxjs/toolkit'
import deviceStore from './device'

export default configureStore({
  reducer: {
    deviceStore
  },
})