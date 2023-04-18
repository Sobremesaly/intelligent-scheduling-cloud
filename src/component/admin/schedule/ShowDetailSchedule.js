import styles from '../../../public/style/admin/schedule/ShowWeekSchedule.module.scss'
import DetailCard from './DetailCard'
import { Popover } from 'antd'

function ShowDetailSchedule(props) {
  let schedule = props.schedule
  let keyWord = props.keyWord
  let keyIndex = props.keyIndex
  let openShift = props.openShift
  let weekMap = new Map()
  weekMap.set('Monday', 0)
  weekMap.set('Tuesday', 1)
  weekMap.set('Wednesday', 2)
  weekMap.set('Thursday', 3)
  weekMap.set('Friday', 4)
  weekMap.set('Saturday', 5)
  weekMap.set('Sunday', 6)
  let workMap = new Map()
  workMap.set(1, 'prepare')
  workMap.set(2, 'first')
  workMap.set(3, 'second')
  workMap.set(4, 'thirdly')
  workMap.set(5, 'fourth')
  workMap.set(6, 'fifth')
  workMap.set(7, 'end')
  /*在星期几被排班的次数，keyword就是周几，所以直接过滤出新数组*/
  let filteredArr = []
  /*截取工作时间的起始时间就可以判断是哪一段的*/
  function getHours(time) {
    /*找到第一个冒号的位置*/
    let index = time.indexOf(':')
    /*截取从开头到冒号位置之前的子串*/
    return time.substring(0, index)
  }
  let weekday = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  let weekend = ['Saturday', 'Sunday']
  let timeMap = new Map()
  if (weekday.includes(keyWord)) {
    timeMap.set('9', 'prepare')
    timeMap.set('11', 'first')
    timeMap.set('13', 'second')
    timeMap.set('15', 'thirdly')
    timeMap.set('17', 'fourth')
    timeMap.set('19', 'fifth')
    timeMap.set('21', 'end')
  } else if (weekend.includes(keyWord)) {
    timeMap.set('10', 'prepare')
    timeMap.set('12', 'first')
    timeMap.set('14', 'second')
    timeMap.set('16', 'thirdly')
    timeMap.set('18', 'fourth')
    timeMap.set('20', 'fifth')
    timeMap.set('22', 'end')
  }
  /*可能是开放班次也可能不是*/
  let filteredSchedule
  if (keyIndex === 0) {
    filteredArr = openShift[weekMap.get(keyWord)].workPlan
  } else {
    filteredSchedule = schedule
      .map(item => {
        return {
          userName: item.userName,
          workTime: item.workTime,
          position: item.position,
          workPlan: item.workPlan.filter(plan => {
            return (
              plan.week === keyWord &&
              timeMap.get(getHours(plan.time)) === workMap.get(keyIndex)
            )
          })
        }
      })
      .filter(item => {
        return item.workPlan.length > 0
      })
    filteredArr = filteredSchedule.reduce((acc, cur) => {
      return acc.concat(cur.workPlan)
    }, [])
  }
  const content = (
    <div className={styles.cardBox}>
      {filteredArr.map((item, index) => (
        <div key={index} className={styles.singleCard}>
          {filteredArr.length > 0 && index > 0 && keyIndex === 0 && (
            <DetailCard
              fontSize={'18px'}
              rootWidth={'150px'}
              workNum={0}
              workTime={item.time}
              workType={item.type}
              userName={''}
            />
          )}
          {filteredArr.length > 0 && index > 0 && keyIndex !== 0 && (
            <DetailCard
              fontSize={'18px'}
              rootWidth={'150px'}
              workNum={0}
              workTime={item.time}
              workType={item.type}
              userName={filteredSchedule[index].userName}
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
          {filteredArr.length > 0 && keyIndex === 0 && (
            <DetailCard
              fontSize={'18px'}
              rootWidth={'150px'}
              workNum={filteredArr.length - 1}
              workTime={filteredArr[0].time}
              workType={filteredArr[0].type}
              userName={''}
            />
          )}
          {filteredArr.length > 0 && keyIndex !== 0 && (
            <DetailCard
              fontSize={'18px'}
              rootWidth={'150px'}
              workNum={filteredArr.length - 1}
              workTime={filteredArr[0].time}
              workType={filteredArr[0].type}
              userName={filteredSchedule[0].userName}
            />
          )}
        </div>
      </Popover>
    </div>
  )
}

export default ShowDetailSchedule
