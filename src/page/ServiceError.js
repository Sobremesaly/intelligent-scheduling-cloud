import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
function ServiceError() {
  const navigate = useNavigate()
  /*回到主页面*/
  function backHome() {
    navigate('/')
  }
  return (
    <Result
      status="500"
      title="500"
      subTitle="对不起,服务器开小差了."
      extra={
        <Button type="primary" onClick={backHome}>
          Back Home
        </Button>
      }
    />
  )
}
export default ServiceError
