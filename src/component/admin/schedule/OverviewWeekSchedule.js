/*排班表的总览周视图*/
import styles from '../../../public/style/admin/schedule/AdminOverviewSchedule.module.scss'
import { Table, Select } from 'antd'
import PeopleCard from './PeopleCard'
import ShowWeekSchedule from './ShowWeekSchedule'
import { FileDoneOutlined, PushpinOutlined } from '@ant-design/icons'

function OverviewWeekSchedule() {
  let schedule = [
    {
      workPlan: [
        { week: 'Monday', time: '11:30-12:30', type: 'prepare' },
        { week: 'Monday', time: '14:30-15:30', type: 'flow' },
        { week: 'Tuesday', time: '14:30-15:30', type: 'clean' },
        { week: 'Wednesday', time: '14:30-15:30', type: 'flow' },
        { week: 'Thursday', time: '14:30-15:30', type: 'prepare' },
        { week: 'Friday', time: '14:30-15:30', type: 'ending' },
        { week: 'Saturday', time: '14:30-15:30', type: 'clear' },
        { week: 'Sunday', time: '14:30-15:30', type: 'flow' }
      ],
      userName: '洪毅凡',
      workTime: '24',
      position: 'manager'
    },
    {
      workPlan: [
        { week: 'Monday', time: '18:30-20:30', type: 'ending' },
        { week: 'Monday', time: '10:30-12:30', type: 'flow' },
        { week: 'Tuesday', time: '14:30-15:30', type: 'ending' },
        { week: 'Wednesday', time: '14:30-15:30', type: 'clear' },
        { week: 'Thursday', time: '14:30-15:30', type: 'prepare' },
        { week: 'Friday', time: '14:30-15:30', type: 'flow' },
        { week: 'Saturday', time: '14:30-15:30', type: 'flow' }
      ],
      userName: 'devs',
      workTime: '20',
      position: 'clerk'
    }
  ]

  const dataSource = schedule.map(function (item, index) {
    return {
      key: index,
      user: (
        <PeopleCard
          userName={item.userName}
          workTime={item.workTime}
          position={item.position}
        />
      ),
      Monday: <ShowWeekSchedule schedule={item.workPlan} keyWord={'Monday'} />,
      Tuesday: (
        <ShowWeekSchedule schedule={item.workPlan} keyWord={'Tuesday'} />
      ),
      Wednesday: (
        <ShowWeekSchedule schedule={item.workPlan} keyWord={'Wednesday'} />
      ),
      Thursday: (
        <ShowWeekSchedule schedule={item.workPlan} keyWord={'Thursday'} />
      ),
      Friday: <ShowWeekSchedule schedule={item.workPlan} keyWord={'Friday'} />,
      Saturday: (
        <ShowWeekSchedule schedule={item.workPlan} keyWord={'Saturday'} />
      ),
      Sunday: <ShowWeekSchedule schedule={item.workPlan} keyWord={'Sunday'} />
    }
  })
  function handleChange() {}

  const columns = [
    {
      title: (
        <div className={styles.topHead}>
          <Select
            defaultValue="All"
            style={{
              width: 120
            }}
            onChange={handleChange}
            options={[
              {
                value: 'manager',
                label: '门店经理'
              },
              {
                value: 'all',
                label: '无限制'
              },
              {
                value: 'deputyManager',
                label: '副经理'
              },
              {
                label: '小组长',
                value: 'teamLeader'
              },
              {
                label: '店员',
                value: 'clerk'
              }
            ]}
          />
        </div>
      ),
      dataIndex: 'user',
      key: 'user'
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
          className={styles.tableDisplay}
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    </div>
  )
}

export default OverviewWeekSchedule
