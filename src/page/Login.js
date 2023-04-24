import styles from '../public/style/Login.module.scss'
import { useState } from 'react'
import { getLogin } from '../api/Login'
import React from 'react'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
function Login() {
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('nullLabel')
  const [pass, setPass] = useState('nullLabel')
  /*借用onchange事件来实现数据的双向绑定*/
  function usernameChange(event) {
    setUserName(event.target.value)
  }
  function passwordChange(event) {
    setPassword(event.target.value)
  }
  /*通知栏的方法*/
  const [context, contextHolder] = message.useMessage()
  /*进行监听，防止页面元素混乱*/
  function listenInput(event) {
    if (event.target.value !== '' && event.target.name === 'username') {
      setEmail('inputHava')
    } else if (event.target.value === '' && event.target.name === 'username') {
      setEmail('nullLabel')
    }
    if (event.target.value !== '' && event.target.name === 'password') {
      setPass('inputHava')
    } else if (event.target.value === '' && event.target.name === 'password') {
      setPass('nullLabel')
    }
  }
  /*进行登录操作*/
  const navigate = useNavigate()
  async function doGetLogin() {
    let params = {
      username: username,
      password: password
    }
    const res = await getLogin(params)
    if (res.data.code === 200) {
      message.success('登录成功,欢迎您!', 0.5).then(() => {
        setTimeout(() => {
          /*判断一下身份*/
          if (res.data.role.indexOf('manager') !== -1) {
            navigate('/AdminMainInterface')
          } else {
            navigate('/CommonMainInterface')
          }
        }, 500)
      })
    } else {
      message.error('登录失败!')
    }
  }

  return (
    <div className={styles.rootElement}>
      <hgroup>
        <h1>Intelligent scheduling</h1>
        <h3>By Little Leaf</h3>
      </hgroup>
      {contextHolder}
      <form>
        <div className={styles.group}>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onBlur={listenInput}
            onChange={usernameChange}
            className={styles}
          ></input>
          <span className={styles.highlight}></span>
          <span className={styles.bar}></span>
          <label className={styles[email]}>Email</label>
        </div>
        <div className={styles.group}>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onBlur={listenInput}
            onChange={passwordChange}
            className={styles}
          ></input>
          <span className={styles.highlight}></span>
          <span className={styles.bar}></span>
          <label className={styles[pass]}>Password</label>
        </div>
        <button
          type="button"
          className={[`${styles.button}`, `${styles.buttonBlue}`].join(' ')}
          onClick={doGetLogin}
        >
          Login In
          <div className={styles.ripples}>
            <span className={styles.ripplesCircle}></span>
          </div>
        </button>
      </form>
      <footer>
        <img
          src="https://www.polymer-project.org/images/logos/p-logo.svg"
          alt={'图标'}
        ></img>
        <p>Only For The Best</p>
      </footer>
    </div>
  )
}

export default Login
