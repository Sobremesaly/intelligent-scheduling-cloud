import SingleCard from './SingleCard'
import styles from '../../public/style/admin/schedule/ShowWeekSchedule.module.scss'

function CommonShowSingle(props) {
  let schedule = props.schedule
  let keyWord = props.keyWord
  let keyIndex = props.keyIndex
  let typeMap = new Map()
  typeMap.set(1, 'prepare')
  typeMap.set(2, 'first')
  typeMap.set(3, 'second')
  typeMap.set(4, 'thirdly')
  typeMap.set(5, 'fourth')
  typeMap.set(6, 'fifth')
  typeMap.set(7, 'ending')
  let weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  let weekend = ['Saturday', 'Sunday']
  let workMap = new Map()
  if (weekday.includes(keyWord)) {
    workMap.set('9', 'prepare')
    workMap.set('11', 'first')
    workMap.set('13', 'second')
    workMap.set('15', 'thirdly')
    workMap.set('17', 'fourth')
    workMap.set('19', 'fifth')
    workMap.set('21', 'ending')
  } else if (weekend.includes(keyWord)) {
    workMap.set('10', 'prepare')
    workMap.set('12', 'first')
    workMap.set('14', 'second')
    workMap.set('16', 'thirdly')
    workMap.set('18', 'fourth')
    workMap.set('20', 'fifth')
    workMap.set('22', 'ending')
  }
  /*截取工作时间的起始时间就可以判断是哪一段的*/
  function getHours(time) {
    /*找到第一个冒号的位置*/
    let index = time.indexOf(':')
    /*截取从开头到冒号位置之前的子串*/
    return time.substring(0, index)
  }
  let filteredWorkPlan = schedule.filter(plan => {
    return (
      plan.week === keyWord &&
      workMap.get(getHours(plan.time)) === typeMap.get(keyIndex)
    )
  })
  return (
    <div className={styles.rootContainer}>
      <div className={styles.firstBox}>
        {filteredWorkPlan.length > 0 && (
          <SingleCard
            workTime={filteredWorkPlan[0].time}
            workType={filteredWorkPlan[0].type}
          />
        )}
      </div>
    </div>
  )
}

export default CommonShowSingle
