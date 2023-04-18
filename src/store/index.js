// store/index.js

import { configureStore } from '@reduxjs/toolkit'
import adminSlice from './modules/admin'
import commonSlice from './modules/common'

const store = configureStore({
  reducer: {
    admin: adminSlice,
    common: commonSlice
  }
})

export default store
