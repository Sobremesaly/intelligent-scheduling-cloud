/*修改门店规则的组件*/
import styles from '../../public/style/admin/AdminStoreRule.module.scss'
import { ProfileOutlined, SmileOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import {
  Select,
  Table,
  Tag,
  InputNumber,
  Switch,
  notification,
  Checkbox
} from 'antd'
function AdminStoreRule() {
  /*是否启用系统设置*/
  const [systemChoose, setSystemChoose] = useState(false)
  /*修改规则是否选择系统默认*/
  /*是否启用开店规则*/
  const [openRule, setOpenRule] = useState(false)
  function changeOpenRule() {
    if (openRule === false) {
      setOpenRule(true)
    } else {
      setOpenRule(false)
    }
  }
  /*是否启用关店规则*/
  const [closeRule, setCloseRule] = useState(false)
  function changeCloseRule() {
    if (closeRule === false) {
      setCloseRule(true)
    } else {
      setCloseRule(false)
    }
  }
  /*是否启用客流规则*/
  const [flowRule, setFlowRule] = useState(false)
  function changeFlowRule() {
    if (flowRule === true) {
      setFlowRule(false)
    } else {
      setFlowRule(true)
    }
  }
  /*是否启用打扫规则*/
  const [cleanRule, setCleanRule] = useState(false)
  function changeCleanRule() {
    if (cleanRule === false) {
      setCleanRule(true)
    } else {
      setCleanRule(false)
    }
  }
  /*是否启用清点规则*/
  const [trimRule, setTrimRule] = useState(false)
  function changeTrimRule() {
    if (trimRule === false) {
      setTrimRule(true)
    } else {
      setTrimRule(false)
    }
  }
  /*是否启用值班规则*/
  const [dutyRule, setDutyRule] = useState(false)
  function changeDutyRule() {
    if (dutyRule === false) {
      setDutyRule(true)
    } else {
      setDutyRule(false)
    }
  }
  /*选择进行清点的职务*/
  const selectData = [
    {
      value: 'storeManager',
      label: '门店经理'
    },
    {
      value: 'deputyManager',
      label: '副经理'
    },
    {
      value: 'teamLeader',
      label: '小组长'
    },
    {
      value: 'clerk',
      label: '店员'
    },
    {
      value: 'all',
      label: '无限制'
    }
  ]
  /*选中的进行清点人员职务*/
  const [trimPeople, setTrimPeople] = useState('all')
  const changeTrimPeople = value => {
    setTrimPeople(value)
  }
  /*选中的开店准备人员职务*/
  const [openPeople, setOpenPeople] = useState('all')
  const changeOpenPeople = value => {
    setOpenPeople(value)
  }
  /*选中的客流服务人员职务*/
  const [flowPeople, setFlowPeople] = useState('all')
  const changeFlowPeople = value => {
    setFlowPeople(value)
  }
  /*规则表格格式*/
  const columns = [
    {
      title: '门店规则',
      dataIndex: 'ruleName',
      key: 'ruleName',
      render: text => <span className={styles.ruleName}>{text}</span>
    },
    {
      title: '规则描述',
      dataIndex: 'ruleDescription',
      key: 'ruleDescription'
    },
    {
      title: '启用',
      dataIndex: 'action',
      key: 'action'
    }
  ]
  /*规则数据*/
  const data = [
    {
      key: '1',
      ruleName: '开店规则',
      ruleDescription: (
        <div>
          开店
          <InputNumber defaultValue={1.5} disabled={systemChoose} />
          小时前需要有员工当值，当值员工数为门店面积除以
          <InputNumber defaultValue={23.5} disabled={systemChoose} />
          <span> </span>
          <Select
            options={selectData}
            value={openPeople}
            onChange={changeOpenPeople}
            disabled={systemChoose}
          />
        </div>
      ),
      action: (
        <div className={styles.boxArea}>
          <Checkbox
            className={styles.checkbox}
            checked={openRule}
            disabled={systemChoose}
            onChange={changeOpenRule}
          />
        </div>
      )
    },

    {
      key: '2',
      ruleName: '关店规则',
      ruleDescription: (
        <div>
          关店
          <InputNumber defaultValue={2.5} disabled={systemChoose} />
          小时内需要有员工当值，当值员工数不小于
          <InputNumber defaultValue={3} disabled={systemChoose} />
          并且不小于门店面积除以
          <InputNumber defaultValue={13} disabled={systemChoose} />
        </div>
      ),
      action: (
        <div className={styles.boxArea}>
          <Checkbox
            className={styles.checkbox}
            checked={closeRule}
            disabled={systemChoose}
            onChange={changeCloseRule}
          />
        </div>
      )
    },
    {
      key: '3',
      ruleName: '打扫规则',
      ruleDescription: (
        <div>
          每天开店之前需要
          <InputNumber defaultValue={1} disabled={systemChoose} />
          小时做准备工作, 安排人数为门店面积 /
          <InputNumber defaultValue={100} disabled={systemChoose} />
        </div>
      ),
      action: (
        <div className={styles.boxArea}>
          <Checkbox
            className={styles.checkbox}
            checked={cleanRule}
            disabled={systemChoose}
            onChange={changeCleanRule}
          />
        </div>
      )
    },
    {
      key: '4',
      ruleName: '清点规则',
      ruleDescription: (
        <div>
          每天关店之后需要
          <InputNumber defaultValue={2} disabled={systemChoose} />
          小时做收尾工作,需要人数为门店面积 /
          <InputNumber defaultValue={80} disabled={systemChoose} /> +{' '}
          <InputNumber defaultValue={1} disabled={systemChoose} />
          <span> </span>
          <Select
            options={selectData}
            value={trimPeople}
            onChange={changeTrimPeople}
            disabled={systemChoose}
          />
        </div>
      ),
      action: (
        <div className={styles.boxArea}>
          <Checkbox
            className={styles.checkbox}
            checked={trimRule}
            disabled={systemChoose}
            onChange={changeTrimRule}
          />
        </div>
      )
    },
    {
      key: '5',
      ruleName: '客流规则',
      ruleDescription: (
        <div>
          每<InputNumber defaultValue={3} disabled={systemChoose} />
          个客流必须安排至少一个员工当值
          <span> </span>
          <Select
            options={selectData}
            value={flowPeople}
            onChange={changeFlowPeople}
            disabled={systemChoose}
          />
        </div>
      ),
      action: (
        <div className={styles.boxArea}>
          <Checkbox
            className={styles.checkbox}
            checked={flowRule}
            disabled={systemChoose}
            onChange={changeFlowRule}
          />
        </div>
      )
    },
    {
      key: '6',
      ruleName: '值班规则',
      ruleDescription: (
        <div>
          当没有客流量的时候安排
          <InputNumber defaultValue={1} disabled={systemChoose} />
          个员工当值
        </div>
      ),
      action: (
        <div className={styles.boxArea}>
          <Checkbox
            className={styles.checkbox}
            checked={dutyRule}
            disabled={systemChoose}
            onChange={changeDutyRule}
          />
        </div>
      )
    }
  ]
  const [api, contextHolder] = notification.useNotification()
  /*弹出通知*/
  const openNotification = text => {
    api.open({
      message: '通知',
      description: text,
      icon: (
        <SmileOutlined
          style={{
            color: '#108ee9'
          }}
        />
      )
    })
  }
  const [tableSelect, setTableSelect] = useState('')
  function changeSystem() {
    if (systemChoose === true) {
      setSystemChoose(false)
      openNotification('关闭了系统设置')
      setTableSelect('')
    } else {
      setSystemChoose(true)
      openNotification('启用了系统设置')
      setTableSelect('tableSelect')
    }
  }

  return (
    <div className={styles.rootComponent}>
      {contextHolder}
      <div className={styles.bigBox}>
        <div className={styles.checkBox}>
          <div className={styles.imgBox}>
            <div className={styles.imgBackground}>
              <ProfileOutlined />
            </div>
            <div className={styles.workText}>
              <span className={styles.workContent}>门店规则</span>
            </div>
          </div>
          <div className={styles.storeName}>
            <Tag>西湖店</Tag>
          </div>
          <div className={styles.chooseSystemBox}>
            <p className={styles.chooseTitle}>是否启用系统规则</p>
            <div className={styles.chooseBox}>
              <Switch checked={systemChoose} onClick={changeSystem} />
            </div>
          </div>
          <div className={styles.ruleArea}>
            <div className={styles.ruleList}>
              <Table
                columns={columns}
                dataSource={data}
                className={styles[tableSelect]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminStoreRule
