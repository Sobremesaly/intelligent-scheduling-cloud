/*页面头部可复用的组件*/
import React, { useEffect, useState } from 'react'
import styles from '../public/style/TopHeader.module.scss'
import { Avatar, Dropdown, Modal, Space } from 'antd'
import {
  BarsOutlined,
  DownOutlined,
  FormOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import CheckDayBox from './admin/CheckDayBox'
import CheckTimeBox from './admin/CheckTimeBox'
import CheckDayTimeBox from './admin/CheckDayTimeBox'
import CheckWeekTimeBox from './admin/CheckWeekTimeBox'
import { getStaffInformation } from '../api/staff/getStaffInformation'

function TopHeader() {
  let positionMap = new Map()
  positionMap.set('manager', '经理')
  positionMap.set('common', '店员')
  /*初始时刻去请求一下用户信息过来*/
  const [userInformation, setUserInformation] = useState({})
  const [lastName, setLastName] = useState('')
  async function doGetStaffInformation() {
    let params = {
      staffEmail: '3474742326@qq.com'
    }
    return await getStaffInformation(params)
  }
  useEffect(() => {
    /*标准的异步函数写法*/
    doGetStaffInformation()
      .then(res => {
        setUserInformation(res.data.result)
        setLastName(res.data.result.staffName[0])
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
  /*用来随机产生颜色*/
  const ColorList = [
    '#f56a00',
    '#7265e6',
    '#ffbf00',
    '#00a2ae',
    'E42222FF',
    '0BE6B2FF'
  ]
  /*控制对话框的出现*/
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  /*对话框的确认按钮*/
  const handleOk = () => {
    setIsModalOpen(false)
  }
  /*对话框的取消按钮*/
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const items = [
    {
      key: '1',
      label: (
        <div className={styles.setPreferenceBox}>
          <FormOutlined />
          <span onClick={showModal}>偏好设置</span>
        </div>
      )
    },
    {
      key: '2',
      label: (
        <div className={styles.logoutBox}>
          <BarsOutlined />
          <span>个人信息</span>
        </div>
      )
    },
    {
      key: '3',
      label: (
        <div className={styles.logoutBox}>
          <LogoutOutlined />
          <span>退出登录</span>
        </div>
      )
    }
  ]
  const [color, setColor] = useState(ColorList[0])
  /*在页面渲染时执行*/
  useEffect(() => {
    let index = Math.floor(Math.random() * 5)
    setColor(ColorList[index])
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.imgBox}></div>
      <div className={styles.titleName}>
        <div className={styles.titleContainer}>
          <span>Power By LittleLeaf</span>
        </div>
      </div>
      <div className={styles.userContainer}>
        <div className={styles.userAll}>
          <div className={styles.userAvatar}>
            <Avatar size="large" style={{ backgroundColor: color }}>
              <div className={styles.dropBox}>
                <span className={styles.lastName}>{lastName}</span>
                <Dropdown
                  className={styles.dropMenu}
                  menu={{
                    items
                  }}
                >
                  <a onClick={e => e.preventDefault()}>
                    <Space>
                      Hover me
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </Avatar>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userInformation}>
              <span className={styles.name}>{userInformation.staffName}</span>
              <span className={styles.position}>
                {positionMap.get(userInformation.staffPosition)}
              </span>
            </div>
            <div className={styles.userId}>
              <span className={styles.idNumber}>
                ID : {userInformation.staffId}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className={styles.topModal}
        title="偏好设置"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <div className={styles.PreferenceBox}>
          <div className={styles.workDayBox}>
            <CheckDayBox />
            <CheckTimeBox />
            <CheckDayTimeBox />
            <CheckWeekTimeBox />
          </div>
        </div>
      </Modal>
    </div>
  )
}
export default TopHeader
