// store/modules/admin.js

import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    /*所查看业务的日期*/
    dateTime: moment().weekday(1).format('YYYY/MM/DD (dddd)'),
    /*选定查看范围的最后一天*/
    endTime: '',
    /*选定查看范围的第一天，避免越界*/
    startDate: '',
    /*决定排班表是周视图还是日视图，默认是周视图*/
    viewFormat: 'week',
    /*决定是总览图还是细节图*/
    showType: 'overview'
  },
  reducers: {
    /*日期数加一*/
    addDateTimeAction(state) {
      /*调用函数让日期直接加一，如果越界再回滚*/
      state.dateTime = moment(state.dateTime)
        .add(1, 'days')
        .format('YYYY/MM/DD (dddd)')
      let judge = moment(state.endTime).isBefore(state.dateTime)
      if (judge === true) {
        state.dateTime = moment(state.dateTime)
          .subtract(1, 'days')
          .format('YYYY/MM/DD (dddd)')
      }
    },
    /*日期数减一*/
    deDateTimeAction(state) {
      /*调用函数让日期直接减一，如果越界再回滚*/
      state.dateTime = moment(state.dateTime)
        .subtract(1, 'days')
        .format('YYYY/MM/DD (dddd)')
      /*判断哪个日期更大*/
      let judge = moment(state.dateTime).isBefore(state.startTime)
      if (judge === true) {
        state.dateTime = moment(state.dateTime)
          .add(1, 'days')
          .format('YYYY/MM/DD (dddd)')
      }
    },
    initDateTimeAction(state, { payload }) {
      state.dateTime = moment(payload).format('YYYY/MM/DD (dddd)')
      state.endTime = moment(state.dateTime).day(7).format('YYYY/MM/DD (dddd)')
      state.startTime = moment(state.startTime)
        .day(1)
        .format('YYYY/MM/DD (dddd)')
    },
    setViewFormat(state, { payload }) {
      state.viewFormat = payload
    },
    setShowType(state, { payload }) {
      state.showType = payload
    }
  }
})

export const {
  addDateTimeAction,
  deDateTimeAction,
  initDateTimeAction,
  setViewFormat,
  setShowType
} = adminSlice.actions

export default adminSlice.reducer
