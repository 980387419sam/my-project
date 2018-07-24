const url = require('url')

const routes = require('./router.js')

class Request {
  async getRouteDatas(route) {
    const hrefs = route.split('?')
    const path = hrefs[0]
    const data = this.getRouteData(hrefs[1])
    if (routes[path]) {
      return await routes[path](data)
    }
    return await routes.defaultData(data)
  }

  getRouteData(datas) {
    if (!datas) return ''
    const items = {}
    datas.split('&').map((d) => {
      const ds = d.split('=')
      items[ds[0]] = ds[1] || ''
    })
    return items
  }
}

const request = new Request()

const RequestFun = async (req, res) => {
  let reqUrl = req.url
  reqUrl = url.parse(reqUrl)
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
  })
  const route = reqUrl.path
  const datas = await request.getRouteDatas(route)
  res.write(datas)
  res.end()
}

module.exports = RequestFun
