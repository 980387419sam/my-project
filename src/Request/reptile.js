import { ajaxFun } from './index'

export const getAGZAlluser = async data => await ajaxFun('get', '/reptile', data)
