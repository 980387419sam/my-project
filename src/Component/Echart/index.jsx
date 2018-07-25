import React from 'react'
require('./style.less')

export default class EchartComponent extends React.PureComponent {
  componentWillMount() {}
  render=() => (
    <div className="echart" >
      <div id="echart" style={{ width: '100%', height: '100%' }} />
    </div>
    )
}
