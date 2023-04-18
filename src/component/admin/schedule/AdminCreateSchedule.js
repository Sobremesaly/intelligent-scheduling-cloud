/*创建排班表的主组件*/
import { FileProtectOutlined } from '@ant-design/icons'
import styles from '../../../public/style/admin/schedule/AdminCreateSchedule.module.scss'
import React from 'react'
import AdminScheduleControl from './AdminScheduleControl'
import OverviewWeekSchedule from './OverviewWeekSchedule'
import OverviewDaySchedule from './OverviewDaySchedule'
import DetailWeekSchedule from './DetailWeekSchedule'
import { Tag } from 'antd'
import { useSelector } from 'react-redux'
function AdminCreateSchedule() {
  const adminStore = useSelector(state => state)
  return (
    <div className={styles.rootContainer}>
      <div className={styles.imgBox}>
        <div className={styles.imgBackground}>
          <FileProtectOutlined />
        </div>
        <div className={styles.workText}>
          <span className={styles.workContent}>排班</span>
        </div>
      </div>
      <div className={styles.storeName}>
        <Tag>西湖店</Tag>
      </div>
      <div className={styles.middleComponent}>
        <AdminScheduleControl />
      </div>
      <div style={styles.bottomComponent}>
        {adminStore.admin.viewFormat === 'week' &&
          adminStore.admin.showType === 'overview' && <OverviewWeekSchedule />}
        {adminStore.admin.viewFormat === 'day' &&
          adminStore.admin.showType === 'overview' && <OverviewDaySchedule />}
        {adminStore.admin.showType === 'detail' && <DetailWeekSchedule />}
      </div>
    </div>
  )
}

export default AdminCreateSchedule
