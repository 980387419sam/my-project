import React from 'react'

export default class EchartComponent extends React.PureComponent {
  render=() => (
    <div style={{ width: window.screen.availHeight, height: 600 }} >
      <div id="eChartsDemo" style={{ width: '100%', height: '100%' }} />
    </div>
    )
}
