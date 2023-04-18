import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
function NoAuthorized() {
  const navigate = useNavigate()
  /*回到主页面*/
  function backHome() {
    navigate('/')
  }
  return (
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
  )
}
export default NoAuthorized
