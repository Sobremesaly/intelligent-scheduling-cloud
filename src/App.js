import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import AdminMainInterface from './page/admin/AdminMainInterface'
import CommonMainInterface from './page/common/CommonMainInterface'
import NoAuthorized from './page/NoAuthorized'
import NoPage from './page/NoPage'
import ServiceError from './page/ServiceError'
import NoLogin from './page/NoLogin'
import 'dayjs/locale/zh-cn'
import locale from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'

/*import rowLineImg from './public/images/pointer.cur'*/
function App() {
  return (
    <ConfigProvider locale={locale}>
      <div className="App" /*style={{ cursor: `url(${rowLineImg}),auto` }}*/>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route
              path="/AdminMainInterface"
              element={<AdminMainInterface />}
            ></Route>
            <Route
              path="/CommonMainInterface"
              element={<CommonMainInterface />}
            ></Route>
            <Route path="/NoAuthorized" element={<NoAuthorized />}></Route>
            <Route path="/NoPage" element={<NoPage />}></Route>
            <Route path="/ServiceError" element={<ServiceError />}></Route>
            <Route path="/NoLogin" element={<NoLogin />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ConfigProvider>
  )
}

export default App
