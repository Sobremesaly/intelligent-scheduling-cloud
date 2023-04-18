/*自定义工作日偏好复选框*/
import styles from '../../public/style/admin/CheckDayBox.module.scss'
import { Checkbox } from 'antd'
function CheckDayBox() {
  const plainOptions = [
    { label: '周一', value: '1' },
    { label: '周二', value: '2' },
    { label: '周三', value: '3' },
    { label: '周四', value: '4' },
    { label: '周五', value: '5' },
    { label: '周六', value: '6' },
    { label: '周日', value: '7' }
  ]
  /*打印出选择的工作日*/
  const onChange = checkedValues => {
    console.log('checked = ', checkedValues)
  }
  return (
    <div className={styles.rootContainer}>
      <div className={styles.checkTitle}>选择你偏好的工作日</div>
      <div className={styles.checkBoxOne}>
        <Checkbox.Group options={plainOptions} onChange={onChange} />
      </div>
    </div>
  )
}

export default CheckDayBox
