/*创建排班表的控制组件*/
import styles from '../../../public/style/admin/schedule/AdminScheduleControl.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip, Button, Select } from 'antd'
import moment from 'moment'
import { useState } from 'react'
import {
  LeftOutlined,
  CalendarOutlined,
  RightOutlined
} from '@ant-design/icons'
import { setViewFormat, setShowType } from '../../../store/modules/admin'
function AdminScheduleControl() {
  // 通过useSelector获取到store中的数据
  const adminStore = useSelector(state => state)
  /*startTime是所选择周的第一天*/
  const startTime = moment(adminStore.admin.dateTime)
  const endTime = startTime.clone().add(6, 'days')
  /*特定格式化*/
  const formatStart = startTime.format('MMM D')
  const formatEnd = endTime.format('MMM D')
  /*切换视图的提示文字*/
  const [tipText, setTipText] = useState('切换到细节图')
  /*总览图或者细节图*/
  const [viewType, setViewType] = useState('overview')
  const dispatch = useDispatch()
  function changeViewType() {
    if (viewType === 'overview') {
      setViewType('detail')
      setTipText('切换到总览图')
      dispatch(setShowType('detail'))
    } else {
      setViewType('overview')
      setTipText('切换到细节图')
      dispatch(setShowType('overview'))
    }
  }
  /*查看周视图或者日视图*/

  const [showView, setShowView] = useState('week')
  function changeShowView(value) {
    setShowView(value)
    dispatch(setViewFormat(value))
    if (value === 'week') {
      setNextText('查看下一周')
      setPreText('查看上一周')
    } else {
      setNextText('查看下一天')
      setPreText('查看上一天')
    }
  }
  /*查看下一周或者下一天*/
  const [nextText, setNextText] = useState('查看下一周')
  const [preText, setPreText] = useState('查看上一周')
  return (
    <div className={styles.rootContainer}>
      <div className={styles.controlBox}>
        <div className={styles.showTimeBox}>
          {adminStore.admin.viewFormat === 'week' && (
            <div>
              <div className={styles.startTimeBox}>
                <span className={styles.startTime}>{formatStart} </span>
              </div>
              <div className={styles.endTimeBox}>
                <span className={styles.endTime}> - {formatEnd}</span>
              </div>
            </div>
          )}
          {adminStore.admin.viewFormat === 'day' && (
            <div className={styles.dayShowBox}>{adminStore.admin.dateTime}</div>
          )}
        </div>
        <div className={styles.controlContainer}>
          <div className={styles.changeVieBox}>
            <Tooltip title={tipText}>
              <Button className={styles.changeVieBut} onClick={changeViewType}>
                CHANGE VIEW
              </Button>
            </Tooltip>
          </div>
          <div className={styles.changeTimeBox}>
            <Tooltip title={preText}>
              <div className={styles.preBox}>
                <Button
                  className={styles.preButton}
                  icon={<LeftOutlined />}
                ></Button>
              </div>
            </Tooltip>
            <div className={styles.middleBox}>
              <div className={styles.middleContainer}>
                <CalendarOutlined />
              </div>
            </div>
            <Tooltip title={nextText}>
              <div className={styles.preBox}>
                <Button
                  className={styles.preButton}
                  icon={<RightOutlined />}
                ></Button>
              </div>
            </Tooltip>
          </div>
          <div className={styles.chooseViewBox}>
            <Select
              className={styles.selectBox}
              options={[
                { value: 'day', label: 'DAY' },
                { value: 'week', label: 'WEEK' }
              ]}
              defaultValue={showView}
              onChange={changeShowView}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdminScheduleControl
