
import React from 'react'
import ReactDOM from 'react-dom'
import { Route, BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

import routeConfig from './routeConfig'

ReactDOM.render(
  <BrowserRouter >
    <div>
      { routeConfig.map(({ path, component }) => (
        <Route
          exact={path === '/'}
          key={path}
          path={path}
          component={component}
        />
      )) }
    </div>
  </BrowserRouter>
  , document.getElementById('root'))
registerServiceWorker()
