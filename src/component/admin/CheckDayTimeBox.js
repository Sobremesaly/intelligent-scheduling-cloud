/*选择每日至多工作时间*/
import styles from '../../public/style/admin/CheckDayTimeBox.module.scss'
import { InputNumber } from 'antd'

function CheckDayTimeBox() {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.timeBox}>
        <p className={styles.boxTitle}>选择每日至多工作时长</p>
      </div>
      <div className={styles.timePickerBox}>
        <InputNumber defaultValue={4} InputNumber min={1} max={24} />
      </div>
    </div>
  )
}

export default CheckDayTimeBox
