import styles from '../../../public/style/admin/schedule/PeopleCard.module.scss'
import React from 'react'
import { Avatar, Tag } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'

function PeopleCard(props) {
  let userName = props.userName
  let workTime = props.workTime
  let position = props.position
  const ColorList = [
    '#f56a00',
    '#7265e6',
    '#ffbf00',
    '#00a2ae',
    'E42222FF',
    '0BE6B2FF'
  ]
  return (
    <div className={styles.rootContainer}>
      <div className={styles.avatarBox}>
        <Avatar
          size="large"
          style={{ backgroundColor: ColorList[workTime % 6] }}
        >
          <span className={styles.lastName}>{userName.charAt(0)}</span>
        </Avatar>
      </div>
      <div className={styles.contextBox}>
        <div className={styles.name}>
          <span>{userName}</span>
          {position === 'manager' && (
            <Tag className={styles.positionTag} color="volcano">
              门店经理
            </Tag>
          )}
          {position === 'deputyManager' && (
            <Tag className={styles.positionTag} color="geekblue">
              副经理
            </Tag>
          )}
          {position === 'teamLeader' && (
            <Tag className={styles.positionTag} color="gold">
              小组长
            </Tag>
          )}
          {position === 'clerk' && (
            <Tag className={styles.positionTag} color="green">
              店员
            </Tag>
          )}
        </div>
        <div className={styles.workTime}>
          <div className={styles.iconBox}>
            <ClockCircleOutlined />
          </div>
          <div className={styles.workTimeBox}>
            <span className={styles.singleOne}>{workTime}</span>
            <span className={styles.singleOne}>/</span>
            <span className={styles.singleOne}>40</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeopleCard
