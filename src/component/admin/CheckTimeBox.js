/*选择偏好的工作时间范围*/
import styles from '../../public/style/admin/CheckTimeBox.module.scss'
import { TimePicker } from 'antd'
import dayjs from 'dayjs'
function CheckTimeBox() {
  /*选择的时间变化时的操作*/
  const onChange = (time, timeString) => {
    console.log(timeString)
  }
  let time = '8:00'
  const defaultValue = [dayjs(time, 'HH:mm'), dayjs('21:00', 'HH:mm')]
  return (
    <div className={styles.rootContainer}>
      <div className={styles.timeBox}>
        <p className={styles.boxTitle}>选择你偏好的工作时间</p>
      </div>
      <div className={styles.timePickerBox}>
        <TimePicker.RangePicker
          format={'HH:mm'}
          onChange={onChange}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  )
}

export default CheckTimeBox
