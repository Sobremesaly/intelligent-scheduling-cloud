import styles from '../../public/style/admin/schedule/WorkCard.module.scss'
import { useEffect, useState } from 'react'

function SingleCard(props) {
  let workTime = props.workTime
  let workType = props.workType
  const upperCase = workType.toUpperCase()
  const workMap = new Map()
  workMap.set('prepare', 0)
  workMap.set('ending', 1)
  workMap.set('clean', 2)
  workMap.set('clear', 3)
  workMap.set('flow', 4)
  const ColorArray = [
    'linear-gradient(-90deg, #ff9569 0%, #e92758 100%)',
    'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)',
    'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
    'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
    'linear-gradient(132deg, #F4D03F 0%, #16A085 100%)'
  ]
  const [cardColor, setCardColor] = useState(ColorArray[0])
  /*在页面渲染时执行*/
  useEffect(() => {
    let index = workMap.get(workType)
    setCardColor(ColorArray[index])
  }, [workType])
  return (
    <div
      className={styles.rootContainer}
      style={{
        backgroundImage: cardColor,
        width: '170px'
      }}
    >
      <div className={styles.showBox}>
        <div className={styles.showTime}>{workTime}</div>
        <div className={styles.workBox}>
          <div className={styles.showWork}>{upperCase.substring(0, 5)}</div>
        </div>
      </div>
    </div>
  )
}

export default SingleCard
