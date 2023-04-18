/*用来展示周视图中的总览图*/
import WorkCard from './WorkCard'
import styles from '../../../public/style/admin/schedule/ShowWeekSchedule.module.scss'
import { Popover } from 'antd'
function ShowWeekSchedule(props) {
  let schedule = props.schedule
  let keyWord = props.keyWord
  let map = new Map()
  map.set('Monday', 0)
  map.set('Tuesday', 1)
  map.set('Wednesday', 2)
  map.set('Thursday', 3)
  map.set('Friday', 4)
  map.set('Saturday', 5)
  map.set('Sunday', 6)
  /*在星期几被排班的次数，keyword就是周几，所以直接过滤出新数组*/
  const filteredArr = schedule.filter(item => item.week === keyWord)
  const content = (
    <div className={styles.cardBox}>
      {filteredArr.map((item, index) => (
        <div key={index} className={styles.singleCard}>
          {filteredArr.length > 0 && index > 0 && (
            <WorkCard
              fontSize={'18px'}
              rootWidth={'150px'}
              workNum={0}
              workTime={item.time}
              workType={item.type}
            />
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className={styles.rootContainer}>
      <Popover content={content}>
        <div className={styles.firstBox}>
          {filteredArr.length > 0 && (
            <WorkCard
              fontSize={'18px'}
              rootWidth={'150px'}
              workNum={filteredArr.length - 1}
              workTime={filteredArr[0].time}
              workType={filteredArr[0].type}
            />
          )}
        </div>
      </Popover>
    </div>
  )
}

export default ShowWeekSchedule
