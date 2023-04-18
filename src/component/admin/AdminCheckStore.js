import styles from '../../public/style/admin/AdminCheckStore.module.scss'
import { ProjectOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { Button, Form, Input, Modal, Table, Tag } from 'antd'
function AdminCheckStore() {
  /*删除门店*/
  function deleteStore(event) {
    console.log(event.currentTarget.id)
  }
  /*需要打印出来的信息格式*/
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
      render: text => (
        <Tag color="volcano" className={styles.IDTag}>
          {text}
        </Tag>
      )
    },
    {
      title: '门店',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      render: text => <span className={styles.address}>{text}</span>
    },
    {
      title: '面积/平方米',
      dataIndex: 'size',
      key: 'size',
      render: text => <span>{text} ㎡ </span>
    },
    {
      title: '操作',
      dataIndex: 'ID',
      key: 'ID',
      render: text => (
        <Button type="primary" danger id={text} onClick={deleteStore}>
          删除
        </Button>
      )
    }
  ]
  /*门店数据内容*/
  const data = [
    {
      key: '1',
      ID: '0001',
      age: '前湖店',
      address: 'New York No. 1 Lake Park',
      size: '50'
    },
    {
      key: '2',
      ID: '0002',
      age: '西湖店',
      address: 'London No. 1 Lake Park',
      size: '40'
    },
    {
      key: '3',
      ID: '0003',
      age: '万达店',
      address: 'Sydney No. 1 Lake Park',
      size: '60'
    }
  ]
  /*是否开启对话框*/
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  /*对话框点击确认操作*/
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }
  /*取消对话框的操作*/
  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }
  /*对话框完成*/
  const onFinish = values => {
    console.log(values)
  }
  /*基础的文本校验*/
  const validateMessages = {
    required: '${label} 必须要填写的!',
    types: {
      email: '${label} 是不合法的!'
    }
  }
  /*打开对话框*/
  function showModal() {
    setOpen(true)
  }

  return (
    <div className={styles.rootComponent}>
      <div className={styles.messageBox}>
        <Modal
          title="添加门店"
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
                name={['store', 'name']}
                label="门店名称"
                rules={[{ required: true }]}
                className={styles.formLabel}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['user', 'address']}
                label="门店地址"
                rules={[{ required: true }]}
                className={styles.formLabel}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['user', 'size']}
                label="门店面积"
                rules={[{ required: true }]}
                className={styles.formLabel}
              >
                <Input />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
      <div className={styles.topHeader}>
        <div className={styles.listBox}>
          <div className={styles.imgBox}>
            <div className={styles.imgBackground}>
              <ProjectOutlined />
            </div>
            <div className={styles.workText}>
              <span className={styles.workContent}>门店概览</span>
            </div>
          </div>
          <div className={styles.buttonBox}>
            <div className={styles.buttonContainer}>
              <Button type="primary" size="24" onClick={showModal}>
                添加门店
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.information}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  )
}

export default AdminCheckStore
