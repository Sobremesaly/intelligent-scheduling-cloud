import styles from '../../../public/style/admin/schedule/DetailCard.module.scss'
import { useEffect, useState } from 'react'
import { Badge } from 'antd'

function DetailCard(props) {
  let workNum = props.workNum
  let workTime = props.workTime
  let workType = props.workType
  let userName = props.userName
  const upperCase = workType.toUpperCase()
  const workMap = new Map()
  workMap.set('clean', 0)
  workMap.set('ending', 1)
  workMap.set('prepare', 2)
  workMap.set('clear', 3)
  workMap.set('flow', 4)
  let right
  let top
  if (userName !== '') {
    right = 0
    top = 0
  } else {
    right = 2
    top = -8
  }
  const ColorArray = [
    'linear-gradient(-90deg, #669999 0%, #96d4d4 100%)',
    'linear-gradient(-90deg, #FF6666 0%, #9d2a2a 100%)',
    'linear-gradient(-90deg, #CCFF99 0%, #87b45a 100%)',
    'linear-gradient(-90deg, #3db1ec 0%, #2983b1 100%)',
    'linear-gradient(-90deg, #CCCCFF 0%, #7c7cc9 100%)'
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
        backgroundImage: cardColor
      }}
    >
      <Badge count={workNum} offset={[right, top]}>
        <div className={styles.firstBox}>
          <div className={styles.nameBox}>{userName}</div>
        </div>
        <div className={styles.showBox}>
          <div className={styles.showTime}>{workTime}</div>
          <div className={styles.workBox}>
            <div className={styles.showWork}>{upperCase.substring(0, 5)}</div>
          </div>
        </div>
      </Badge>
    </div>
  )
}

export default DetailCard
