import styles from '../../../public/style/admin/schedule/WorkCard.module.scss'
import { useEffect, useState } from 'react'
import { Badge } from 'antd'

function WorkCard(props) {
  /*单元格展示的数据要根据不同的页面去改变*/
  let workNum = props.workNum
  let workTime = props.workTime
  let workType = props.workType
  let fontSize = props.fontSize
  let rootWidth = props.rootWidth
  const upperCase = workType.toUpperCase()
  const workMap = new Map()
  workMap.set('prepare', 0)
  workMap.set('ending', 1)
  workMap.set('clean', 2)
  workMap.set('clear', 3)
  workMap.set('flow', 4)
  const ColorArray = [
    'linear-gradient(-90deg, #29bdd9 0%, #276ace 100%)',
    'linear-gradient(-90deg, #8dc63f 0%, #84AF9B 100%)',
    'linear-gradient(-90deg, #D24D57 0%, #9D2933 100%)',
    'linear-gradient(-90deg, #a5673f 0%, #A56721 100%)',
    'linear-gradient(-90deg, #1cbbb4 0%, #02BB9A 100%)'
  ]
  const [cardColor, setCardColor] = useState(ColorArray[0])
  /*在页面渲染时执行*/
  useEffect(() => {
    let index = workMap.get(workType)
    setCardColor(ColorArray[index])
  }, [ColorArray])

  return (
    <div
      className={styles.rootContainer}
      style={{
        backgroundImage: cardColor,
        width: rootWidth
      }}
    >
      <Badge count={workNum} offset={[1, -13]}>
        <div className={styles.showBox}>
          <div className={styles.showTime} style={{ fontSize: fontSize }}>
            {workTime}
          </div>
          <div className={styles.workBox}>
            <div className={styles.showWork}>{upperCase.substring(0, 5)}</div>
          </div>
        </div>
      </Badge>
    </div>
  )
}

export default WorkCard
