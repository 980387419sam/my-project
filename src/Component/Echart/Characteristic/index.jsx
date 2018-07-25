import React from 'react'
import option from './option'

const styles = {
  position: 'fixed',
  top: 0,
  left: '25%',
  fontSize: '20px',
}

export default class Characteristic extends React.PureComponent {
  state={
    component: this.TextA,
    num: 0,
    echartHide: 'echartHide',
    echartShow: 'echartHide',
  }
  componentDidMount=() => {
    option('eChartsDemo')
  }

  TextA= (
    <div>
      <p>ECharts，一个纯 Javascript 的图表库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖轻量级的 Canvas 类库 ZRender，提供直观，生动，可交互，可高度个性化定制的数据可视化图表。</p>
      <p>ECharts 3 中更是加入了更多丰富的交互功能以及更多的可视化效果，并且对移动端做了深度的优化。</p>
    </div>
    )
  render() {
    return (
      <div>
        <div className={styles}>
          <h5>ECharts 特性</h5>
          {this.state.component}
          <p className={`eChartsDemo1Up ${this.state.echartShow}`} onClick={() => { this.page('-') }}>上一页</p>
          <p className="eChartsDemo1Down" onClick={() => { this.page('+') }}>下一页</p>
          <p className={`eChartsDemo1Back ${this.state.echartHide}`} onClick={() => { }}>返回首页</p>
        </div>
      </div>
    )
  }
}
