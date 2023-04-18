/*选择每周至多工作时间*/
import styles from '../../public/style/admin/CheckWeekTimeBox.module.scss'
import { InputNumber } from 'antd'

function CheckWeekTimeBox() {
  return (
    <div className={styles.rootContainer}>
      <div className={styles.timeBox}>
        <p className={styles.boxTitle}>选择每周至多工作时长</p>
      </div>
      <div className={styles.timePickerBox}>
        <InputNumber defaultValue={40} InputNumber min={1} max={40} />
      </div>
    </div>
  )
}

export default CheckWeekTimeBox
