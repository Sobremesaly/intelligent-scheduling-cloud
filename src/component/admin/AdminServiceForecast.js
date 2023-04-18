import styles from '../../public/style/admin/AdminServiceForecast.module.scss'
import * as echarts from 'echarts'
import React, { useEffect, useState } from 'react'
import { Dropdown, notification, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  DownOutlined,
  BarChartOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import { addDateTimeAction, deDateTimeAction } from '../../store/modules/admin'
function AdminServiceForecast() {
  const dispatch = useDispatch()
  // 通过useSelector获取到store中的数据
  const adminStore = useSelector(state => state)
  const [store, setStore] = useState('前湖店')
  /*修改所选择的门店*/
  function changeStore(event) {
    setStore(event.target.rel)
  }
  /*门店信息*/
  const items = [
    {
      label: (
        <a target="_blank" rel="前湖店" onClick={changeStore}>
          前湖店
        </a>
      ),
      key: '0'
    },
    {
      label: (
        <a target="_blank" rel="西湖店" onClick={changeStore}>
          西湖店
        </a>
      ),
      key: '1'
    },
    {
      label: (
        <a target="_blank" rel="万达店" onClick={changeStore}>
          万达店
        </a>
      ),
      key: '2'
    },
    {
      label: (
        <a target="_blank" rel="北京路店" onClick={changeStore}>
          北京路店
        </a>
      ),
      key: '3'
    },
    {
      type: 'divider'
    }
  ]
  useEffect(() => {
    let option
    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['Evaporation', 'Temperature']
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '9:00',
            '9:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
            '19:00',
            '19:30',
            '20:00',
            '20:30',
            '21:00',
            '21:30',
            '22:00'
          ],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Precipitation',
          min: 0,
          max: 50,
          interval: 25,
          axisLabel: {
            formatter: '{value} 人次'
          }
        },
        {
          type: 'value',
          name: 'Temperature',
          min: 0,
          max: 50,
          interval: 25,
          axisLabel: {
            formatter: '{value} 人次'
          }
        }
      ],
      series: [
        {
          name: 'Evaporation',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 人次'
            }
          },
          data: [
            14.9, 8.3, 31.6, 26.2, 48.3, 12.1, 37.6, 11.8, 6.1, 18.4, 4.6, 29.3,
            37.1, 2.7, 33.2, 26.6, 36.7, 25.5, 25.6, 34.9, 45.6, 31.4, 6.4, 4.4,
            3.6, 46.2, 18.9, 2.1
          ]
        },

        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + ' 人次'
            }
          },
          data: [
            14.9, 8.3, 31.6, 26.2, 48.3, 12.1, 37.6, 11.8, 6.1, 18.4, 4.6, 29.3,
            37.1, 2.7, 33.2, 26.6, 36.7, 25.5, 25.6, 34.9, 45.6, 31.4, 6.4, 4.4,
            3.6, 46.2, 18.9, 2.1
          ]
        }
      ]
    }
    const chartDom = document.getElementById('main')
    const myChart = echarts.init(chartDom)
    myChart.setOption(option)
  }, []) //仅在挂载和卸载的时候执行
  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = type => {
    api[type]({
      duration: 3,
      message: '警告',
      description: '选择的日期超过范围了哦！'
    })
  }
  /*日期加一的操作*/
  function addDataTime() {
    dispatch(addDateTimeAction())
    /*如果日期出现了回滚就是越界了*/
    if (adminStore.admin.dateTime === adminStore.admin.endTime) {
      openNotificationWithIcon('error')
    }
  }
  /*日期减一的操作*/
  function deDataTime() {
    dispatch(deDateTimeAction())
    if (adminStore.admin.dateTime === adminStore.admin.startTime) {
      openNotificationWithIcon('error')
    }
  }
  return (
    <div className={styles.rootContainer}>
      {contextHolder}
      <div className={styles.bigBox}>
        <div className={styles.checkBox}>
          <div className={styles.imgBox}>
            <div className={styles.imgBackground}>
              <BarChartOutlined />
            </div>
            <div className={styles.workText}>
              <span className={styles.workContent}>业务预测</span>
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
                  {store}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
        <div className={styles.dataPickerBox}>
          <div className={styles.dataContainer}>
            <div className={styles.leftBox} onClick={deDataTime}>
              <LeftOutlined />
            </div>
            <div className={styles.middleBox}>
              <p className={styles.timeNumber}>{adminStore.admin.dateTime} </p>
            </div>
            <div className={styles.rightBox} onClick={addDataTime}>
              <RightOutlined />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.chartBox}>
        <div id="main" style={{ width: '100%', height: '100%' }}></div>
      </div>
    </div>
  )
}

export default AdminServiceForecast
