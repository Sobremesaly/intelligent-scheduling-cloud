import { FileDoneOutlined } from '@ant-design/icons'
import styles from '../../public/style/admin/AdminAddStaff.module.scss'
import { DownOutlined } from '@ant-design/icons'
import {
  Dropdown,
  Space,
  Input,
  Button,
  Table,
  Tag,
  Avatar,
  Modal,
  Form,
  Select,
  Popover
} from 'antd'
import React, { useState } from 'react'
const { Search } = Input
function AdminAddStaff() {
  /*搜索框的值*/
  const [searchValue, setSearchValue] = useState('')
  /*是否开启对话框*/
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  /*随机颜色*/
  const ColorList = [
    '#f56a00',
    '#7265e6',
    '#ffbf00',
    '#00a2ae',
    'E42222FF',
    '0BE6B2FF'
  ]
  const [position, setPosition] = useState('职位')
  /*筛选的职位改变*/
  function changePosition(event) {
    setPosition(event.target.rel)
  }
  const [createPosition, setCreatePosition] = useState(1)
  const [store, setStore] = useState(4)
  const items = [
    {
      label: (
        <a target="_blank" rel="门店经理" onClick={changePosition}>
          门店经理
        </a>
      ),
      key: '0'
    },
    {
      label: (
        <a target="_blank" rel="副经理" onClick={changePosition}>
          副经理
        </a>
      ),
      key: '1'
    },
    {
      label: (
        <a target="_blank" rel="小组长" onClick={changePosition}>
          小组长
        </a>
      ),
      key: '2'
    },
    {
      label: (
        <a target="_blank" rel="店员" onClick={changePosition}>
          店员
        </a>
      ),
      key: '3'
    },
    {
      label: (
        <a target="_blank" rel="职位" onClick={changePosition}>
          无
        </a>
      ),
      key: '4'
    },
    {
      type: 'divider'
    }
  ]
  const data = [
    {
      key: '1',
      name: '洪超凡',
      ID: 145344,
      email: '1781371027@qq.com',
      store: '前湖店',
      tags: ['Store Manager'],
      workTime: 14,
      preference: '周一工作'
    },
    {
      key: '2',
      name: '叶子',
      ID: 145331,
      email: '3474742326@qq.com',
      store: '西湖店',
      tags: ['Deputy Manager'],
      workTime: 14,
      preference: '周一工作#一周不超过40小时'
    },
    {
      key: '3',
      name: '程白',
      ID: 658741,
      email: '424575713@qq.com',
      store: '西湖店',
      tags: ['Team Leader'],
      workTime: 14,
      preference: '周三,周四工作#下午'
    },
    {
      key: '4',
      name: '张天',
      ID: 528741,
      email: '268942124@qq.com',
      store: '前湖店',
      tags: ['Clerk'],
      workTime: 14,
      preference: '周三,周四工作#下午'
    }
  ]
  /*格式化员工的喜好*/
  function formatPreference(preference) {
    let preferenceList = preference.split('#')
    let result = ''
    for (let i = 0; i < preferenceList.length; i++) {
      result =
        result +
        '<p style="margin-top: 0;margin-bottom: 2px">' +
        preferenceList[i] +
        '</p>'
    }
    return result
  }
  const columns = [
    {
      title: '员工',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => (
        <Popover
          content={
            <div
              dangerouslySetInnerHTML={{
                __html: formatPreference(data[index].preference)
              }}
            />
          }
        >
          <div className={styles.userAvatar}>
            <Avatar
              key="name"
              size="large"
              style={{
                backgroundColor: ColorList[data[index].ID % 6]
              }}
            >
              {text.charAt(0)}
            </Avatar>
          </div>
        </Popover>
      )
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => <p className={styles.userName}>{text}</p>
    },
    {
      title: '工号',
      dataIndex: 'ID',
      key: 'ID'
    },
    {
      title: '邮件',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '门店',
      dataIndex: 'store',
      key: 'store'
    },
    {
      title: '职位',
      key: 'position',
      dataIndex: 'position',
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
            let color = 'green'
            if (tag === 'Store Manager') {
              color = 'volcano'
            } else if (tag === 'Deputy Manager') {
              color = 'blue'
            } else if (tag === 'Team Leader') {
              color = 'gold'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: '周工作时长',
      key: 'workTime',
      dataIndex: 'workTime',
      render: text => <p className={styles.workTime}>{text}</p>
    },
    {
      title: '操作',
      dataIndex: 'ID',
      key: 'ID',
      render: text => (
        <Button type="primary" danger id={text} onClick={deleteUser}>
          删除
        </Button>
      )
    }
  ]
  /*删除用户*/
  function deleteUser(event) {
    console.log(event.currentTarget.id)
  }
  /*搜索框点击的触发事件*/
  const onSearch = value => console.log(value)
  const onChange = event => {
    setSearchValue(event.currentTarget.value)
  }
  /*基础的文本校验*/
  const validateMessages = {
    required: '${label} 必须要填写的!',
    types: {
      email: '${label} 是不合法的!'
    }
  }
  const onFinish = values => {
    console.log(values)
  }
  /*打开对话框*/
  const showModal = () => {
    setOpen(true)
  }
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  /*选择的店*/
  const handleChange = value => {
    setStore(value)
    console.log(store)
  }
  /*门店集合*/
  const options = [
    {
      value: '1',
      label: '前湖店'
    },
    {
      value: '2',
      label: '西湖店'
    },
    {
      value: '3',
      label: '八一馆店'
    },
    {
      value: '4',
      label: '万达店'
    }
  ]
  /*职务集合*/
  const positionList = [
    {
      value: '1',
      label: '门店经理'
    },
    {
      value: '2',
      label: '副经理'
    },
    {
      value: '3',
      label: '小组长'
    },
    {
      value: '4',
      label: '店员'
    }
  ]
  /*职务选择改变*/
  const positionChange = value => {
    setCreatePosition(value)
    console.log(createPosition)
  }
  return (
    <div className={styles.componentRoot}>
      <div className={styles.topArea}>
        <div className={styles.imgBox}>
          <div className={styles.imgBackground}>
            <FileDoneOutlined />
          </div>
          <div className={styles.workText}>
            <span className={styles.workContent}>周报</span>
          </div>
        </div>
        <div className={styles.dropBox}>
          <Dropdown
            menu={{
              items
            }}
            className={styles.tabs}
          >
            <a onClick={e => e.preventDefault()}>
              <Space>
                {position}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        <div className={styles.selectBoxArea}>
          <div className={styles.selectBox}>
            <Search
              value={searchValue}
              placeholder="输入搜索关键词"
              onSearch={onSearch}
              onChange={onChange}
              style={{
                width: 255
              }}
            />
          </div>
        </div>
        <div className={styles.addButton}>
          <div className={styles.addButtonArea}>
            <Button type="primary" size="24" onClick={showModal}>
              添加员工
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.staffArea}>
        <div className={styles.tableList}>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
      <div className={styles.modalContainer}>
        <Modal
          title="添加员工"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          className={styles.modalTopTitle}
        >
          <div className={styles.formContainer}>
            <Form
              name="nest-messages"
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={['user', 'name']}
                label="姓名"
                rules={[{ required: true }]}
                className={styles.formLabel}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['user', 'email']}
                label="邮箱"
                rules={[{ type: 'email' }, { required: true }]}
                className={styles.formLabel}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['user', 'password']}
                label="密码"
                rules={[{ required: true }]}
                className={styles.formLabel}
              >
                <Input />
              </Form.Item>
              <Form.Item className={styles.selectContainer}>
                <Select
                  defaultValue="4"
                  onChange={handleChange}
                  options={options}
                />
              </Form.Item>
              <Form.Item className={styles.anOtherSelect}>
                <Select
                  defaultValue="4"
                  onChange={positionChange}
                  options={positionList}
                />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default AdminAddStaff
