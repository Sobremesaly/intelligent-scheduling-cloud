import { Button, notification, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
function NoAuthorized() {
  const navigate = useNavigate()
  /*回到主页面*/
  function backHome() {
    navigate('/')
  }
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = type => {
    api[type]({
      message: '请求失败！',
      description: '请勿伪造token，或者重新登录试试.'
    })
  }
  useEffect(() => {
    openNotificationWithIcon('error')
  }, [])

  return (
    <div>
      {contextHolder}
      <Result
        status="403"
        title="403"
        subTitle="对不起,您无权访问该页面哦."
        extra={
          <Button type="primary" onClick={backHome}>
            Back Home
          </Button>
        }
      />
    </div>
  )
}
export default NoAuthorized
