import { Button, notification, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function NoLogin() {
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = type => {
    api[type]({
      message: '访问失败！',
      description: '请您先去登录后再来进行访问哦.'
    })
  }
  useEffect(() => {
    openNotificationWithIcon('error')
  }, [])
  const navigate = useNavigate()
  function backHome() {
    navigate('/')
  }
  return (
    <div>
      {contextHolder}
      <Result
        status="warning"
        title="您还未登录."
        extra={
          <Button type="primary" key="console" onClick={backHome}>
            back home
          </Button>
        }
      />
    </div>
  )
}

export default NoLogin
