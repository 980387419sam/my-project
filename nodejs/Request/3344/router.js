const { getReptileData } = require('./reptile')

const errorType = require('../../../src/errorConfig')

const defaultData = () => {
  const datas = {
    error_code: '10000',
    error_message: errorType['10000'],
  }
  return JSON.stringify(datas)
}

const reptileData = async (data) => {
  const datas = await getReptileData(data)
  return datas
}

module.exports = {
  defaultData,
  '/reptile': reptileData,
}
