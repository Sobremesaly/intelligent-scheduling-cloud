import styles from '../../public/style/common/CommonShowSchedule.module.scss'
import { BarsOutlined, PushpinOutlined } from '@ant-design/icons'
import CommonShowSingle from './CommonShowSingle'
import { Table } from 'antd'

function CommonShowSchedule() {
  let schedule = [
    {
      workPlan: [
        { week: 'Monday', time: '11:00-13:00', type: 'prepare' },
        { week: 'Monday', time: '13:00-15:00', type: 'flow' },
        { week: 'Tuesday', time: '13:30-15:00', type: 'clean' },
        { week: 'Tuesday', time: '15:30-17:00', type: 'flow' },
        { week: 'Thursday', time: '17:00-19:00', type: 'prepare' },
        { week: 'Friday', time: '21:00-22:00', type: 'ending' },
        { week: 'Saturday', time: '10:00-12:00', type: 'clear' },
        { week: 'Sunday', time: '20:00-22:00', type: 'flow' }
      ],
      userName: '洪毅凡',
      workTime: '24',
      position: 'manager'
    },
    {
      workPlan: [
        { week: 'Monday', time: '19:00-21:00', type: 'ending' },
        { week: 'Monday', time: '17:00-19:00', type: 'flow' },
        { week: 'Tuesday', time: '13:00-15:00', type: 'ending' },
        { week: 'Wednesday', time: '15:00-17:00', type: 'clear' },
        { week: 'Thursday', time: '15:00-17:00', type: 'prepare' },
        { week: 'Friday', time: '14:00-16:00', type: 'flow' },
        { week: 'Saturday', time: '14:00-16:00', type: 'flow' }
      ],
      userName: 'devs',
      workTime: '20',
      position: 'clerk'
    }
  ]
  let timeMap = [
    'PREPARE',
    'FIRST',
    'SECOND',
    'THIRD',
    'FOURTH',
    'FIFTH',
    'SIXTH',
    'ENDING'
  ]
  const circulation = [1, 2, 3, 4, 5, 6, 7, 8]
  const filteredSchedule = schedule.filter(item => item.userName === '洪毅凡')

  const dataSource = circulation.map(function (item, index) {
    return {
      key: index,
      time: (
        <div>
          <div className={styles.timeMap}>{timeMap[index]}</div>
        </div>
      ),
      Monday: (
        <CommonShowSingle
          schedule={filteredSchedule[0].workPlan}
          keyWord={'Monday'}
          keyIndex={index}
        />
      ),
      Tuesday: (
        <CommonShowSingle
          schedule={filteredSchedule[0].workPlan}
          keyWord={'Tuesday'}
          keyIndex={index}
        />
      ),
      Wednesday: (
        <CommonShowSingle
          schedule={filteredSchedule[0].workPlan}
          keyWord={'Wednesday'}
          keyIndex={index}
        />
      ),
      Thursday: (
        <CommonShowSingle
          schedule={filteredSchedule[0].workPlan}
          keyWord={'Thursday'}
          keyIndex={index}
        />
      ),
      Friday: (
        <CommonShowSingle
          schedule={filteredSchedule[0].workPlan}
          keyWord={'Friday'}
          keyIndex={index}
        />
      ),
      Saturday: (
        <CommonShowSingle
          schedule={filteredSchedule[0].workPlan}
          keyWord={'Saturday'}
          keyIndex={index}
        />
      ),
      Sunday: (
        <CommonShowSingle
          schedule={filteredSchedule[0].workPlan}
          keyWord={'Sunday'}
          keyIndex={index}
        />
      )
    }
  })
  const columns = [
    {
      title: (
        <div className={styles.topHead}>
          <span>时间段</span>
        </div>
      ),
      dataIndex: 'time',
      key: 'time'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>MON</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <BarsOutlined />
            </div>
            <div className={styles.iconContainer}>
              <PushpinOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'Monday',
      key: 'Monday'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>TUE</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <BarsOutlined />
            </div>
            <div className={styles.iconContainer}>
              <PushpinOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'Tuesday',
      key: 'Tuesday'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>WED</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <BarsOutlined />
            </div>
            <div className={styles.iconContainer}>
              <PushpinOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'Wednesday',
      key: 'Wednesday'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>THU</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <BarsOutlined />
            </div>
            <div className={styles.iconContainer}>
              <PushpinOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'Thursday',
      key: 'Thursday'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>FRI</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <BarsOutlined />
            </div>
            <div className={styles.iconContainer}>
              <PushpinOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'Friday',
      key: 'Friday'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>SAT</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <BarsOutlined />
            </div>
            <div className={styles.iconContainer}>
              <PushpinOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'Saturday',
      key: 'Saturday'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>SUN</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <BarsOutlined />
            </div>
            <div className={styles.iconContainer}>
              <PushpinOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'Sunday',
      key: 'Sunday'
    }
  ]

  return (
    <div className={styles.rootContainer}>
      <div className={styles.tableShow}>
        <Table
          id={'my_table'}
          className={styles.tableDisplay}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </div>
  )
}

export default CommonShowSchedule
