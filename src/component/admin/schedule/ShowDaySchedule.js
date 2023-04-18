/*用来展示日视图中的总览图*/
import { useSelector } from 'react-redux'
import moment from 'moment'
import styles from '../../../public/style/admin/schedule/ShowWeekSchedule.module.scss'
import WorkCard from './WorkCard'

function ShowDaySchedule(props) {
  let schedule = props.schedule
  let timeRange = props.timeRange
  let weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  let weekend = ['Saturday', 'Sunday']
  const adminStore = useSelector(state => state)
  const week = moment(adminStore.admin.dateTime).format('dddd')
  /*周末和平时不太一样*/
  let map = new Map()
  if (weekday.includes(week)) {
    map.set('prepare', '9')
    map.set('first', '11')
    map.set('second', '13')
    map.set('thirdly', '15')
    map.set('fourth', '17')
    map.set('fifth', '19')
    map.set('end', '21')
  } else if (weekend.includes(week)) {
    map.set('prepare', '10')
    map.set('first', '12')
    map.set('second', '14')
    map.set('thirdly', '16')
    map.set('fourth', '18')
    map.set('fifth', '20')
    map.set('end', '22')
  }
  /*由于是日视图，过滤出当天的*/
  const filteredArr = schedule.filter(item => item.week === week)
  /*截取工作时间的起始时间就可以判断是哪一段的*/
  function getHours(time) {
    /*找到第一个冒号的位置*/
    let index = time.indexOf(':')
    /*截取从开头到冒号位置之前的子串*/
    return time.substring(0, index)
  }
  return (
    <div className={styles.rootContainer}>
      {filteredArr.map((item, index) => (
        <div key={index} className={styles.firstBox}>
          {filteredArr.length > 0 &&
            getHours(item.time) === map.get(timeRange) && (
              <WorkCard
                fontSize={'14px'}
                rootWidth={'130px'}
                workNum={0}
                workTime={item.time}
                workType={item.type}
              />
            )}
        </div>
      ))}
    </div>
  )
}

export default ShowDaySchedule
