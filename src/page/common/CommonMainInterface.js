import TopHeader from '../../component/TopHeader'
import styles from '../../public/style/common/CommonMainInterface.module.scss'
import React, { useState } from 'react'
import { Content, Header } from 'antd/es/layout/layout'
import { DatePicker } from 'antd'
import moment from 'moment/moment'
import ComponentShowSchedule from '../../component/common/CommonShowSchedule'
function CommonMainInterface() {
  /*本周一*/
  let start = moment().weekday(1).format('YYYY/MM/DD (dddd)')
  /*本周日*/
  let end = moment().weekday(7).format('YYYY/MM/DD (dddd)')
  const [startTime, setStartTime] = useState(start)
  const [endTime, setEndTime] = useState(end)
  /*日期选择的回调函数，date是所选择日期等一些信息*/
  const onChange = date => {
    /*周一日期*/
    const startDate = moment(date.$d).day(1).format('YYYY/MM/DD (dddd)')
    /*周日日期*/
    const endDate = moment(date.$d).day(7).format('YYYY/MM/DD (dddd)')
    setStartTime(startDate)
    setEndTime(endDate)
  }
  const formatStart = moment(startTime).format('MMM D')
  const formatEnd = moment(endTime).format('MMM D')
  return (
    <div className={styles.componentContainer}>
      <Header>
        <TopHeader />
      </Header>
      <Content>
        <div className={styles.middleBox}>
          <div className={styles.middleContainer}>
            <div className={styles.pickerDateBox}>
              <DatePicker onChange={onChange} picker="week" />
            </div>
            <div className={styles.showTimeBox}>
              <span className={styles.timeNumber}>{formatStart} - </span>
              <span className={styles.timeNumber}>{formatEnd}</span>
            </div>
            <div className={styles.appNameBox}>
              <span className={styles.appName}>智能排班云</span>
            </div>
          </div>
        </div>
      </Content>
      <div className={styles.scheduleBox}>
        <ComponentShowSchedule />
      </div>
    </div>
  )
}

export default CommonMainInterface
