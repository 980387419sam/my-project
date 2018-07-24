const { canvasCube } = require('./cube')

const errorType = require('../../../src/errorConfig')

const defaultData = () => {
  const datas = {
    error_code: '10000',
    error_message: errorType['10000'],
  }
  return JSON.stringify(datas)
}

const canvasCubeFun = async (data) => {
  const datas = await canvasCube(data)
  return datas
}

module.exports = {
  defaultData,
  '/cube': canvasCubeFun,
}
