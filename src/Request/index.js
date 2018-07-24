import $ from 'jquery'

const errorType = require('../errorConfig')

export const url = 'http://localhost:3344'
export const href = 'http://localhost:3000'

const ajaxGetFun = (urls, data, resolve) => {
  $.get(urls, data, (res) => {
    const datas = JSON.parse(res)
    if (datas.error_code === '10001') {
      window.location.href = `${href}/#/login`
      resolve('')
    } else {
      resolve(datas)
    }
  })
}

export const ajaxFun = (type, path, data) => new Promise((resolve) => {
  if (type === 'get') { ajaxGetFun(url + path, data, resolve) } else {
    resolve({ error_code: errorType['10002'] })
  }
})

export const getDefaultData = async data => await ajaxFun('get', '', data)
