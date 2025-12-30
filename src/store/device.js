import { createSlice } from '@reduxjs/toolkit'

export const deviceStore = createSlice({
  name: 'device',
  // 默认是PC端-isDesktop: true
  initialState: {
    isDesktop: true,
  },
  reducers: {
    changeDevice: (state, action) => {
      state.isDesktop = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeDevice } = deviceStore.actions

export default deviceStore.reducer