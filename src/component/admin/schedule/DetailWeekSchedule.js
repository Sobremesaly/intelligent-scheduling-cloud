import styles from '../../../public/style/admin/schedule/DetailWeekSchedule.module.scss'
import '../../../public/style/admin/schedule/DetailWeekSchedule.css'
import { Table } from 'antd'
import ShowDetailSchedule from './ShowDetailSchedule'
import { FileDoneOutlined, PushpinOutlined } from '@ant-design/icons'
function DetailWeekSchedule() {
  /*表格的第一行是开发班次可以修改其背景色让其更加明显*/
  const rowClassName = (record, index) => {
    if (index === 0) {
      return 'red-row'
    }
    return ''
  }
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
  let openShifts = [
    {
      workPlan: [
        { week: 'Monday', time: '11:00-13:00', type: 'prepare' },
        { week: 'Monday', time: '13:00-15:00', type: 'flow' }
      ]
    },
    {
      workPlan: [
        { week: 'Tuesday', time: '15:00-17:00', type: 'clean' },
        { week: 'Tuesday', time: '17:30-19:30', type: 'flow' }
      ]
    },
    { workPlan: [] },
    { workPlan: [] },
    {
      workPlan: [{ week: 'Friday', time: '11:00-13:00', type: 'flow' }]
    },
    { workPlan: [] },
    { workPlan: [] }
  ]
  let schedule = [
    {
      workPlan: [
        { week: 'Monday', time: '11:00-13:00', type: 'prepare' },
        { week: 'Monday', time: '13:00-15:00', type: 'flow' },
        { week: 'Tuesday', time: '13:30-15:00', type: 'clean' },
        { week: 'Tuesday', time: '15:30-17:00', type: 'flow' },
        { week: 'Thursday', time: '15:00-17:00', type: 'prepare' },
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

  const dataSource = openShifts.map(function (item, index) {
    return {
      key: index,
      time: (
        <div>
          {index === 0 && <div className={styles.openShifts}>OpenShifts</div>}
          {index !== 0 && (
            <div className={styles.timeMap}>{timeMap[index - 1]}</div>
          )}
        </div>
      ),
      Monday: (
        <ShowDetailSchedule
          schedule={schedule}
          keyWord={'Monday'}
          openShift={openShifts}
          keyIndex={index}
        />
      ),
      Tuesday: (
        <ShowDetailSchedule
          schedule={schedule}
          keyWord={'Tuesday'}
          openShift={openShifts}
          keyIndex={index}
        />
      ),
      Wednesday: (
        <ShowDetailSchedule
          schedule={schedule}
          keyWord={'Wednesday'}
          openShift={openShifts}
          keyIndex={index}
        />
      ),
      Thursday: (
        <ShowDetailSchedule
          schedule={schedule}
          keyWord={'Thursday'}
          openShift={openShifts}
          keyIndex={index}
        />
      ),
      Friday: (
        <ShowDetailSchedule
          schedule={schedule}
          keyWord={'Friday'}
          openShift={openShifts}
          keyIndex={index}
        />
      ),
      Saturday: (
        <ShowDetailSchedule
          schedule={schedule}
          keyWord={'Saturday'}
          openShift={openShifts}
          keyIndex={index}
        />
      ),
      Sunday: (
        <ShowDetailSchedule
          schedule={schedule}
          keyWord={'Sunday'}
          openShift={openShifts}
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
              <FileDoneOutlined />
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
              <FileDoneOutlined />
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
              <FileDoneOutlined />
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
              <FileDoneOutlined />
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
              <FileDoneOutlined />
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
              <FileDoneOutlined />
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
              <FileDoneOutlined />
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
          rowClassName={rowClassName}
        />
      </div>
    </div>
  )
}

export default DetailWeekSchedule
