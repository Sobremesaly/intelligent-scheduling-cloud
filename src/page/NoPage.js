import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
function NoPage() {
  const navigate = useNavigate()
  /*回到主页面*/
  function backHome() {
    navigate('/')
  }
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起,您要访问的页面不存在哦."
      extra={
        <Button type="primary" onClick={backHome}>
          Back Home
        </Button>
      }
    />
  )
}
export default NoPage
