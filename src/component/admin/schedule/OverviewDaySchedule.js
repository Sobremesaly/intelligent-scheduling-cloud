import styles from '../../../public/style/admin/schedule/AdminOverviewSchedule.module.scss'
import { Table, Select } from 'antd'
import PeopleCard from './PeopleCard'
import ShowDaySchedule from './ShowDaySchedule'
import { CheckSquareOutlined, TagOutlined } from '@ant-design/icons'

function OverviewDaySchedule() {
  let schedule = [
    {
      workPlan: [
        { week: 'Monday', time: '9:00-11:00', type: 'prepare' },
        { week: 'Monday', time: '11:00-14:00', type: 'flow' },
        { week: 'Tuesday', time: '14:30-15:30', type: 'prepare' },
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
        { week: 'Monday', time: '19:00-21:00', type: 'ending' },
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
      prepare: (
        <ShowDaySchedule schedule={item.workPlan} timeRange={'prepare'} />
      ),
      first: <ShowDaySchedule schedule={item.workPlan} timeRange={'first'} />,
      second: <ShowDaySchedule schedule={item.workPlan} timeRange={'second'} />,
      thirdly: (
        <ShowDaySchedule schedule={item.workPlan} timeRange={'thirdly'} />
      ),
      fourth: <ShowDaySchedule schedule={item.workPlan} timeRange={'fourth'} />,
      fifth: <ShowDaySchedule schedule={item.workPlan} timeRange={'fifth'} />,
      sixth: <ShowDaySchedule schedule={item.workPlan} timeRange={'sixth'} />,
      end: <ShowDaySchedule schedule={item.workPlan} timeRange={'end'} />
    }
  })
  function handleChange() {}

  const columns = [
    {
      title: (
        <div className={styles.topHead}>
          <Select
            defaultValue="all"
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
            <span className={styles.weekContext}>PRE</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <CheckSquareOutlined />
            </div>
            <div className={styles.iconContainer}>
              <TagOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'prepare',
      key: 'prepare'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>FIR</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <CheckSquareOutlined />
            </div>
            <div className={styles.iconContainer}>
              <TagOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'first',
      key: 'first'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>SEC</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <CheckSquareOutlined />
            </div>
            <div className={styles.iconContainer}>
              <TagOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'second',
      key: 'second'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>THI</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <CheckSquareOutlined />
            </div>
            <div className={styles.iconContainer}>
              <TagOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'thirdly',
      key: 'thirdly'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>FOU</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <CheckSquareOutlined />
            </div>
            <div className={styles.iconContainer}>
              <TagOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'fourth',
      key: 'fourth'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>FIF</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <CheckSquareOutlined />
            </div>
            <div className={styles.iconContainer}>
              <TagOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'fifth',
      key: 'fifth'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>SIX</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <CheckSquareOutlined />
            </div>
            <div className={styles.iconContainer}>
              <TagOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'sixth',
      key: 'sixth'
    },
    {
      title: (
        <div className={styles.topHeadCard}>
          <div className={styles.contextBox}>
            <span className={styles.weekContext}>END</span>
          </div>
          <div className={styles.weekIconBox}>
            <div className={styles.iconContainer}>
              <CheckSquareOutlined />
            </div>
            <div className={styles.iconContainer}>
              <TagOutlined />
            </div>
          </div>
        </div>
      ),
      dataIndex: 'end',
      key: 'end'
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

export default OverviewDaySchedule
