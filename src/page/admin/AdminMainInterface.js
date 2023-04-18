import React, { useEffect, useState } from 'react'
import { Layout, Space, DatePicker, Menu } from 'antd'
import styles from '../../public/style/admin/AdminMainInterface.module.scss'
import TopHeader from '../../component/TopHeader'
import {
  UserOutlined,
  BarChartOutlined,
  HomeOutlined,
  FormOutlined,
  CarryOutOutlined
} from '@ant-design/icons'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { initDateTimeAction } from '../../store/modules/admin'
/*引入页面组件*/
import AdminServiceForecast from '../../component/admin/AdminServiceForecast'
import AdminAddStaff from '../../component/admin/AdminAddStaff'
import AdminCheckStore from '../../component/admin/AdminCheckStore'
import AdminStoreRule from '../../component/admin/AdminStoreRule'
import AdminCreateSchedule from '../../component/admin/schedule/AdminCreateSchedule'
const { Header, Content } = Layout
function AdminMainInterface() {
  /*本周一*/
  let start = moment().weekday(1).format('YYYY/MM/DD (dddd)')
  /*本周日*/
  let end = moment().weekday(7).format('YYYY/MM/DD (dddd)')
  const [startTime, setStartTime] = useState(start)
  const [endTime, setEndTime] = useState(end)
  /*调用redux中的action去修改数据*/
  const dispatch = useDispatch()
  useEffect(() => {
    function initDataTime() {
      dispatch(initDateTimeAction(startTime))
    }
    initDataTime()
  }, [startTime, dispatch])
  /*日期选择的回调函数，date是所选择日期等一些信息*/
  const onChange = date => {
    /*周一日期*/
    const startDate = moment(date.$d).day(1).format('YYYY/MM/DD (dddd)')
    /*周日日期*/
    const endDate = moment(date.$d).day(7).format('YYYY/MM/DD (dddd)')
    setStartTime(startDate)
    setEndTime(endDate)
  }
  const items = [
    {
      label: '员工信息',
      key: 'AdminAddStaff',
      icon: <UserOutlined />
    },
    {
      label: '流量预测',
      key: 'AdminServiceForecast',
      icon: <BarChartOutlined />
    },
    {
      label: '门店信息',
      key: 'AdminCheckStore',
      icon: <HomeOutlined />
    },
    {
      label: '门店规则',
      key: 'AdminStoreRule',
      icon: <CarryOutOutlined />
    },
    {
      label: '生成排班表',
      key: 'AdminCreateSchedule',
      icon: <FormOutlined />
    }
  ]
  /*控制展示的组件*/
  const [current, setCurrent] = useState('AdminAddStaff')
  const onClick = e => {
    setCurrent(e.key)
    console.log(current)
  }
  return (
    <div className={styles.componentRoot}>
      <Space direction="vertical" size={[0, 48]}>
        <Layout>
          <Header>
            <TopHeader />
          </Header>
          <Content>
            <div className={styles.middle}>
              <div className={styles.chooseTimeArea}>
                <div className={styles.appNameContainer}>
                  <span className={styles.appName}>智能排班云</span>
                </div>
                <div className={styles.chooseTimeContainer}>
                  <div className={styles.reminderText}>
                    <p>选择所要查看的日期</p>
                  </div>
                  <div className={styles.timePickerArea}>
                    <div className={styles.dataContainer}>
                      <div className={styles.dataPickerContainer}>
                        <div className={styles.dataPickerArea}>
                          <div className={styles.dataPicker}>
                            <DatePicker onChange={onChange} picker="week" />
                          </div>
                        </div>
                      </div>
                      <div className={styles.dataShow}>
                        <div className={styles.dataShowArea}>
                          <span className={styles.dataNumber}>
                            {startTime} /{' '}
                          </span>
                          <span className={styles.dataNumber}>{endTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.changeArea}>
                <div className={styles.changeMenu}>
                  <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                  />
                </div>
              </div>
              <div className={styles.changeContainer}>
                {current === 'AdminAddStaff' && <AdminAddStaff></AdminAddStaff>}
                {current === 'AdminServiceForecast' && (
                  <AdminServiceForecast></AdminServiceForecast>
                )}
                {current === 'AdminCheckStore' && (
                  <AdminCheckStore></AdminCheckStore>
                )}
                {current === 'AdminStoreRule' && (
                  <AdminStoreRule></AdminStoreRule>
                )}
                {current === 'AdminCreateSchedule' && (
                  <AdminCreateSchedule></AdminCreateSchedule>
                )}
              </div>
            </div>
          </Content>
        </Layout>
      </Space>
    </div>
  )
}
export default AdminMainInterface
