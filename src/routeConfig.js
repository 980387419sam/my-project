
import defaultComponent from './Component/Default'
import testComponent from './Component/Test'
import reptileComponent from './Component/Reptile'
import solarComponent from './Component/Solar'
import ballComponent from './Component/Ball'

export default [
  { path: '/', component: defaultComponent },
  { path: '/test', component: testComponent },
  { path: '/reptile', component: reptileComponent },
  { path: '/solar', component: solarComponent },
  { path: '/ball', component: ballComponent },
]
