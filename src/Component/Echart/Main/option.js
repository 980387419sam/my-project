import echarts from 'echarts'

export default (eCharts) => {
  const myChart = echarts.init(document.getElementById(eCharts))
  const valueData = []
  const valueAllData = []
  for (let i = 0; i < 60; i += 1) {
    valueData.push({
      value: 1,
      name: '',
    })
    valueAllData.push({
      value: 1,
      name: `${i}`,
    })
  }
  for (let j = 0; j < 12; j += 1) {
    valueData[j * 5].name = `${j}`
  }
  const option = {
    title: {
      text: 'ECharts',
      left: '49%',
      textAlign: 'center',
      top: '20%',
    },
    series: [
      {
        type: 'pie',
        data: [],
        startAngle: 95,
        roseType: 'area',
        itemStyle: {
          normal: {
            color: 'white',
            borderColor: '#22C3AA',
          },
        },
        labelLine: {
          normal: {
            show: false,
          },
        },
        label: {
          normal: {
            show: false,
          },
        },
      }, {
        type: 'pie',
        data: [],
        roseType: 'area',
        startAngle: 95,
        itemStyle: {
          normal: {
            color: 'white',
            borderColor: '#22C3AA',
          },
        },
        label: {
          normal: {
            show: false,
          },
        },
      }, {
        type: 'pie',
        data: [],
        startAngle: 95,
        roseType: 'area',
        itemStyle: {
          normal: {
            color: 'white',
            borderColor: '#22C3AA',
          },
        },
        label: {
          normal: {
            show: false,
          },
        },
      }, {
        type: 'pie',
        data: valueData,
        radius: ['60%', '70%'],
        zlevel: -2,
        startAngle: 95,
        itemStyle: {
          normal: {
            color: '#6bd6de',
            borderColor: 'white',
          },
        },
        label: {
          normal: {
            position: 'inside',
          },
        },
      }, {
        type: 'pie',
        data: valueAllData,
        radius: ['70%', '80%'],
        zlevel: -2,
        startAngle: 95,
        itemStyle: {
          normal: {
            color: '#6bd6de',
            borderColor: 'white',
          },
        },
        label: {
          normal: {
            position: 'inside',
          },
        },
      }, {
        type: 'pie',
        data: sessionStorage.getItem('echarts') ? JSON.parse(sessionStorage.getItem('echarts')) : [],
        radius: ['80%', '100%'],
        zlevel: -2,
        startAngle: -90,
        itemStyle: {
          normal: {
            color: '#333',
            borderColor: '#fff',
          },
        },
        label: {
          normal: {
            position: 'inside',
          },
        },
      }],
  }
  myChart.setOption(option)
  setInterval(() => {
    const date = new Date()
    valueData.forEach((data) => {
      const d = data
      d.value = 0
    })
    valueData[date.getSeconds()].value = 9
    const MValueData = valueData
    MValueData[date.getMinutes()].value = 7
    const HValueData = valueData
    const hours = date.getHours()
    HValueData[hours >= 12 ? (hours - 12) * 5 : hours * 5].value = 5
    myChart.setOption({
      series: [{
        data: valueData,
      }, {
        data: MValueData,
      }, {
        data: HValueData,
      }],
    })
  }, 1000)
  const clickHistory = (e, name, numb, value) => {
    let localData = sessionStorage.getItem('echarts')
    localData = localData ? JSON.parse(localData) : []
    localData[numb] = {
      name,
      value,
    }
    if (numb > 0) {
      localData[numb - 1].value = 1
    }
    sessionStorage.setItem('echarts', JSON.stringify(localData))
    myChart.setOption({
      series: [{}, {}, {}, {}, {}, {
        data: localData,
      }],
    })
  }
  myChart.on('click', (e) => {
    if (e.name === '0' && e.seriesIndex === 4) clickHistory(e, '特性', 0, 1)
    if (e.name === '特性')window.location.href = `${window.location.origin}/echart/characteristic`
    // if (e.name === '5' && e.seriesIndex === 4) clickHistory(e, '教程', 1, 2)
    // if (e.name === '教程') hashHistory.push('/course')
    // if (e.name === '10' && e.seriesIndex === 4) clickHistory(e, 'API', 2, 2)
    // if (e.name === 'API') hashHistory.push('/api')
    // if (e.name === '15' && e.seriesIndex === 4) clickHistory(e, '配置项', 3, 2)
    // if (e.name === '配置项') hashHistory.push('/config')
    // if (e.name === '20' && e.seriesIndex === 4) clickHistory(e, '小游戏', 4, 2)
    // if (e.name === '小游戏') hashHistory.push('/demo/demo6')
    // if (e.name === '25' && e.seriesIndex === 4) clickHistory(e, '3D', 5, 2)
    // if (e.name === '3D') hashHistory.push('/demo/demo7')
    // if (e.name === '30' && e.seriesIndex === 4) clickHistory(e, '地球仪', 6, 2)
    // if (e.name === '地球仪') hashHistory.push('/demo/demo8')
    // if (e.name === '50' && e.seriesIndex === 4) clickHistory(e, '图片', 7, 2)
    // if (e.name === '图片') hashHistory.push('/demo/demoY')
    // if (e.name === '55' && e.seriesIndex === 4) clickHistory(e, '结束', 8, 2)
    // if (e.name === '结束') hashHistory.push('/demo/demoN')
  })
}
